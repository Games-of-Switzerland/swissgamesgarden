import {useEffect, useRef, useState} from "react";

export default function useComponentVisible(initialIsVisible, hideWithEscape = true) {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsComponentVisible(false);
    }
  };

  const handleHideComponent = e => {
    if (e.key === 'Escape') {
      setIsComponentVisible(false);
    }
  };

  useEffect(()  => {
    document.addEventListener('click', handleClickOutside, true);
    if (hideWithEscape) {
      document.addEventListener('keydown', handleHideComponent, true);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      if (hideWithEscape) {
        document.removeEventListener('keydown', handleHideComponent, true);
      }
    };
  });

  return {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  }
}
