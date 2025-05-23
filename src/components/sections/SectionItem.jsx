import React from 'react';
import ItemTitle from '../ui/ItemTitle';
import SkillLevel from '../ui/SkillLevel';
import Keywords from '../ui/Keywords';

const SectionItem = ({ item, primaryColor, isDarkMode }) => (
  <li key={item.id || item.name || item.title} className="mb-4 sm:mb-6 list-none print:mb-3">
    <div className="flex items-center justify-between flex-wrap">
      <ItemTitle item={item} primaryColor={primaryColor} isDarkMode={isDarkMode} />
      {item.level ? (
        <SkillLevel level={item.level} primaryColor={primaryColor} />
      ) : (
        (item.position || item.studyType || item.username || item.description) &&
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base ml-0  mt-1 sm:mt-0 italic font-semibold text-left sm:text-right flex-shrink-0 print:text-sm">
          {item.position || item.studyType || item.username || item.description}
        </p>
      )}
    </div>

    {item.level && (item.position || item.studyType || item.username || item.description) && (
      <p className="text-gray-600 dark:text-gray-300 mt-1 italic font-semibold text-sm sm:text-base print:text-sm"> 
        {item.position || item.studyType || item.username || item.description}
      </p>
    )}

    {item.date && <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 print:text-xs">{item.date}</p>} 
    {item.summary && (
      <div
        className="text-justify text-gray-700 dark:text-gray-200 li-tag mt-1 max-w-none print:text-sm" 
        dangerouslySetInnerHTML={{ __html: item.summary }}
      />
    )}
    <Keywords keywords={item.keywords} primaryColor={primaryColor} />
  </li>
);

export default SectionItem;