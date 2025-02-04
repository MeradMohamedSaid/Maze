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
  path,
  goal,
  starting,
  pathing,
}) => {
  // Correct image paths for the public folder
  const clear = `url(${process.env.PUBLIC_URL}/clear.webp)`;
  const wall = `url(${process.env.PUBLIC_URL}/wall.webp)`;
  const water = `url(${process.env.PUBLIC_URL}/Water.webp)`;
  const sand = `url(${process.env.PUBLIC_URL}/sand.webp)`;
  const lava = `url(${process.env.PUBLIC_URL}/lava.gif)`;

  const pathBlock = `${process.env.PUBLIC_URL}/path.webp`;
  const goalPos = `${process.env.PUBLIC_URL}/goal.webp`;
  const win = `${process.env.PUBLIC_URL}/win.png`;
  const steve = `${process.env.PUBLIC_URL}/steve.png`;
  const flag = `${process.env.PUBLIC_URL}/flag.gif`;

  const block = useRef();
  const cords = { x, y };

  useEffect(() => {
    if (wallBlocks.some((obj) => obj.x === x && obj.y === y)) {
      block.current.style.backgroundImage = wall;
    } else if (sandBlocks.some((obj) => obj.x === x && obj.y === y)) {
      block.current.style.backgroundImage = sand;
    } else if (lavaBlocks.some((obj) => obj.x === x && obj.y === y)) {
      block.current.style.backgroundImage = lava;
    } else if (waterBlocks.some((obj) => obj.x === x && obj.y === y)) {
      block.current.style.backgroundImage = water;
    } else {
      block.current.style.backgroundImage = clear;
    }
  }, [wallBlocks, sandBlocks, waterBlocks, lavaBlocks, goal, x, y]);

  const [isStarting, setIsStarting] = useState(false);
  useEffect(() => {
    setIsStarting(starting.x === x && starting.y === y);
  }, [starting, x, y]);

  const [isGoal, setIsGoal] = useState(false);
  useEffect(() => {
    setIsGoal(goal.x === x && goal.y === y);
  }, [goal, x, y]);

  const [isPathing, setIsPathing] = useState(false);
  useEffect(() => {
    setIsPathing(pathing.x === x && pathing.y === y);
  }, [pathing, x, y]);

  const [isPath, setIsPath] = useState(false);
  useEffect(() => {
    setIsPath(path.some((obj) => obj.x === x && obj.y === y));
  }, [path, x, y]);

  const handleBlockClick = () => {
    onClick(cords.x, cords.y);
  };

  return (
    <div className="mazeBlock" ref={block} onClick={handleBlockClick}>
      {isPath && !isGoal && !isStarting && <img src={pathBlock} alt="Path" />}
      {isGoal && !isStarting && <img src={goalPos} alt="Goal" />}
      {isStarting && !isGoal && <img src={steve} alt="Starting Position" />}
      {isStarting && isGoal && <img src={win} className="bounce" alt="Win" />}
      {isPathing && !isStarting && <img src={flag} alt="Flag" />}
    </div>
  );
};

export default Block;
