import React, { useState } from "react";
import config from '../config';

const AddFontGroup = ({ fonts, fetchGroups }) => {
    const apiUrl = `${config.apiBaseUrl}`;
    const [fontSelection, setFontSelection] = useState([]);
    const [fontGroup, setFontGroup] = useState([]);

    const addRow = () => setFontSelection([...fontSelection, ""]);

    const handleFontChange = (index, value) => {
        let inputValue = document.querySelector("#inputValue" + index);
        const groupTitle = document.querySelector("#groupTitle").value;
        //const myArray = value.split("TrueType");
        inputValue.value = value+("-"+groupTitle);
        //const fontName = myArray[1];
        const updatedSelection = [...fontSelection];
        updatedSelection[index] = value;
        setFontSelection(updatedSelection);
        setFontGroup(groupTitle);
    };
    const handleChangeGroup = (e) => {
        e.preventDefault();
        setFontGroup(e.target.value);
    }

    const handleDelete = async (id) => { 
        setFontSelection((prevOptions) => prevOptions.filter((_, index) => index !== id));
    }

    const handleCreateGroup = async () => {
        if (fontSelection.length < 2) {
            alert("Please select at least two fonts.");
            return;
        }

        if (fontGroup.length < 1) {
            alert("Please Create Font Group.");
            return;
        }

        const formData = new FormData();
        formData.append("action", "create_group");
        formData.append("fontGroup", fontGroup);
        formData.append("fonts", JSON.stringify(fontSelection));
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
            const result = await response.json();
            
            if (result.success) {
                fetchGroups();
            } else {
                alert(result.error);
            }
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

    return (
        <div class="flex flex-col items-center justify-center w-full mt-5">
            <div className="bg-black w-3/4">

                <h2 className="text-xl font-bold mb-2 text-white text-center">Create Font Group</h2>
            </div>
            <div class="flex flex-col items-center justify-center w-3/4  bg-white">
                <div class="flex justify-center w-3/4 m-2 border-2 border-solid border-gray-200">
                    <input id="groupTitle" onChange={handleChangeGroup} class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Create Group Title" />

                </div>
                {fontSelection.map((font, index) => (
                    <div key={index} class="flex justify-center m-2 border-2 border-solid border-gray-200">
                        <div class="flex flex-wrap m-3">
                            <div class="w-full md:w-[340px] px-1">
                                <input id={"inputValue" + index} class="appearance-none block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Font Name" />

                            </div>
                            <div class="w-full md:w-[340px] px-1">
                                <select
                                    className="form-select block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                    value={font}
                                    onChange={(e) => handleFontChange(index, e.target.value)}
                                >
                                    <option value="">Select Font</option>
                                    {fonts.map((font, idx) => (
                                        <option key={idx} value={font}>
                                            {font}
                                        </option>
                                    ))}
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">

                                </div>
                            </div>
                            <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(index)}
                                >
                                    <svg aria-hidden="true" class="w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>

                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gray-100 w-3/4 flex justify-around">

                <button onClick={addRow} class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Add Row
                    </span>
                </button>
                <button onClick={handleCreateGroup} type="button" class="text-white bg-green-700 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">

                    Create Group
                </button>
            </div>
        </div>
    );
};

export default AddFontGroup;
