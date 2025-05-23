import React from 'react';
import { FaTimes, FaArrowUp, FaArrowDown, FaEye, FaEyeSlash } from 'react-icons/fa';

const ConfigPanel = ({
  isOpen,
  onClose,
  documentTitle,
  onDocumentTitleChange,
  sections,
  onSectionOrderChange,
  onSectionVisibilityChange,
  primaryColor,
  onPrimaryColorChange,
  activeLayout,
  onLayoutChange,
  originalPrimaryColor, 
  onRevertToOriginalColor,
  availableFonts,
  currentFont,
  onFontChange,
  showAttribution,
  onShowAttributionChange,
}) => {
  if (!isOpen) return null;

  const moveSection = (index, direction) => {
    const newSections = [...sections];
    const [section] = newSections.splice(index, 1);
    newSections.splice(index + direction, 0, section);
    onSectionOrderChange(newSections);
  };

  const toggleVisibility = (index) => {
    const newSections = sections.map((section, i) =>
      i === index ? { ...section, visible: !section.visible } : section
    );
    onSectionVisibilityChange(newSections);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-80 md:w-96 bg-white dark:bg-gray-800 shadow-xl z-[60] transform transition-transform duration-300 ease-in-out print:hidden"
      style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Configuration</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
          <FaTimes size={20} />
        </button>
      </div>

      <div className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-57px)] pb-16 sm:pb-4">
        <div>
          <label htmlFor="documentTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Website Title
          </label>
          <input
            type="text"
            id="documentTitle"
            value={documentTitle}
            onChange={(e) => onDocumentTitleChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            style={{ '--tw-ring-color': primaryColor }}
          />
        </div>

        <div>
          <label htmlFor="fontSelector" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Font Family
          </label>
          <select
            id="fontSelector"
            value={currentFont}
            onChange={(e) => onFontChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            style={{ '--tw-ring-color': primaryColor }}
          >
            {availableFonts.map(font => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">Layout Style</h4>
          <div className="space-y-2">
            <div>
              <label className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                <input
                  type="radio"
                  name="layoutStyle"
                  value="default"
                  checked={activeLayout === 'default'}
                  onChange={(e) => onLayoutChange(e.target.value)}
                  className="form-radio h-4 w-4"
                  style={{ color: primaryColor, '--tw-ring-color': primaryColor, accentColor: primaryColor }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Default View</span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                <input
                  type="radio"
                  name="layoutStyle"
                  value="modernSidebar"
                  checked={activeLayout === 'modernSidebar'}
                  onChange={(e) => onLayoutChange(e.target.value)}
                  className="form-radio h-4 w-4"
                  style={{ color: primaryColor, '--tw-ring-color': primaryColor, accentColor: primaryColor }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Modern Sidebar</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">Theme Color</h4>
          <div className="space-y-2">
            <div>
              <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Primary Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  id="primaryColor"
                  value={primaryColor}
                  onChange={(e) => onPrimaryColorChange(e.target.value)}
                  className="w-8 h-8 p-0 border-none rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  placeholder="#RRGGBB"
                  onChange={(e) => onPrimaryColorChange(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  style={{ '--tw-ring-color': primaryColor }}
                />
              </div>
            </div>
            <button
              onClick={onRevertToOriginalColor}
              disabled={primaryColor === originalPrimaryColor} 
              className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Revert to Original Theme
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">Sections Order & Visibility</h4>
          <ul className="space-y-2">
            {sections.map((section, index) => (
              <li key={section.key} className="p-2 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700/50">
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${section.visible ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500 line-through'}`}>
                    {section.name}
                  </span>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button
                      onClick={() => toggleVisibility(index)}
                      title={section.visible ? "Hide section" : "Show section"}
                      className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                    >
                      {section.visible ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                    </button>
                    <button
                      onClick={() => moveSection(index, -1)}
                      disabled={index === 0}
                      className="p-1 disabled:opacity-50 disabled:cursor-not-allowed text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                      title="Move up"
                    >
                      <FaArrowUp size={14} />
                    </button>
                    <button
                      onClick={() => moveSection(index, 1)}
                      disabled={index === sections.length - 1}
                      className="p-1 disabled:opacity-50 disabled:cursor-not-allowed text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                      title="Move down"
                    >
                      <FaArrowDown size={14} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">General Settings</h4>
          <label className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <input
              type="checkbox"
              checked={showAttribution}
              onChange={(e) => onShowAttributionChange(e.target.checked)}
              className="form-checkbox h-4 w-4"
              style={{ color: primaryColor, '--tw-ring-color': primaryColor, accentColor: primaryColor }}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Show Attribution in Footer</span>
          </label>
        </div>

      </div>
    </div>
  );
};

export default ConfigPanel;