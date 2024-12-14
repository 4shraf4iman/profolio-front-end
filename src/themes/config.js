export const themeConfigs = {
  modern: {
    colors: {
      primary: 'blue',
      secondary: 'slate',
      accent: 'sky'
    },
    styles: {
      section: 'bg-blue-50 dark:bg-gray-900',
      card: 'bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6',
      timeline: 'border-l-2 border-blue-500 dark:border-blue-400 ml-4',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      tag: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    }
  },
  classic: {
    colors: {
      primary: 'emerald',
      secondary: 'stone',
      accent: 'teal'
    },
    styles: {
      section: 'bg-emerald-50 dark:bg-gray-900',
      card: 'bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6',
      timeline: 'border-l-2 border-emerald-500 dark:border-emerald-400 ml-4',
      button: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      tag: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300'
    }
  },
  creative: {
    colors: {
      primary: 'fuchsia',
      secondary: 'violet',
      accent: 'pink'
    },
    styles: {
      section: 'bg-fuchsia-50 dark:bg-gray-900',
      card: 'bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6',
      timeline: 'border-l-2 border-fuchsia-500 dark:border-fuchsia-400 ml-4',
      button: 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white',
      tag: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-300'
    }
  },
  minimal: {
    colors: {
      primary: 'zinc',
      secondary: 'slate',
      accent: 'stone'
    },
    styles: {
      section: 'bg-zinc-50 dark:bg-gray-900',
      card: 'bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6',
      timeline: 'border-l border-gray-200 dark:border-gray-700 ml-4',
      button: 'bg-black hover:bg-gray-800 text-white',
      tag: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }
};

// Simplified and robust theme class getter
export const getThemeClasses = (themeId = 'modern', elementType = 'section') => {
  // Ensure themeId is a string and normalize it
  const normalizedThemeId = String(themeId).toLowerCase();
  
  // Get theme or fallback to modern
  // Check if theme exists
  if (!themeConfigs[normalizedThemeId]) {
    console.warn(`Theme "${themeId}" not found, falling back to modern theme`);
    return themeConfigs.modern.styles[elementType] || '';
  }
  
  // Get the requested theme
  const theme = themeConfigs[normalizedThemeId];
  
  // Check if the style exists for the requested element type
  if (!theme.styles || !theme.styles[elementType]) {
    console.warn(`Style "${elementType}" not found in theme "${themeId}"`);
    return '';
  }
  
  return theme.styles[elementType];
}

// Add a helper function to get available themes
export const getAvailableThemes = () => {
  return Object.keys(themeConfigs);
}

// Add a helper function to get theme colors
export const getThemeColors = (themeId) => {
  const normalizedThemeId = String(themeId).toLowerCase();
  return themeConfigs[normalizedThemeId]?.colors || themeConfigs.modern.colors;
}