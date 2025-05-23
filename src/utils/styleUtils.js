export const getAllDocumentStyles = () => {
  let css = [];

  const getRules = (sheet) => {
    try {
      return sheet.cssRules || sheet.rules || [];
    } catch (e) {
      if (e.name === 'SecurityError') {
        console.warn("Cannot access CSS rules from cross-origin stylesheet:", sheet.href);
      } else {
        console.warn("Error accessing CSS rules from stylesheet:", sheet.href, e);
      }
      return [];
    }
  };

  Array.from(document.styleSheets).forEach(sheet => {
    Array.from(getRules(sheet)).forEach(rule => {
      css.push(rule.cssText);
    });

    if (sheet.imports) { 
        Array.from(sheet.imports).forEach(importedSheet => {
            Array.from(getRules(importedSheet)).forEach(rule => {
                css.push(rule.cssText);
            });
        });
    }
  });

  document.querySelectorAll('head > style').forEach(styleTag => {
    css.push(styleTag.innerHTML);
  });
  return css.join('\n');
};

export const getInvertIconStyle = (isDarkMode) => {
  if (isDarkMode) {
    return { filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(200%) contrast(100%)' };
  }
  return { filter: 'none' };
};
 
export const isColorLight = (hexColor) => {
  if (!hexColor || typeof hexColor !== 'string') return true;
  const color = hexColor.startsWith('#') ? hexColor.substring(1) : hexColor;
  
  if (color.length !== 6 && color.length !== 3) return true;  

  let r, g, b;
  try {
    if (color.length === 3) {
      r = parseInt(color[0] + color[0], 16);
      g = parseInt(color[1] + color[1], 16);
      b = parseInt(color[2] + color[2], 16);
    } else {
      r = parseInt(color.substring(0, 2), 16);
      g = parseInt(color.substring(2, 4), 16);
      b = parseInt(color.substring(4, 6), 16);
    }
  } catch (e) {
    return true; 
  }

  if (isNaN(r) || isNaN(g) || isNaN(b)) return true;

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150; 
};