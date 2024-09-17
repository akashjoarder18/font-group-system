import React, { useState } from "react";
import config from '../config';

const FontUpload = ({ fetchFontLists, fetchFonts }) => {
  const apiUrl = `${config.apiBaseUrl}`;
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".ttf")) {
      const formData = new FormData();
      formData.append("action", "upload");
      formData.append("font", file);

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
          setError("");
          fetchFontLists();
          fetchFonts();
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

    } else {
      setError("Only TTF files are allowed.");
    }
  };

  return (

    <div class="flex flex-col items-center justify-center w-full">

      <label for="file-upload" class="flex flex-col items-center justify-center w-3/4 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">Only TTF File Allowed</p>
        </div>
        <input
          type="file"
          accept=".ttf"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
      </label>
      <div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

    </div>

  );

};

export default FontUpload;
