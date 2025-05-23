import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaLocationArrow, FaLink } from 'react-icons/fa';
import { isColorLight } from '../../utils/styleUtils';

const Header = ({ basics, summaryContent, primaryColor }) => {
  const useWhiteText = !isColorLight(primaryColor);
  
  const headerBaseTextColor = useWhiteText ? 'text-white' : 'text-gray-800'; 
  const headerNameColor = useWhiteText ? 'text-white' : 'text-gray-900';
  const headerHeadlineColor = useWhiteText ? 'text-gray-100' : 'text-gray-700'; 
  const headerIconColor = useWhiteText ? '#FFFFFF' : '#4B5563';

  return (
    <div className={`w-full print:bg-transparent print:text-black ${headerBaseTextColor}`} style={{ backgroundColor: primaryColor }}>
      <div className="p-4 sm:p-6 w-full max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center mb-4">
          {basics.picture?.url && (
            <img
              src={basics.picture.url}
              alt={basics.name || 'Profile'}
              className="h-24 w-24 sm:h-32 sm:w-32 rounded-full sm:mr-6 mb-4 sm:mb-0 object-cover border-2 shadow-lg print:border-gray-300"
              style={{ borderColor: useWhiteText ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.2)' }}
            />
          )}
          <div className="text-center sm:text-left">
            <h1 className={`text-2xl sm:text-3xl font-bold ${headerNameColor}`}>{basics.name}</h1>
            <p className={`text-lg sm:text-xl ${headerHeadlineColor}`}>{basics.headline}</p>
            {basics.email && (
              <a
                href={`mailto:${basics.email}`}
                className={`flex items-center justify-center sm:justify-start gap-1 mt-1 text-sm sm:text-base ${headerBaseTextColor} hover:underline`}
              >
                <FaEnvelope style={{ color: headerIconColor, flexShrink: 0 }} size={14} /> {basics.email}
              </a>
            )}
            {basics.phone && (
              <a
                href={`tel:${basics.phone}`}
                className={`flex items-center justify-center sm:justify-start gap-1 text-sm sm:text-base ${headerBaseTextColor} hover:underline`}
              >
                <FaPhoneAlt style={{ color: headerIconColor, flexShrink: 0 }} size={14} /> {basics.phone}
              </a>
            )}
            {basics.location && (
              <p className={`flex items-center justify-center sm:justify-start gap-1 text-sm sm:text-base ${headerBaseTextColor}`}>
                <FaLocationArrow style={{ color: headerIconColor, flexShrink: 0 }} size={14} /> {basics.location}
              </p>
            )}
            {basics.url?.href && (
              <a
                href={basics.url.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center sm:justify-start gap-1 text-sm sm:text-base ${headerBaseTextColor} hover:underline`}
              >
                <FaLink style={{ color: headerIconColor, flexShrink: 0 }} size={14} /> {basics.url.label || basics.url.href}
              </a>
            )}
          </div>
        </div>
        {summaryContent && (
          <div
            className={`mb-4 text-justify text-sm sm:text-base max-w-none print:text-sm ${headerBaseTextColor}`}
            dangerouslySetInnerHTML={{ __html: summaryContent }}
          />
        )}
      </div>
    </div>
  );
};

export default Header;