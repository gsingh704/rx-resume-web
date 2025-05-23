import { FaUpload } from 'react-icons/fa';

const FileUpload = ({ onFileChange }) => {
  return (
    <div className="p-8 bg-white dark:bg-gray-700 shadow-2xl rounded-lg text-center max-w-md w-full">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Resume Importer & Previewer</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">
        Upload your <code>resume.json</code> file from rxresume.me to generate a preview and download an HTML version.
      </p>
      <label htmlFor="resume-upload" className="cursor-pointer w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-700">
        <FaUpload className="mr-2" />
        Upload JSON File
      </label>
      <input
        id="resume-upload"
        type="file"
        accept=".json,application/json"
        onChange={onFileChange}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;