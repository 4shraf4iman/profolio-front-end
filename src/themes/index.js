export const themeConfigs = {
  modern: {
    colors: {
      primary: 'blue',
      secondary: 'gray',
      accent: 'indigo'
    },
    spacing: {
      section: 'mb-6',
      element: 'mb-4'
    },
    layout: {
      timeline: true,
      cards: false
    }
  },
  classic: {
    colors: {
      primary: 'gray',
      secondary: 'blue',
      accent: 'slate'
    },
    spacing: {
      section: 'mb-8',
      element: 'mb-6'
    },
    layout: {
      timeline: false,
      cards: true
    }
  },
  creative: {
    colors: {
      primary: 'purple',
      secondary: 'pink',
      accent: 'violet'
    },
    spacing: {
      section: 'mb-10',
      element: 'mb-6'
    },
    layout: {
      timeline: true,
      cards: true
    }
  },
  minimal: {
    colors: {
      primary: 'slate',
      secondary: 'zinc',
      accent: 'stone'
    },
    spacing: {
      section: 'mb-12',
      element: 'mb-8'
    },
    layout: {
      timeline: false,
      cards: false
    }
  }
}

export const getThemeClasses = (themeId, elementType) => {
  const theme = themeConfigs[themeId]
  
  const baseClasses = {
    section: `bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 ${theme.spacing.section}`,
    heading: `text-2xl sm:text-3xl font-bold mb-6 text-${theme.colors.primary}-900 dark:text-white`,
    subheading: `text-lg font-semibold text-${theme.colors.secondary}-900 dark:text-white`,
    card: `bg-${theme.colors.secondary}-50 dark:bg-gray-700 rounded-lg p-6`,
    button: `bg-${theme.colors.primary}-600 hover:bg-${theme.colors.primary}-700 text-white`,
    timeline: theme.layout.timeline ? 'border-s border-gray-200 dark:border-gray-700' : '',
    tag: `bg-${theme.colors.accent}-100 text-${theme.colors.accent}-800 dark:bg-${theme.colors.accent}-900 dark:text-${theme.colors.accent}-300`
  }

  return baseClasses[elementType]
} 