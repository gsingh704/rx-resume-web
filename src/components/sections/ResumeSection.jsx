import SectionItem from './SectionItem';

const ResumeSection = ({ section, primaryColor, isDarkMode }) => (
  <section key={section.id || section.name} className="mb-4 sm:mb-6 print:mb-4"> 
    <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 border-b-2 pb-2 print:text-lg print:mb-2"  
    style={{ color: primaryColor, borderColor: primaryColor + '80' }}>
      {section.name}
    </h2>
    <ul className="pl-0">
      {(section.items || []).map((item, index) => (
        <SectionItem key={item.id || index} item={item} primaryColor={primaryColor} isDarkMode={isDarkMode} />
      ))}
    </ul>
  </section>
);

export default ResumeSection;