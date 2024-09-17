import React, { useState, useEffect } from 'react';

const EditFontGroupModal = ({ isOpen, onClose, fontGroup, onSave }) => {
    const [group, setGroupName] = useState('');
    const [fonts, setFonts] = useState([]);

    // Populate the modal with the current font group data when it's opened
    useEffect(() => {
        if (fontGroup) {
            setGroupName(fontGroup.group);
            setFonts(fontGroup.fonts);
        }
    }, [fontGroup]);


    // Handle the form submission (Save changes)
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFontGroup = { ...fontGroup, group, fonts };        
        onSave(updatedFontGroup); // Trigger save function from parent
        onClose(); // Close the modal after saving
    };

    if (!isOpen) return null; // Don't render if the modal is not open

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                <h2 className="text-xl font-semibold mb-4">Edit Font Group</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Group Name</label>
                        <input
                            type="text"
                            value={group}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="border p-2 w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        
                       
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-500 text-white p-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditFontGroupModal;
