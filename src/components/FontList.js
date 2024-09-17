import React, { useState } from "react";
import FontModal from './FontModal';
import config from '../config';

const FontList = ({ fontsList, fetchFontLists, fetchFonts }) => {
    const apiUrl = `${config.apiBaseUrl}`;
    const [selectedFont, setSelectedFont] = useState(null); // Store the selected font
    const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

    // Function to handle font click and open the modal with specific font info
    const handleFontClick = (font) => {
        setSelectedFont(font); // Set the clicked font as the selected font
        setIsModalOpen(true); // Open the modal
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
        setSelectedFont(null); // Reset the selected font
    };
    // Function to delete a font from the backend and UI
    const deleteFont = async (fontFileName) => {
        const formData = new FormData();
        formData.append("action", "delete_uploaded_font");
        formData.append("font_file_name", fontFileName);

        const response = await fetch(apiUrl, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                fetchFontLists();
                fetchFonts();
                console.log("Font deleted successfully:", data.message);
                // Remove the font from the UI
            } else {
                console.error("Error:", data.message);
            }
        } else {
            const text = await response.text();
            console.error("Error while deleting font:", text);
        }
    };
    return (

        <div class="flex flex-col items-center justify-center w-full mt-5">
            <div className="bg-black w-3/4">

                <h2 className="text-xl font-bold mb-2 text-white text-center">Uploaded Font List</h2>
            </div>
            <div class="flex flex-col items-center justify-center w-3/4  bg-white">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block  py-2 sm:px-6 lg:px-8">
                        <div class="">
                            <table
                                class="text-left text-sm font-light text-surface dark:text-white">
                                <thead
                                    class="border-b border-neutral-200 font-medium dark:border-white/10">
                                    <tr>
                                        <th scope="col" class="px-6 py-4">Id</th>
                                        <th scope="col" class="px-6 py-4">Font Full Name</th>
                                        <th scope="col" class="px-6 py-4">Preview </th>
                                        <th scope="col" class="px-6 py-4">Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fontsList.map((font) => (
                                        <tr class="border-b border-neutral-200 dark:border-white/10" key={font.id}>
                                            <td class="whitespace-nowrap px-6 py-4 font-medium">{font.id}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{font.fontName}</td>
                                            <td class="whitespace-nowrap px-6 py-4"><button
                                                onClick={() => handleFontClick(font)} // Open modal on font click
                                                className="bg-gray-200 text-black p-2 rounded"
                                            >
                                                Example Style
                                            </button></td>
                                            <td class="whitespace-nowrap px-6 py-4 text-red-500">
                                                <button
                                                    onClick={() => deleteFont(font.id)}
                                                    className="bg-red-500 text-white p-2 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            {/* Modal for showing font information */}
                            <FontModal
                                font={selectedFont}
                                isOpen={isModalOpen}
                                onClose={closeModal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FontList;
