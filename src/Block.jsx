import React, { useEffect, useRef, useState } from "react";

const Block = ({
  x,
  y,
  onClick,
  wallBlocks,
  sandBlocks,
  waterBlocks,
  lavaBlocks,
  sizeWidth,
  sizeHeight,
  blocks,
  path,
  goal,
  starting,
  pathing,
}) => {
  const clear = "url(../public/clear.webp)";
  const wall = "url(../public/wall.webp)";
  const water = "url(../public/Water.webp)";
  const sand = "url(../public/sand.webp)";
  const lava = "url(../public/lava.gif)";
  const pathBlock = "../public/path.webp";
  const goalPos = "../public/goal.webp";
  const win = "../public/win.png";
  const steve = "../public/steve.png";
  const flag = "../public/flag.gif";

  const block = useRef();
  const cords = { x: x, y: y };

  useEffect(() => {
    if (wallBlocks.find((obj) => obj.x === x && obj.y === y)) {
      block.current.style.backgroundImage = wall;
    } else {
      if (sandBlocks.find((obj) => obj.x === x && obj.y === y)) {
        block.current.style.backgroundImage = sand;
      } else {
        if (lavaBlocks.find((obj) => obj.x === x && obj.y === y)) {
          block.current.style.backgroundImage = lava;
        } else {
          if (waterBlocks.find((obj) => obj.x === x && obj.y === y)) {
            block.current.style.backgroundImage = water;
          } else {
            block.current.style.backgroundImage = clear;
          }
        }
      }
    }
  }, [wallBlocks, sandBlocks, waterBlocks, lavaBlocks, goal]);

  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    if (starting.x === x && starting.y === y) {
      setIsStarting((isStarting) => true);
    } else {
      setIsStarting((isStarting) => false);
    }
  }, [starting]);

  const [isGoal, setIsGoal] = useState(false);
  useEffect(() => {
    if (goal.x === x && goal.y === y) {
      setIsGoal((isGoal) => true);
    } else {
      setIsGoal((isGoal) => false);
    }
  }, [goal]);

  const [isPathing, setIsPathing] = useState(false);
  useEffect(() => {
    if (pathing.x === x && pathing.y === y) {
      setIsPathing((isPathing) => true);
    } else {
      setIsPathing((isPathing) => false);
    }
  }, [pathing]);

  const [isPath, setIsPath] = useState(false);
  useEffect(() => {
    if (path.find((obj) => obj.x === x && obj.y === y)) {
      setIsPath((isPath) => true);
    } else {
      setIsPath((isPath) => false);
    }
  }, [path]);

  const handleBlockClick = () => {
    onClick(cords.x, cords.y);
  };

  return (
    <div
      className="mazeBlock"
      x={x}
      y={y}
      ref={block}
      onClick={handleBlockClick}
    >
      {isPath && !isGoal && !isStarting && <img src={pathBlock} />}
      {isGoal && !isStarting && <img src={goalPos} />}
      {isStarting && !isGoal && <img src={steve} />}
      {isStarting && isGoal && <img src={win} className="bounce" />}
      {isPathing && !isStarting && <img src={flag} />}
    </div>
  );
};

export default Block;
