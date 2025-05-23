import React, { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import './App.css';

import FileUpload from './components/FileUpload';
import PreviewControls from './components/PreviewControls';
import ResumeDocument from './components/ResumeDocument';
import ConfigPanel from './components/ConfigPanel';
import { getAllDocumentStyles } from './utils/styleUtils';
import ModernSidebarLayout from './components/layout/ModernSidebarLayout';
import ResumeSection from './components/sections/ResumeSection';

const DEFAULT_PRIMARY_COLOR = '#3B82F6'; 
const PREDEFINED_FONTS = [
  { name: 'System Default', value: 'sans-serif' },
  { name: 'Arial', value: 'Arial, Helvetica, sans-serif' },
  { name: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Times New Roman', value: '"Times New Roman", Times, serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Open Sans', value: '"Open Sans", sans-serif' },
  { name: 'Lato', value: 'Lato, sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, sans-serif' },
  { name: 'IBM Plex Sans', value: '"IBM Plex Sans", sans-serif' }
];

const DEFAULT_FONT_FAMILY = PREDEFINED_FONTS.find(f => f.name === 'IBM Plex Sans')?.value || 'sans-serif';

function App() {
  const [resumeData, setResumeData] = useState(null);
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_PRIMARY_COLOR);
  const [originalPrimaryColor, setOriginalPrimaryColor] = useState(DEFAULT_PRIMARY_COLOR);
  const [fileName, setFileName] = useState('resume');
  const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
  const [documentTitle, setDocumentTitle] = useState('Resume');
  const [sectionsConfig, setSectionsConfig] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false
  );
  const [activeLayout, setActiveLayout] = useState('default'); 
  const [selectedFont, setSelectedFont] = useState(DEFAULT_FONT_FAMILY);
  const [showAttribution, setShowAttribution] = useState(true); // New state for attribution

  useEffect(() => {
    if (resumeData) {
      const initialThemeColor = resumeData.metadata?.theme?.primary || DEFAULT_PRIMARY_COLOR;
      setPrimaryColor(initialThemeColor);  

      setDocumentTitle(resumeData.basics?.name ? `${resumeData.basics.name}'s Resume` : 'My Resume');
      const initialSections = Object.keys(resumeData.sections || {})
        .map(key => ({
          key,
          name: resumeData.sections[key]?.name || key.charAt(0).toUpperCase() + key.slice(1),
          visible: resumeData.sections[key]?.visible !== false,
        }));
      setSectionsConfig(initialSections);

      const initialFontFamilyName = resumeData.metadata?.typography?.font?.family;
      const initialFont = PREDEFINED_FONTS.find(f => f.name === initialFontFamilyName)?.value || DEFAULT_FONT_FAMILY;
      setSelectedFont(initialFont);
    } else {
      setPrimaryColor(DEFAULT_PRIMARY_COLOR);
      setOriginalPrimaryColor(DEFAULT_PRIMARY_COLOR); 
      setDocumentTitle('Resume');
      setSectionsConfig([]);
      setIsConfigPanelOpen(false);
      setActiveLayout('default'); 
      setSelectedFont(DEFAULT_FONT_FAMILY);
      setShowAttribution(true); // Reset attribution on new upload
    }

    if (typeof window !== 'undefined' && window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => setIsDarkMode(e.matches);
      setIsDarkMode(darkModeQuery.matches);  
      darkModeQuery.addEventListener('change', handleChange);
      return () => darkModeQuery.removeEventListener('change', handleChange);
    }
  }, [resumeData]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (selectedFont) {
      document.body.style.fontFamily = selectedFont;
    }
  }, [selectedFont]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name.replace(/\.json$/i, ''));
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setResumeData(json);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Invalid JSON file. Please upload a valid resume.json from rxresume.me.");
          setResumeData(null);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUploadNew = () => {
    setResumeData(null);
    const fileInput = document.getElementById('resume-upload');
    if (fileInput) fileInput.value = '';
  };

  const renderSectionsForLayout = (currentSectionsConfig, currentResumeData, currentPrimaryColor, currentIsDarkMode, layoutType) => {
    return currentSectionsConfig.map((sectionConf) => {
      if (!sectionConf.visible) return null;
      const sectionKey = sectionConf.key;

      if (layoutType === 'modernSidebar' && sectionKey === 'summary') {
          return null;
      }
      
      if (layoutType === 'default' && sectionKey === 'summary') return null;


      const sectionData = currentResumeData.sections[sectionKey];
      if (sectionData && (sectionData.items && sectionData.items.length > 0 || sectionData.content)) {
        if (!sectionData.items && sectionData.content && sectionKey !== 'summary') {
            return (
                <section key={sectionConf.key} className="mb-6">
                    <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2" style={{ color: currentPrimaryColor, borderColor: currentPrimaryColor + '80' }}>
                        {sectionConf.name}
                    </h2>
                    <div dangerouslySetInnerHTML={{ __html: sectionData.content }} />
                </section>
            );
        }
        if (sectionData.items && sectionData.items.length > 0) {
            return (
              <ResumeSection
                key={sectionConf.key}
                section={{ ...sectionData, name: sectionConf.name }}
                primaryColor={currentPrimaryColor}
                isDarkMode={currentIsDarkMode}
              />
            );
        }
      }
      return null;
    });
  };


  const handleDownloadHtml = async () => {
    if (!resumeData) {
      alert("Please import a resume JSON file first.");
      return;
    }

    let resumeHtmlContentString;

    if (activeLayout === 'default') {
      resumeHtmlContentString = ReactDOMServer.renderToStaticMarkup(
        <ResumeDocument
          resume={resumeData}
          color={primaryColor}
          sectionsConfig={sectionsConfig.filter(s => s.key !== 'summary')}
          isDarkMode={isDarkMode}
          showAttribution={showAttribution} // Pass showAttribution here
        />
      );
    } else if (activeLayout === 'modernSidebar') {
      // Use the refactored ModernSidebarLayout for HTML generation
      const modernLayoutSections = renderSectionsForLayout(sectionsConfig, resumeData, primaryColor, isDarkMode, 'modernSidebar');
      resumeHtmlContentString = ReactDOMServer.renderToStaticMarkup(
        <ModernSidebarLayout
          basics={resumeData.basics}
          primaryColor={primaryColor}
          isDarkMode={isDarkMode}
          summaryContent={resumeData.sections?.summary?.content}
          profiles={resumeData.basics?.profiles}
          isStatic={true} 
          sectionsToRender={modernLayoutSections}
          showAttribution={showAttribution} // Pass showAttribution here
        />
      );
    }

    const allStyles = getAllDocumentStyles();
    const currentHtmlIsDarkMode = document.documentElement.classList.contains('dark');

    const fullHtml = `
  <!DOCTYPE html>
  <html lang="en" class="${currentHtmlIsDarkMode ? 'dark' : ''}" style="font-family: ${selectedFont.replace(/"/g, '&quot;')}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${documentTitle}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;700&family=Lato:wght@400;700&family=Montserrat:wght@400;700&family=Open+Sans:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <style>
      ${allStyles}
      body { margin: 0; } /* font-family is on html now */
      .dark { background-color: #111827; color: #fff; }
      /* Add any specific styles needed for App2 layout in static HTML if not covered by allStyles */
      /* For example, basic flex for App2 layout if not captured by Tailwind processing */
      .app2-container-for-html { display: flex; }
      .app2-sidebar-for-html { width: 25%; /* Or other fixed/flex width */ padding: 1rem; border-right: 1px solid #ccc; }
      .app2-main-for-html { flex: 1; padding: 1rem; }
    </style>
  </head>
  <body class="${currentHtmlIsDarkMode ? 'dark' : ''}">
    <div id="root">
      ${resumeHtmlContentString}
    </div>
  </body>
  </html>
    `;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}-${documentTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-${activeLayout}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToggleConfigPanel = () => setIsConfigPanelOpen(!isConfigPanelOpen);
  const handleRevertToOriginalColor = () => {
    setPrimaryColor(originalPrimaryColor);
  };

  return (
    <div className={`min-h-screen ${!resumeData ? 'flex flex-col items-center justify-center' : ''} bg-gray-50 dark:bg-gray-800 transition-colors duration-300 flex flex-col`}>
      {!resumeData ? (
        <FileUpload onFileChange={handleFileChange} />
      ) : (
        <>
          <div style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
            <PreviewControls
              onUploadNew={handleUploadNew}
              onDownloadHtml={handleDownloadHtml}
              onToggleConfigPanel={handleToggleConfigPanel}
            />
          </div>

          <div className="flex-1 flex">
            
            {activeLayout === 'default' && (
              <div className="flex-1 overflow-y-auto">
                <ResumeDocument
                  resume={resumeData}
                  color={primaryColor}
                  sectionsConfig={sectionsConfig.filter(s => s.key !== 'summary')}
                  isDarkMode={isDarkMode}
                  showAttribution={showAttribution}
                />
              </div>
            )}

            {activeLayout === 'modernSidebar' && (
              // The outer div that was here is now part of ModernSidebarLayout
              <ModernSidebarLayout
                  basics={resumeData.basics}
                  primaryColor={primaryColor}
                  isDarkMode={isDarkMode}
                  summaryContent={resumeData.sections?.summary?.content}
                  profiles={resumeData.basics?.profiles}
                  isStatic={false}
                  sectionsToRender={renderSectionsForLayout(sectionsConfig, resumeData, primaryColor, isDarkMode, 'modernSidebar')}
                  showAttribution={showAttribution}
              />
            )}
          </div>

          <ConfigPanel
            isOpen={isConfigPanelOpen}
            onClose={() => setIsConfigPanelOpen(false)}
            documentTitle={documentTitle}
            onDocumentTitleChange={setDocumentTitle}
            sections={sectionsConfig}
            onSectionOrderChange={setSectionsConfig}
            onSectionVisibilityChange={setSectionsConfig}
            primaryColor={primaryColor}
            onPrimaryColorChange={setPrimaryColor}
            activeLayout={activeLayout}
            onLayoutChange={setActiveLayout}
            originalPrimaryColor={originalPrimaryColor}
            onRevertToOriginalColor={handleRevertToOriginalColor} 
            availableFonts={PREDEFINED_FONTS}
            currentFont={selectedFont}
            onFontChange={setSelectedFont}
            showAttribution={showAttribution}
            onShowAttributionChange={setShowAttribution}
          />
        </>
      )}
    </div>
  );
}

export default App;