'use client'
import { createContext, useState, useEffect } from "react";

export default function useScrollListener() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0
  });

  // set up event listeners
  useEffect(() => {
    const handleScroll = () => {
      setData((last) => {
        return {
          x: window.scrollX,
          y: window.scrollY,
          lastX: last.x,
          lastY: last.y
        };
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return data;
}

export const ScrollContext = createContext(null);
//to re-use
//import useScrollListener from '@/app/hooks/useScrollListener'
//const scroll = useScrollListener();
//const [navClassList, setNavClassList] = useState([]);
  // update classList of nav on scroll
  /*useEffect(() => {
    const _classList = [];

    
    if (scroll.y > 150 && scroll.y - scroll.lastY > 0)
      _classList.push("nav-bar--hidden");

    setNavClassList(_classList);
  }, [scroll.y, scroll.lastY]);*/
 // in navigation class use this in className navClassList.join(" ") + 