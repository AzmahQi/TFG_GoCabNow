'use state'
import { useState, useEffect } from 'react';

const useSectionId = (sectionIds) => {
  const [currentSectionId, setCurrentSectionId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Adjust the offset value based on your layout and design
      const offset = 150;

      // Find the current section based on scroll position
      const currentSection = sectionIds.find((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top - offset <= 0 && rect.bottom - offset > 0;
        }
        return false;
      });

      // Update the current section ID
      setCurrentSectionId(currentSection || '');
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Call the handler once to set the initial section ID
    handleScroll();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  return currentSectionId;
};

export default useSectionId;
