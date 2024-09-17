import React from 'react';

const FontModal = ({ font, isOpen, onClose }) => {
    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                <h2 className="text-xl font-semibold mb-4">Font Information</h2>                
                
                <p><strong>File Name:</strong> {font.id}</p>
                <p><strong>Font Name:</strong> {font.fontFullName}</p>
                <p><strong>Font Type:</strong> {font.fontType}</p>
                <p><strong>Font Family:</strong> {font.fontFamily}</p>

                <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className="bg-red-500 text-white p-2 rounded">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FontModal;
