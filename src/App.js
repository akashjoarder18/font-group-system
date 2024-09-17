import React, { useState, useEffect } from "react";
import FontList from "./components/FontList.js";
import FontGroupList from "./components/FontGroupList.js";
import AddFontGroup from "./components/AddFontGroup.js";
import FontUpload from "./components/FontUpload.js";
import config from './config';



const App = () => {
    const [fontsList, setFontsList] = useState([]);
    const [fonts, setFonts] = useState([]);
    const [groups, setGroups] = useState([]);

    const fetchFontLists = async () => {
        const apiUrl = `${config.apiBaseUrl}`;
        const formData = new FormData();
        formData.append("action", "get_font_lists");
        const response = await fetch(apiUrl, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json",
            },
            credentials: 'same-origin', // Include credentials if needed (cookies, etc.)
        });

        // Check if the response is ok and handle it accordingly
        if (response.ok) {
            const data = await response.json();
            setFontsList(data);
        } else {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const error = await response.json();
                console.error("Error:", error);
            } else {
                console.error("Error: Non-JSON response received");
            }
        }


    };


    const fetchFonts = async () => {
        const apiUrl = `${config.apiBaseUrl}`;
        const formData = new FormData();
        formData.append("action", "get_fonts");
        const response = await fetch(apiUrl, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json",
            },
            credentials: 'same-origin', // Include credentials if needed (cookies, etc.)
        });

        // Check if the response is ok and handle it accordingly
        if (response.ok) {
            const data = await response.json();
            setFonts(data);
        } else {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const error = await response.json();
                console.error("Error:", error);
            } else {
                console.error("Error: Non-JSON response received");
            }
        }


    };

    const fetchGroups = async () => {
        const apiUrl = `${config.apiBaseUrl}`;
        const formData = new FormData();
        formData.append("action", "get_groups");
        const response = await fetch(apiUrl, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json",
            },
            credentials: 'same-origin', // Include credentials if needed (cookies, etc.)
        });
        // Check if response is ok
        if (response.ok) {
            const data = await response.json();
            setGroups(data);
        } else {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const error = await response.json();
                console.error("Error:", error);
            } else {
                console.error("Error: Non-JSON response received");
            }
        }

    };

    useEffect(() => {
        fetchFontLists();
        fetchFonts();
        fetchGroups();
    }, []);

    return (
        <div className="container mx-auto bg-gray-200">
            <h1 className="text-3xl font-bold mb-4 bg-black text-white text-center">Font Group System</h1>
            <FontUpload fetchFontLists={fetchFontLists} fetchFonts={fetchFonts} />
            <FontList fontsList={fontsList} fetchFontLists={fetchFontLists} fetchFonts={fetchFonts} />
            <AddFontGroup fonts={fonts} fetchGroups={fetchGroups} />
            <FontGroupList groups={groups} fetchGroups={fetchGroups} />
        </div>
    );
};

export default App;
