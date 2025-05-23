import { getInvertIconStyle } from '../../utils/styleUtils';

const ItemTitle = ({ item, primaryColor, isDarkMode }) => {
  const label =
    item.company ||
    item.institution ||
    item.name ||
    item.network ||
    item.title;
  const link = item.url?.href;
  const networkIcon = item.network?.toLowerCase();

  return (
    <span className="flex items-center gap-2 text-md sm:text-lg font-semibold print:text-base">  
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          style={{ color: primaryColor }}
        >
          {networkIcon && (
            <img
              src={`https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/${networkIcon}.svg`}
              alt={item.network || 'icon'}
              className="inline-block h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 print:h-4 print:w-4" 
              style={getInvertIconStyle(isDarkMode)}
              onError={(e) => {
                 e.target.style.display = 'none';
                console.warn('Icon not found:', item.network);
              }}
            />
          )}
          {label}
         </a>
      ) : (
        <span style={{ color: primaryColor }}>{label}</span>
      )}
    </span>
  );
};

export default ItemTitle;