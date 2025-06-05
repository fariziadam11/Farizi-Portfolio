import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Then check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [ripple, setRipple] = useState(null);

  // Handle theme change with water ripple effect
  const toggleDarkMode = useCallback((event) => {
    // If no event is provided (e.g., programmatic toggle), use center of screen
    const { clientX = window.innerWidth / 2, clientY = window.innerHeight / 2 } = event || {};
    
    // Set ripple position
    setRipple({
      x: clientX,
      y: clientY,
      id: Date.now()
    });

    // Add theme-changing class to body for wave effect
    document.body.classList.add('theme-changing');
    
    // Toggle theme after a small delay to allow ripple animation to start
    setTimeout(() => {
      const newDarkMode = !darkMode;
      setDarkMode(newDarkMode);
      localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
      
      // Toggle dark class on html element
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Remove the theme-changing class after animation completes
      setTimeout(() => {
        document.body.classList.remove('theme-changing');
      }, 1000); // Reduced from 1500ms to 1000ms for smoother transition
      
    }, 50); // Reduced from 100ms to 50ms for faster response
  }, [darkMode]);

  // Initial theme setup
  useEffect(() => {
    // Apply initial theme
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className="theme-transition">
        {children}
        <AnimatePresence>
          {ripple && (
            <div
              key={ripple.id}
              className="theme-ripple"
              style={{
                left: `${ripple.x}px`,
                top: `${ripple.y}px`,
                '--ripple-color': darkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)'
              }}
              onAnimationEnd={() => setRipple(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);