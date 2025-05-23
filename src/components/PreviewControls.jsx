import React from 'react';
import { FaUpload, FaDownload, FaCog } from 'react-icons/fa';

const PreviewControls = ({ onUploadNew, onDownloadHtml, onToggleConfigPanel }) => {
  return (
    <div className="p-3 sm:p-4 bg-gray-100 dark:bg-gray-700 shadow-md 
                   flex flex-col sm:flex-row sm:flex-wrap justify-between items-center 
                   sticky top-0 z-50 gap-2 print:hidden h-auto sm:h-16">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-0">Resume Preview</h2>
      <div className="flex flex-wrap justify-center sm:justify-end gap-2"> 
        <button
          onClick={onUploadNew}
          className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-500 text-xs sm:text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500"
        >
          <FaUpload className="mr-1 sm:mr-2" />
          Upload New
        </button>
        <button
          onClick={onDownloadHtml}
          className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-700"
        >
          <FaDownload className="mr-1 sm:mr-2" />
          Download HTML
        </button>
        <button
          onClick={onToggleConfigPanel}
          className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-500 text-xs sm:text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500"
          title="Configure Resume"
        >
          <FaCog />
        </button>
      </div>
    </div>
  );
};

export default PreviewControls;