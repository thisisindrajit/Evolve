import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import.meta.hot; // FOR GETTING ENV VARIABLES FROM SNOWPACK

const CryptoDeleteOverlay = (props) => {

    let isunmounted = false;
    let [text, setText] = useState("Delete")

    let deleteCrypto = async () => {

        const data = {
            cryptoTransactionID: props.cryptotid,
            type: "3"
        }

        //console.log(data);

        // const DELETE_ENDPOINT = "http://localhost:80/evolve/addEditDelcrypto.php";
        const DELETE_ENDPOINT = process.env.REACT_APP_API_URL + "/addEditDelcrypto.php";

        try {
            let response = await axios.post(DELETE_ENDPOINT, data);

            if (response.status === 200 && !isunmounted) {
                console.log(response.data);
                props.setLoading({type:"setLoading", payload:{cryptoLoading:1}});
            } else {
                console.log(response.data.error);
            }

        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        if (text === "Deleting...") {
            deleteCrypto();
        }

        return () => {
            isunmounted = true;
        };

    }, [text])

    return (
        <div id="delete-overlay" style={{ height: Math.max(220, (props.height + 10)) + "px" }}>
            <div id="delete-content">
                <span style={{ textAlign: "center", lineHeight: "1.2rem", fontSize: "1.1rem" }}>Do you really want to delete this crypto?</span>
                <button className="delete-button" style={{ backgroundColor: "red", marginTop: "25px" }} onClick={text === "Delete" ? () => setText("Deleting...") : null}>{text}</button>
                <button className="delete-button" style={{ border: text === "Delete" ? "1px solid #14cccc" : "1px solid #ccc" }} onClick={text === "Delete" ? () => props.setOverlay(-1) : null}>Close</button>
            </div>
        </div>
    );
}

// these are the functions which are required to map the state to the props and dispatch actions to store
const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    setLoading: (loadingData) => dispatch(loadingData)
});

export default connect(mapStateToProps, mapDispatchToProps)(CryptoDeleteOverlay);