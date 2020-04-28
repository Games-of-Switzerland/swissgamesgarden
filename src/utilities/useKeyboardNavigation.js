import {useEffect, useState} from 'react';
import {useKeyPressEvent} from 'react-use';

Math.clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export const useKeyboardNavigation = (size, callback) => {
  const [activeCursor, setActiveCursor] = useState(0);
  const [keyPressed, setKeyPressed] = useState(false);

  const max = size - 1;
  const min = 0;
  const setValue = value => Math.clamp(value, min, max);

  useKeyPressEvent('ArrowDown', () => {
    setKeyPressed(true);
    setActiveCursor(prev => setValue(prev + 1));
  });
  useKeyPressEvent('ArrowUp', () => {
    setKeyPressed(true);
    setActiveCursor(prev => setValue(prev - 1));
  });
  useKeyPressEvent('Enter', () => {
    console.log('enter', keyPressed);
    if (keyPressed) callback();
  });

  // Reset when size changes
  useEffect(() => {
    setActiveCursor(0);
    setKeyPressed(false);
  }, [size]);

  return [activeCursor, setActiveCursor, keyPressed];
};
