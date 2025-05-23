import React from 'react';

const SkillLevel = ({ level, primaryColor }) => (
  <div className="flex items-center ml-2 sm:ml-4" title={`Level ${level} out of 5`}>
    {[...Array(5)].map((_, index) => {
      const isActive = index < level;
      const borderClasses = isActive ? '' : 'border-3 border-gray-300 dark:border-gray-600';
      return (
        <div
          key={index}
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full mr-1 ${borderClasses}`}
          title={`Skill point ${index + 1}`}
          style={{
            backgroundColor: isActive ? primaryColor : 'transparent',
          }}
        />
      );
    })}
  </div>
);

export default SkillLevel;