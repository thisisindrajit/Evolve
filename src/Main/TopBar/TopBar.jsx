//https://www.techiediaries.com/react-formdata-file-upload-multipart-form-tutorial/

import React from 'react';
import './topbar.css';

const TopBar = (props) => {

    return (
        <div id="topbar">
            Welcome {localStorage.getItem("username")}
            {/* <img id="dp" onClick={() => props.logout()} src="https://pics.freeicons.io/uploads/icons/png/7947586491595453760-512.png" alt="Display Picture" /> */}
            <svg id="dp" viewBox="0 0 24 24" onClick={() => props.logout()} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M17.294 7.29105C17.294 10.2281 14.9391 12.5831 12 12.5831C9.0619 12.5831 6.70601 10.2281 6.70601 7.29105C6.70601 4.35402 9.0619 2 12 2C14.9391 2 17.294 4.35402 17.294 7.29105ZM12 22C7.66237 22 4 21.295 4 18.575C4 15.8539 7.68538 15.1739 12 15.1739C16.3386 15.1739 20 15.8789 20 18.599C20 21.32 16.3146 22 12 22Z" fill="white" />
            </svg>

        </div>
    )
}

export default TopBar;