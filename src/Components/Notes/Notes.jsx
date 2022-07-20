import React, { useState, useEffect, useCallback } from "react";
import "./notes.css";
import defaultPageStyles from "../../Styles/defaultPageStyles";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTitle } from "../../Services/useTitle";
import Footer from "../Footer/Footer";

const Notes = (props) => {
  useTitle(`${localStorage.getItem("username")}'s Notes - Evolve`);

  let isunmounted = false;
  let [notes, setNotes] = useState("");
  let [loading, setLoading] = useState(1);
  let [updating, setUpdating] = useState(0);
  let [error, setError] = useState(0);

  let fetchNotes = async () => {
    const data = {
      uid: localStorage.getItem("userID"),
    };

    //fetch notes
    const NOTES_ENDPOINT = process.env.REACT_APP_API_URL + "/getNotes.php";

    try {
      let response = await axios.post(NOTES_ENDPOINT, data);

      if (response.status === 200 && !isunmounted) {
        if (!response.data.msg) {
          setNotes(response.data[0].user_notes);
        } else {
          setNotes("");
        }

        setLoading(0);
      } else {
        console.log("Some error occurred!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  let updateNote = async () => {
    setUpdating(1);

    const data = {
      uid: localStorage.getItem("userID"),
      note: notes,
    };

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/updateNotes.php",
        data
      );

      if (response.status === 200 && response.data.msg === "Edited Note!") {
        setUpdating(0);
        setError(0);
        toast.success("Notes updated!");
        console.log(response.data.msg);
      } else {
        console.log(response);
        setUpdating(0);
        setError(1);
      }
    } catch (error) {
      setUpdating(0);
      setError(1);
      console.log(error);
    }
  };

  useEffect(() => {
    if (loading === 1) {
      fetchNotes();
    }

    return () => {
      isunmounted = true;
    };
  }, [loading]);

  return (
    <>
      <ToastContainer
        className="z-30"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div style={defaultPageStyles.pageStyle}>
        <div id="notes">
          <div className="text-xl">
            My <span className="font-bold">Notes</span>
          </div>
          <textarea
            className="notes-area"
            placeholder="Jot down your stock picks this month, your financial goals etc."
            value={loading === 1 ? "Loading notes..." : notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
          {loading !== 1 && (
            <div className="m-auto mr-0 flex flex-col w-full sm:w-fit sm:flex-row items-center gap-4 sm:gap-1">
              {error === 1 && (
                <div className="leading-relaxed text-red-500 border border-red-500 sm:border-none p-2 text-center text-sm md:text-base font-bold w-full sm:w-fit">
                  Error while saving note! Please try again!
                </div>
              )}
              <div
                className="border-2 border-white text-xs uppercase p-3 rounded-md hover:bg-white hover:text-gray-800 transition-all cursor-pointer font-bold w-full text-center sm:w-fit"
                onClick={updating === 1 ? null : () => updateNote()}
              >
                {updating === 1 ? (
                  <div className="flex items-center justify-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      className="h-4 w-4"
                    >
                      <path
                        fill="#14cccc"
                        d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
                      >
                        <animateTransform
                          attributeType="xml"
                          attributeName="transform"
                          type="rotate"
                          from="0 25 25"
                          to="360 25 25"
                          dur="0.6s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </svg>
                    Updating Notes...
                  </div>
                ) : (
                  "Save Notes"
                )}
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Notes;
