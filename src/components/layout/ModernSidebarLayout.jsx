import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaLocationArrow, FaLink } from 'react-icons/fa'; 
import { isColorLight, getInvertIconStyle } from '../../utils/styleUtils';
import Footer from './Footer';

const ModernSidebarLayout = ({
  basics,
  primaryColor,
  isDarkMode, 
  summaryContent,
  profiles,
  isStatic = false,
  sectionsToRender,
  showAttribution,
}) => {
  if (!basics) return null;

  const profilePicUrl = basics.picture?.url;
  const useWhiteText = !isColorLight(primaryColor);

  const sidebarTextColor = useWhiteText ? "text-white" : "text-gray-800";
  const sidebarMutedTextColor = useWhiteText ? "text-gray-200" : "text-gray-600";
  const sidebarBorderColor = useWhiteText ? "border-white/30" : "border-black/20";
  
  const mainBorderBetweenSidebarAndContent = useWhiteText ? "border-white/20" : "border-black/20";
 
  const asideBaseClasses = [
    "w-full sm:w-64 md:w-72 lg:w-80 flex-shrink-0", 
    "border-b sm:border-b-0 sm:border-r",
    mainBorderBetweenSidebarAndContent, 
    "p-4 sm:p-6",
    "z-40", 
    "transition-colors duration-300"  
  ];

  const asideConditionalClasses = isStatic
    ? [
        "sm:sticky",
        "sm:top-0",
        "sm:h-screen",  
        "sm:overflow-y-auto"  
      ]
    : [
        "sm:sticky",
        "sm:top-16",  
        "sm:h-[calc(100vh-4rem)]",  
        "sm:overflow-y-auto"  
      ];

  if (!isStatic) {
    asideConditionalClasses.push("print:hidden");
  }

  const asideClasses = [...asideBaseClasses, ...asideConditionalClasses].join(" ");
 
  const iconColorForSidebar = useWhiteText ? '#FFFFFF' : '#374151';
 
  const rootContainerClasses = [
    "flex flex-1 flex-col sm:flex-row",
    isStatic ? "h-screen overflow-hidden" : "" 
  ].join(" ");
 
  const mainContentClasses = [
    "flex-1 p-4 sm:p-6 overflow-y-auto",
    isStatic ? "sm:h-screen" : "sm:h-[calc(100vh-4rem)]"  
  ].join(" ");

  return (
    <div className={rootContainerClasses}>
      <aside className={asideClasses} style={{ backgroundColor: primaryColor }}>
        {profilePicUrl && (
          <img
            src={profilePicUrl}
            alt={basics.name || 'Profile'}
            className={`h-24 w-24 sm:h-28 md:h-32 sm:w-28 md:w-32 rounded-full mx-auto mb-4 object-cover border-2 shadow-lg`}
            style={{ borderColor: useWhiteText ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.2)' }}  
          />
        )} 
        <h1 className={`text-xl sm:text-2xl font-bold text-center mb-1 ${sidebarTextColor}`}>
          {basics.name}
        </h1>
        <p className={`text-sm sm:text-md text-center mb-4 ${sidebarMutedTextColor}`}>
          {basics.headline}
        </p>

        <div className="space-y-3 sm:text-sm">
          {basics.email && (
            <a
              href={`mailto:${basics.email}`}
              className={`flex items-center gap-2 ${sidebarTextColor} hover:underline`}
            >
              <FaEnvelope style={{ color: iconColorForSidebar, flexShrink: 0 }} size={14} /> <span className="truncate">{basics.email}</span>
            </a>
          )}
          {basics.phone && (
            <a
              href={`tel:${basics.phone}`}
              className={`flex items-center gap-2 hover:underline ${sidebarTextColor}`}
            >
              <FaPhoneAlt style={{ color: iconColorForSidebar, flexShrink: 0 }} size={14} /> <span className="truncate">{basics.phone}</span>
            </a>
          )}
          {basics.location && (
            <p className={`flex items-center gap-2 ${sidebarTextColor}`}>
              <FaLocationArrow style={{ color: iconColorForSidebar, flexShrink: 0 }} size={14} /> <span className="truncate">{basics.location}</span>
            </p>
          )}
          {basics.url?.href && (
            <a
              href={basics.url.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 ${sidebarTextColor} hover:underline`}
            >
              <FaLink style={{ color: iconColorForSidebar, flexShrink: 0 }} size={14} /> <span className="truncate">{basics.url.label || basics.url.href}</span>
            </a>
          )}
        </div>

        {profiles && profiles.length > 0 && (
          <div className={`mt-6 pt-4 border-t ${sidebarBorderColor}`}>
            <h3 className={`font-semibold uppercase mb-2 ${sidebarMutedTextColor}`}>Online</h3>
            <div className="space-y-2">
              {profiles.map((profile, index) => (
                <a
                  key={index}
                  href={profile.url?.href || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 ${sidebarTextColor} hover:underline`}
                >
                  {profile.network && (
                    <img
                      src={`https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/${profile.network.toLowerCase()}.svg`}
                      alt={profile.network}
                      className="inline-block h-4 w-4"
                      style={isDarkMode
                          ? { filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(200%) contrast(100%)' }
                          : { filter: 'none' }  
                      }
                    />
                  )}
                  <span className='underline' >{profile.username || profile.network}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {summaryContent && (
           <div className={`mt-6 pt-4 border-t ${sidebarBorderColor}`}>
              <h3 className={`font-semibold uppercase mb-2 ${sidebarMutedTextColor}`}>Summary</h3>
              <div
                  className={` max-w-none ${sidebarTextColor}`} 
                  dangerouslySetInnerHTML={{ __html: summaryContent }}
              />
           </div>
        )}
      </aside>
      <main className={mainContentClasses}>
        {sectionsToRender}
        <Footer showAttribution={showAttribution} />
      </main>
    </div>
  );
};

export default ModernSidebarLayout;