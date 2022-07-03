import React, { useState, useEffect } from 'react';
import TopBar from './TopBar/TopBar';
import Dashboard from './Dashboard/Dashboard';
import Search from './Search/Search';
import Market from './Market/Market';
import Notes from './Notes/Notes';
import './content.css';

const Content = (props) => {

    // useEffect(() => {
    //     const timer = setTimeout(() => setCount(count+1), 1000);
    //     return () => clearTimeout(timer);
    // }, [count, setCount])

    return(
        <div id="content">
            <TopBar logout={props.logout}/>
            <div id="page-render">
                {props.currentpage == 1 && <Dashboard />}
                {props.currentpage == 2 && <Search />}
                {props.currentpage == 3 && <Market />}
                {props.currentpage == 4 && <Notes />}
            </div>
        </div>
    )
}

export default Content;