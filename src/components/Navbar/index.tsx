'use client';
import Navbar from './Navbar';
import React, { useEffect } from 'react';

const Navbarin: React.FC = () => {
  useEffect(() => {
    // Generic debounce that waits for next animation frame
    function debounce<T extends (...args: unknown[]) => void>(fn: T) {
      let frame: number | 0 = 0;
      return (...args: Parameters<T>) => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => fn(...args));
      };
    }

    const storeScroll = () => {
      document.documentElement.dataset.scroll = String(window.scrollY);
    };

    const handleScroll = debounce(storeScroll);
    document.addEventListener('scroll', handleScroll, { passive: true });
    storeScroll();

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <div className="bg-navbar">
        <Navbar />
      </div>
    </>
  );
};

export default Navbarin;
