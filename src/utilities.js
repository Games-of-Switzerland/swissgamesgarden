import {useCallback, useEffect, useState} from "react";
import {useKey} from "react-use";

export const useKeyboardNavigation = (size, callback) => {
  const [activeCursor, setActiveCursor] = useState(0);

  useKey('ArrowDown',() => {
    setActiveCursor(prev => prev < size ? prev + 1 : 0);
  });

  useKey('ArrowUp', () => {
    setActiveCursor(prev => prev > 0 ? prev - 1 : size);
  });

  useKey('Enter', callback);

  // Reset when size changes
  useEffect(() => setActiveCursor(0), [size]);

  return [activeCursor, setActiveCursor];
};
