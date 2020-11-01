import React, {useEffect, useRef, useState} from 'react';
import {Layer, Rect, Stage, Text} from 'react-konva';
import Konva from 'konva';

import Mouse from './Mouse';

const HeaderTitle = () => {
  //   const container = useRef(null);
  //
  // Settings.
  const squareLifeMin = 50; // squares will die after this time (ms) (random)
  const squareLifeMax = 800;
  const deathAnimTime = 300; // length of the CSS death animation (ms)
  const spawnNumberMin = 1; // number of squares to spawn on each tick (random)
  const spawnNumberMax = 3;
  const spawnDistanceMin = -1; // number of cells based on the active one (under
  // cursor) (random)
  const spawnDistanceMax = 1;
  const squareSize = 60;
  const gridOffset = 30;
  const tick = 50; // speed at which the squares spawn (ms)
  const autoTickMin = 500; // speed at which the squares spawn automatically (ms)
  const autoTickMax = 1000;
  const autoMultiplier = 4; // will spawn X times more and on a surface times
  // wider squares than on mouseover

  // Don't touch those.
  let mousePos = [0, 0];
  let squares = [];
  let isMouseDown = false;
  let shouldDraw = true;
  let posString;

  // Set the nearest cell as active.

  // Handle the mouse moving.
  let timeout = false;
  const onMouseMove = e => {
    // Always check the active cell.
    mousePos = [e.pageX, e.pageY];
    setActiveCell();

    // Spawn squares on each tick.
    if (!timeout) {
      timeout = true;
      setTimeout(() => {
        spawnRandomSquares();
        timeout = false;
      }, tick);
    }
  };

  // The actual spawning.
  const spawnRandomSquares = (pos = activeCell, multiplier = 1) => {
    // Get a random number of random positions around the active cell.
    for (
      let i = 0;
      i <
      randomIntFromInterval(
        spawnNumberMin * multiplier,
        spawnNumberMax * multiplier
      );
      i++
    ) {
      let newPos = [];

      // Change the square position if we already have one at this place.
      newPos = [
        randomIntFromInterval(spawnDistanceMin, spawnDistanceMax * multiplier) *
          squareSize +
          pos[0],
        randomIntFromInterval(spawnDistanceMin, spawnDistanceMax * multiplier) *
          squareSize +
          pos[1],
      ];
      const newPosString = `${newPos[0]}|${newPos[1]}`;

      // Add the square if not already present.
      if (
        !squares.includes(newPosString) &&
        !drawnSquares.includes(newPosString)
      ) {
        squares.push(getStorePosString(newPos));
        setTimeout(() => {
          addRect(newPos, multiplier);
        }, randomIntFromInterval(100, 300));
      }
    }
  };

  const addRect = (pos = mousePos, multiplier = 1) => {
    // Add a square and kill it after a moment.
    const square = document.createElement('div');
    square.classList.add('square');
    positionSquare(square, pos);
    container.appendChild(square);

    // Plan the destruction of the square.
    const deathTime = randomIntFromInterval(
      squareLifeMin * multiplier,
      squareLifeMax * multiplier
    );

    // CSS animation timeout.
    setTimeout(() => {
      square.classList.add('dying');
    }, deathTime - deathAnimTime);
    // Death timeout.
    setTimeout(() => {
      removeRect(square);
    }, deathTime);
  };
  const removeRect = rect => {
    // Destroy the square!
    rect.remove();
    squares = squares.filter(item => item !== rect.dataset.pos);
  };
  const positionSquare = (square, pos = activeCell) => {
    // Position the square in the grid, where the mouse is.
    square.style.top = `${pos[1]}px`;
    square.style.left = `${pos[0]}px`;
    // Store the position for later use.
    square.dataset.pos = `${pos[0]}|${pos[1]}`;
  };
  const randomIntFromInterval = (min, max) => {
    // Get a random int from an interval.
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  // Automatically spawn some squares at random times.
  let autoTimer;

  const autoSpawnSquares = () => {
    // Get a random cell in the screen.
    const randomPos = [
      getNearestCellCoordinate(randomIntFromInterval(0, container.offsetWidth)),
      getNearestCellCoordinate(
        randomIntFromInterval(0, container.offsetHeight)
      ),
    ];
    spawnRandomSquares(randomPos, autoMultiplier);

    // Rerun the same function at random tick.
    autoTimer = setTimeout(
      autoSpawnSquares,
      randomIntFromInterval(autoTickMin, autoTickMax)
    );
  };
  // Store the position for later use.
  const getStorePosString = position => `${position[0]}|${position[1]}`;

  // Draw squares on click.
  let drawnSquares = [];

  const drawSquare = () => {
    const square = container.createElement('rect');
    square.classList.add('drawing');
    square.classList.add('square');
    positionSquare(square, activeCell);
    squares.push(posString);
    drawnSquares.push(posString);
    container.appendChild(square);
  };
  const eraseSquare = () => {
    // Erase a drawn square.
    const square = container.querySelector(`[data-pos="${posString}"]`);
    if (square) {
      square.remove();
      drawnSquares = drawnSquares.filter(item => item !== posString);
    }
  };
  // Handle the click.
  const onClick = () => {};

  const onMouseDown = () => {
    shouldDraw = !drawnSquares.includes(posString);
    isMouseDown = true;
    drawOrErase();
  };
  const onMouseUp = () => {
    isMouseDown = false;
  };
  const drawOrErase = () => {
    // Draw or erase squares.
    if (shouldDraw) {
      if (!drawnSquares.includes(posString)) {
        drawSquare();
      }
    } else {
      eraseSquare();
    }
  };
  const onActiveCellChange = () => {
    // Handle the change of active cell.
    posString = getStorePosString(activeCell);
    if (isMouseDown) {
      drawOrErase();
    }
  };
  ///////////////
  ///////////////
  ///////////////
  ///////////////
  ///////////////

  const container = useRef(null);

  let rect;
  const [stageWidth, setStageWidth] = useState(0);
  // let activeCell = [0,0];
  const [activeCell, setActiveCell] = useState([0, 0]);
  const [pixels, setPixels] = useState([]);
  useEffect(() => {
    window.addEventListener('resize', () =>
      setStageWidth(container.current.offsetWidth)
    );
    setStageWidth(container.current.offsetWidth);
    rect = container.current.getBoundingClientRect();
  }, []);

  const drawCell = () => {
    setPixels(prevState => [...prevState, <Pixel color="#f00" />]);
  };

  useEffect(drawCell, [activeCell]);

  let Pixel = params => (
    <Rect
      x={20}
      y={20}
      width={20}
      height={20}
      fill={params.color || Konva.Util.getRandomColor()}
    />
  );

  const RandomPixels = () => pixels.map((Pix, i) => <Pix key={i} />);

  const handleMouseDown = e => {
    console.log(e);
  };

  return (
    <div className="bg-grid" ref={container}>
      <p className="text-display1">
        Find and discover <br />
        <span className="text-multicolor">video games from Switzerland</span>
      </p>
      <Mouse {...{gridOffset, squareSize, activeCell, setActiveCell}}>
        <Stage
          className="header-canvas"
          width={stageWidth}
          height={310}
          onMouseDown={handleMouseDown}
        >
          <Layer>
            <RandomPixels />
          </Layer>
        </Stage>
      </Mouse>
    </div>
    // <div
    //   className="container"
    //   onMouseMove={e => onMouseMove(e)}
    //   onMouseDown={e => onMouseDown(e)}
    //   onMouseUp={e => onMouseUp(e)}
    //   ref={container}
    // >
    //   <div className="content">
    //     <p className="text-display1">Find and discover <br/> <span
    //       className="text-multicolor">video games from Switzerland</span></p>
    //   </div>
    // </div>
  );
};

export default HeaderTitle;
