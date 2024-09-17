import React, { useState } from 'react';
import EditFontGroupModal from './EditFontGroupModal';
import config from '../config';

const FontGroupList = ({ groups, fetchGroups }) => {
    const apiUrl = `${config.apiBaseUrl}`;
    const [fontGroups, setFontGroups] = useState([...groups]);
    const [selectedFontGroup, setSelectedFontGroup] = useState(null); // Selected group for editing
    const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

    // Open the modal and set the selected font group
    const handleEditClick = (fontGroup) => {
        setSelectedFontGroup(fontGroup);
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFontGroup(null);
    };

    // Handle saving the updated font group
    const saveFontGroup = (updatedGroup) => {
        const updatedGroups = fontGroups.map((group) =>
            group.id === updatedGroup.id ? updatedGroup : group
        );
        setFontGroups(updatedGroups);
    };

    const handleDelete = async (id) => {        
        const formData = new FormData();
        formData.append("action", "delete_group");
        formData.append("id", id);
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
                <h2 className="text-xl font-bold mb-2 text-white text-center">Font Groups</h2>
            </div>
            <div class="flex flex-col items-center justify-center w-3/4  bg-white mb-10">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block  py-2 sm:px-6 lg:px-8">
                        <div class="">
                            <table
                                class="text-left text-sm font-light text-surface dark:text-white overflow-scroll">
                                <thead
                                    class="border-b border-neutral-200 font-medium dark:border-white/10">
                                    <tr>
                                        <th scope="col" class="px-6 py-4">Group Name</th>
                                        <th scope="col" class="px-6 py-4">Font Family </th>
                                        <th scope="col" class="px-6 py-4">Count </th>
                                        <th scope="col" class="px-6 py-4">Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groups.map((fontGroup) => (
                                        <tr class="border-b border-neutral-200 dark:border-white/10" key={fontGroup.id}>

                                            <td class="whitespace-nowrap px-6 py-4">{fontGroup.group}</td>
                                            <td class="whitespace-nowrap w-[100px] px-6 py-4">{fontGroup.fonts}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{fontGroup.count}</td>
                                            <td class="whitespace-nowrap px-6 py-4 text-red-500">
                                                <button
                                                    onClick={() => handleEditClick(fontGroup)}
                                                    className="bg-green-500 text-white p-2 rounded"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger ml-4"
                                                    onClick={() => handleDelete(fontGroup.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            {/* Edit Modal */}
                            <EditFontGroupModal
                                isOpen={isModalOpen}
                                onClose={closeModal}
                                fontGroup={selectedFontGroup}
                                onSave={saveFontGroup}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FontGroupList;
