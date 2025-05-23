import React from 'react';
import Header from './layout/Header';
import ResumeSection from './sections/ResumeSection';
import Footer from './layout/Footer';

const ResumeDocument = ({ resume, color, sectionsConfig,  isDarkMode, showAttribution }) => { 
  if (!resume) return null;
  const summaryContent = resume.sections?.summary?.content || '';
  const basics = resume.basics || {};
 
  const orderedSectionsToRender = Array.isArray(sectionsConfig) ? sectionsConfig : [];

  return (
    <div className="dark:bg-gray-900">
      <Header
        basics={basics}
        summaryContent={summaryContent}
        primaryColor={color}
      />
      <div className="p-6 w-full max-w-4xl mx-auto dark:text-white">
        {orderedSectionsToRender.map((sectionConf) => {
          if (!sectionConf.visible) return null; 

          const sectionKey = sectionConf.key;
          const section = resume.sections[sectionKey];
 
          if (sectionKey !== 'summary' && section && section.items && section.items.length > 0) {
            return (
              <ResumeSection
 
                key={sectionConf.key} 
                section={{ ...section, name: sectionConf.name }}  
                primaryColor={color}
                isDarkMode={isDarkMode}
              />
            );
          }
          return null;
        })}
        <Footer showAttribution={showAttribution} />
      </div>
    </div>
  );
};

export default ResumeDocument;