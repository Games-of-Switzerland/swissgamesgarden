import {useEffect, useRef, useState} from "react";
import {useKey} from "react-use";

export default function useComponentVisible(initialIsVisible, hideWithEscape = true) {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsComponentVisible(false);
    }
  };

  useKey('Escape', () => setIsComponentVisible(false));

  useEffect(()  => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  }
}
