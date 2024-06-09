import React, { useState, useEffect, useRef } from "react";
import Block from "./Block"; // Assuming Block component is in a separate file

const MazeCreator = ({
  x,
  y,
  onBlockClick,
  wallBlocks,
  sandBlocks,
  waterBlocks,
  lavaBlocks,
  starting,
  path,
  goal,
  pathing,
}) => {
  const createMaze = () => {
    const maze = [];
    for (let i = 0; i < x; i++) {
      const row = [];
      for (let j = 0; j < y; j++) {
        row.push(
          <Block
            x={i}
            y={j}
            key={`${i}-${j}`}
            onClick={onBlockClick}
            wallBlocks={wallBlocks}
            sandBlocks={sandBlocks}
            waterBlocks={waterBlocks}
            lavaBlocks={lavaBlocks}
            starting={starting}
            goal={goal}
            path={path}
            pathing={pathing}
          />
        );
      }
      maze.push(
        <div key={i} className="mazeRow">
          {row}
        </div>
      );
    }
    return maze;
  };

  return (
    <div id="maze" className="Maze">
      {createMaze()}
    </div>
  );
};

export default MazeCreator;
