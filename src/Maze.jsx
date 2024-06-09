import { useState, useRef, useEffect } from "react";
import Control from "./Control";
import MazeTest from "./MazeTest";
import { FaLightbulb } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { FiChevronsRight } from "react-icons/fi";
import { MdAutoAwesome } from "react-icons/md";
import TopBar from "./TopBar";

const Maze = () => {
  const [blockCoordinates, setBlockCoordinates] = useState(null);
  const [sandBlocks, addSandBlock] = useState([]);
  const [waterBlocks, addWaterBlock] = useState([]);
  const [lavaBlocks, addLavaBlocks] = useState([]);
  const [wallBlocks, addwallBlock] = useState([]);
  const [path, setPath] = useState([]);
  const [starting, setStarting] = useState({ x: null, y: null });
  const [pathing, setPathing] = useState({ x: null, y: null });
  const [goal, setGoal] = useState({ x: null, y: null });
  const [moves, setMoves] = useState(8);

  const [continueButton, setContinueButton] = useState("Continue");
  const [currentEpisode, setCurrentEpisode] = useState(0);

  const [currentBlock, setCurrentBlock] = useState(0);

  const sandRef = useRef(null);
  const watarRef = useRef(null);
  const lavaRef = useRef(null);

  const addWall = (x, y) => {
    if (!wallBlocks.find((obj) => obj.x === x && obj.y === y)) {
      addwallBlock([...wallBlocks, { x, y }]);
    } else {
      const updatedWalls = wallBlocks.filter(
        (obj) => obj.x !== x || obj.y !== y
      );
      addwallBlock(updatedWalls);
    }
  };

  const addSand = (x, y) => {
    if (!wallBlocks.find((obj) => obj.x === x && obj.y === y)) {
      if (!sandBlocks.find((obj) => obj.x === x && obj.y === y)) {
        addSandBlock([...sandBlocks, { x, y }]);
      } else {
        const updatedSands = sandBlocks.filter(
          (obj) => obj.x !== x || obj.y !== y
        );
        addSandBlock(updatedSands);
      }
      if (waterBlocks.find((obj) => obj.x === x && obj.y === y)) {
        console.log("found on water");
        const updatedWater = waterBlocks.filter(
          (obj) => obj.x !== x || obj.y !== y
        );
        addWaterBlock(updatedWater);
      }
      if (lavaBlocks.find((obj) => obj.x === x && obj.y === y)) {
        console.log("found on lava");
        const updatedLava = lavaBlocks.filter(
          (obj) => obj.x !== x || obj.y !== y
        );
        addLavaBlocks(updatedLava);
      }
    }
  };

  const addWater = (x, y) => {
    if (!wallBlocks.find((obj) => obj.x === x && obj.y === y)) {
      if (!waterBlocks.find((obj) => obj.x === x && obj.y === y)) {
        addWaterBlock([...waterBlocks, { x, y }]);
      } else {
        const updatedWater = waterBlocks.filter(
          (obj) => obj.x !== x || obj.y !== y
        );
        addWaterBlock(updatedWater);
      }
      if (sandBlocks.find((obj) => obj.x === x && obj.y === y)) {
        console.log("foun on sand");
        const updatedSand = sandBlocks.filter(
          (obj) => obj.x !== x || obj.y !== y
        );
        addSandBlock(updatedSand);
      }
      if (lavaBlocks.find((obj) => obj.x === x && obj.y === y)) {
        console.log("found on lava");
        const updatedLava = lavaBlocks.filter(
          (obj) => obj.x !== x || obj.y !== y
        );
        addLavaBlocks(updatedLava);
      }
    }
  };

  const addLava = (x, y) => {
    if (!wallBlocks.find((obj) => obj.x === x && obj.y === y)) {
      if (!lavaBlocks.find((obj) => obj.x === x && obj.y === y)) {
        addLavaBlocks([...lavaBlocks, { x, y }]);
      } else {
        const updatedLava = lavaBlocks.filter(
          (obj) => obj.x !== x || obj.y !== y
        );
        addLavaBlocks(updatedLava);
      }
      if (sandBlocks.find((obj) => obj.x === x && obj.y === y)) {
        console.log("foun on sand");
        const updatedSand = sandBlocks.filter(
          (obj) => obj.x !== x || obj.y !== y
        );
        addSandBlock(updatedSand);
      }
      if (waterBlocks.find((obj) => obj.x === x && obj.y === y)) {
        console.log("found on lava");
        const updatedWater = waterBlocks.filter(
          (obj) => obj.x !== x || obj.y !== y
        );
        addWaterBlock(updatedWater);
      }
    }
  };

  const addTextures = (x, y) => {
    switch (currentBlock) {
      case 1: // add Sand
        addSand(x, y);
        break;
      case 2: //add water
        addWater(x, y);
        break;
      case 3: //add lava
        addLava(x, y);
        break;
    }
  };
  const setStartingPosition = (x, y) => {
    if (!wallBlocks.find((obj) => obj.x === x && obj.y === y)) {
      setStarting((starting) => (starting = { x: x, y: y }));
    }
  };

  const setGoalPosition = (x, y) => {
    setGoal((goal) => (goal = { x: x, y: y }));
  };
  const handleBlockClick = (x, y) => {
    console.log(`Block clicked at coordinates: ${x}, ${y}`);
    switch (currentEpisode) {
      case 1: //select walls;
        addWall(x, y);
        break;
      case 2: // select other Blocks
        addTextures(x, y);
        break;
      case 3: // Select Starting
        setStartingPosition(x, y);
        break;
      case 4: //select Ending
        setGoalPosition(x, y);
        break;
    }

    setBlockCoordinates({ x, y });
    const timeOut = setTimeout(() => {
      setBlockCoordinates(null);
      clearTimeout(timeOut);
    }, 2000);
  };

  const maze = useRef(null);
  const controlDiv = useRef(null);
  const [size, setSize] = useState({ width: null, height: null });

  const handleSizeSet = (x, y) => {
    setSize((size) => ({ width: x, height: y }));
  };

  const [msg, setMsg] = useState(
    "Welcome To AI Maze Solving TP Using A* Algorithm"
  );

  useEffect(() => {
    controlDiv.current.style.display = "none";
  }, []);

  const ShowControlDiv = () => {
    controlDiv.current.style.display = "block";
  };

  useEffect(() => {
    ShowControlDiv();
  }, [msg]);

  const resetMaze = () => {
    if (currentEpisode === 1) {
      addwallBlock([]);
    } else {
      if (currentEpisode === 2) {
        addSandBlock([]);
        addWaterBlock([]);
        addLavaBlocks([]);
      } else {
        if (currentEpisode === 6 || currentEpisode === 5) {
          setCurrentEpisode((currentEpisode) => 3);
          setPath([]);
          setStarting({ x: null, y: null });
          setGoal({ x: null, y: null });
          setMoves((moves) => 8);
          setContinueButton((continueButton) => "Continue");
          setPathing((pathing) => (pathing = { x: null, y: null }));
        }
      }
    }
  };
  useEffect(() => {
    switch (currentEpisode) {
      case 0:
        setMsg("Welcome To AI Maze Solving TP Using A* Algorithm");
        break;
      case 1:
        setMsg("Please Select Your Maze's Walls");
        setCurrentBlock((currentBlock) => 1);
        break;
      case 2:
        setMsg("Add Other Textures To your Maze");
        break;
      case 3:
        setMsg("Select Your Starting Position");
        break;
      case 4:
        setMsg("Select Your Goal Position");
        break;
      case 5:
        setMsg("Start The Search");
        setContinueButton((continueButton) => "Start");
        break;
    }
  }, [currentEpisode]);

  const switchBlock = (x) => {
    setCurrentBlock((currentBlock) => x);
    switch (x) {
      case 1:
        sandRef.current.classList = "inventory current";
        watarRef.current.classList = "inventory";
        lavaRef.current.classList = "inventory";

        break;
      case 2:
        sandRef.current.classList = "inventory";
        watarRef.current.classList = "inventory current";
        lavaRef.current.classList = "inventory";
        break;
      case 3:
        sandRef.current.classList = "inventory";
        watarRef.current.classList = "inventory";
        lavaRef.current.classList = "inventory current";
        break;
    }
  };

  function findPath(starting, goal, size, wallBlocks) {
    const manhattan = (point1, point2) => {
      return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
    };
    class Node {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.g = Infinity;
        this.h = manhattan({ x: x, y: y }, goal);
        this.f = Infinity;
        this.parent = null;
        this.isWall = wallBlocks.some((wall) => wall.x === x && wall.y === y);
        this.isWater = waterBlocks.some((wall) => wall.x === x && wall.y === y);
        this.isLava = lavaBlocks.some((wall) => wall.x === x && wall.y === y);
      }
    }
    const mapStruct = [];
    for (let x = 0; x < size.width; x++) {
      mapStruct[x] = [];
      for (let y = 0; y < size.height; y++) {
        mapStruct[x][y] = new Node(x, y);
      }
    }
    const getNeighbors = (node) => {
      const neighbors = [];
      var tempNeighbors = [];
      const { x, y } = node;
      if (x > 0) neighbors.push(mapStruct[x - 1][y]);
      if (x < size.width - 1) neighbors.push(mapStruct[x + 1][y]);
      if (y > 0) neighbors.push(mapStruct[x][y - 1]);
      if (y < size.height - 1) neighbors.push(mapStruct[x][y + 1]);
      tempNeighbors = neighbors;
      if (node.isWater) {
        tempNeighbors = neighbors.filter((neighbor) => !neighbor.isWater);
      }
      var temp2 = [];
      temp2 = tempNeighbors.filter((neighbors) => !neighbors.isLava);
      return temp2.filter((neighbor) => !neighbor.isWall);
    };
    const startNode = mapStruct[starting.x][starting.y];
    startNode.g = 0;
    startNode.f = startNode.h;
    const openSet = [startNode];
    const closedSet = [];
    while (openSet.length > 0) {
      const currentNode = openSet.reduce((minNode, node) =>
        node.f < minNode.f ? node : minNode
      );
      openSet.splice(openSet.indexOf(currentNode), 1);
      closedSet.push(currentNode);
      if (currentNode === mapStruct[goal.x][goal.y]) {
        const path = [];
        let node = currentNode;
        while (node !== startNode) {
          path.push({ x: node.x, y: node.y });
          setPath(path);
          node = node.parent;
        }
        setMsg("Path Successfully added to the Maze");
        console.log(path.reverse());
        return path;
      }
      const neighbors = getNeighbors(currentNode);
      neighbors.forEach((neighbor) => {
        if (closedSet.includes(neighbor)) return;
        const tentativeG = currentNode.g + 1;
        if (!openSet.includes(neighbor) || tentativeG < neighbor.g) {
          neighbor.parent = currentNode;
          neighbor.g = tentativeG;
          neighbor.f = neighbor.g + neighbor.h;
          if (!openSet.includes(neighbor)) openSet.push(neighbor);
        }
      });
    }

    setMsg("No Possible Path Found");
    return null;
  }

  const solveMaze = async () => {
    if (
      starting.x === null ||
      starting.y === null ||
      goal.x === null ||
      goal.y === null ||
      size.width === null ||
      size.height === null
    ) {
      setMsg("Maze dimensions or starting/goal points are not set.");
      return;
    }

    // const newPath = findPath(starting, goal, size, wallBlocks);
    // if (newPath) {
    //   setPath((path) => newPath);
    //   setMoves((moves) => 5);
    //   setPathing((pathing) => (pathing = { x: starting.x, y: starting.y }));
    //   // calculate the approximate time + 2000
    //   setTimeout(() => {
    //     console.log("Starting The Chase");
    //     newPath.forEach((block, index) => {
    //       setTimeout(() => {
    //         console.log("Starting");
    //         setStarting({ x: block.x, y: block.y });
    //         if (moves > 0) {
    //           setMoves((moves) => moves - 1);
    //         } else {
    //           setMoves((moves) => 0);
    //         }
    //       }, index * 500);
    //       console.log("Starting set to " + index);
    //     });
    //   }, 2000);
    //   setTimeout(() => {
    //     setMsg(
    //       "Congratulations , Steve Got His diamond and he Crafted a crown from it"
    //     );
    //   }, newPath.length * 500 + 2000);
    // }

    const newPath = findPath(starting, goal, size, wallBlocks);
    if (newPath) {
      setPath((path) => newPath);
      setMoves(8);
      var movess = 8;
      setPathing({ x: starting.x, y: starting.y });
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let index = 0;
        while (index < newPath.length) {
          var timeToWait =
            300 *
            (sandBlocks.some(
              (block) =>
                block.x === newPath[index].x && block.y === newPath[index].y
            )
              ? 3
              : 1);
          await new Promise((resolve) => setTimeout(resolve, timeToWait));
          setStarting({ x: newPath[index].x, y: newPath[index].y });
          movess = Math.max(movess - 1, 0);
          setMoves((moves) => movess);
          if (movess === 0) {
            setMoves((moves) => movess);
            setMsg("Your robot has run out of battery, please charge it again");
            // Wait until moves are fully charged
            await new Promise((resolve) => {
              const interval = setInterval(() => {
                movess++;
                setMoves(movess);
                if (movess === 8 || movess > newPath.length - index) {
                  clearInterval(interval);
                  //setMsg("Your battery is now charged, let's continue the run");
                  resolve();
                }
              }, 1000);
            });
          } else {
            console.log("moves : " + moves);
            index++;
          }
        }
        setTimeout(() => {
          setMsg(
            "Congratulations, Steve Got His diamond and he Crafted a crown from it"
          );
        }, 200);
      })();
    }
  };

  // useEffect(() => {
  //   if (moves < 0) {
  //     setMoves((moves) => 0);
  //   }
  // }, [moves]);

  const handleEpisodeChange = () => {
    if (currentEpisode < 3) {
      setCurrentEpisode((currentEpisode) => currentEpisode + 1);
    } else {
      if (currentEpisode === 3) {
        if (starting.x !== null) {
          setCurrentEpisode((currentEpisode) => 4);
        }
      }
      if (currentEpisode === 4) {
        if (goal.x !== null) {
          setCurrentEpisode((currentEpisode) => 5);
        }
      }
      if (currentEpisode === 5) {
        solveMaze();
        setCurrentEpisode((currentEpisode) => 6);
      }
    }
  };

  const increaseMoves = () => {
    if (moves < 8) {
      setMoves((moves) => moves + 1);
    }
  };

  function genWall() {
    const height = size.height;
    const width = size.width;
    const maxWall = (height * width * Math.floor(Math.random() * 55)) / 100;
    var walls = [];
    for (var i = 0; i < maxWall; i++) {
      var x;
      var y;
      do {
        x = Math.floor(Math.random() * width);
        y = Math.floor(Math.random() * height);
      } while (walls.some((wall) => wall.x === x && wall.y === y));
      walls.push({ x: x, y: y });
    }

    return walls;
  }

  function genWater() {
    const height = size.height;
    const width = size.width;
    const maxWater = (height * width * Math.floor(Math.random() * 20)) / 100;
    var waters = [];
    for (var i = 0; i < maxWater; i++) {
      var x;
      var y;
      do {
        x = Math.floor(Math.random() * width);
        y = Math.floor(Math.random() * height);
      } while (
        wallBlocks.some((wall) => wall.x === x && wall.y === y) ||
        waters.some((wall) => wall.x === x && wall.y === y)
      );
      waters.push({ x: x, y: y });
    }

    return waters;
  }

  function genLava() {
    const height = size.height;
    const width = size.width;
    const maxWater = (height * width * Math.floor(Math.random() * 10)) / 100;
    var lavas = [];
    for (var i = 0; i < maxWater; i++) {
      var x;
      var y;
      do {
        x = Math.floor(Math.random() * width);
        y = Math.floor(Math.random() * height);
      } while (
        wallBlocks.some((wall) => wall.x === x && wall.y === y) ||
        waterBlocks.some((wall) => wall.x === x && wall.y === y) ||
        lavas.some((wall) => wall.x === x && wall.y === y)
      );
      lavas.push({ x: x, y: y });
    }

    return lavas;
  }

  const generateMap = () => {
    if (currentEpisode < 2) {
      addwallBlock((wallBlocks) => (wallBlocks = genWall()));
    }
    addWaterBlock((waterBlocks) => (waterBlocks = genWater()));
    addLavaBlocks((lavaBlocks) => (lavaBlocks = genLava()));
    addSandBlock([]);
  };

  return (
    <>
      <Control
        ref={controlDiv}
        msg={msg}
        onButtonClick={handleSizeSet}
        changeEp={handleEpisodeChange}
      />

      <div className="container">
        {size.height && size.width && (
          <TopBar size={size} moves={moves} increaseMoves={increaseMoves} />
        )}
        {size.width && size.height ? (
          <MazeTest
            x={size.width}
            y={size.height}
            onBlockClick={handleBlockClick}
            wallBlocks={wallBlocks}
            sandBlocks={sandBlocks}
            waterBlocks={waterBlocks}
            lavaBlocks={lavaBlocks}
            starting={starting}
            goal={goal}
            path={path}
            pathing={pathing}
          />
        ) : (
          "Maze"
        )}
        {currentEpisode == 2 && (
          <div className="other-blocks">
            <div
              className="inventory current"
              onClick={() => switchBlock(1)}
              ref={sandRef}
            >
              <img src="../public/sand.webp" alt="sand" />
            </div>
            <div
              className="inventory"
              onClick={() => switchBlock(2)}
              ref={watarRef}
            >
              <img src="../public/Water.webp" alt="water" />
            </div>
            <div
              className="inventory"
              onClick={() => switchBlock(3)}
              ref={lavaRef}
            >
              <img src="../public/lava.webp" alt="lava" />
            </div>
          </div>
        )}
        {currentEpisode < 3 && (
          <>
            <button onClick={generateMap}>
              Auto Generate Map
              <MdAutoAwesome style={{ fontSize: "1.20rem" }} />
            </button>
          </>
        )}
        <div className="buttons">
          <button onClick={ShowControlDiv}>
            Quick Tip
            <FaLightbulb style={{ fontSize: ".80rem" }} />
          </button>
          <button onClick={resetMaze}>
            Reset <GrPowerReset style={{ fontSize: ".80rem" }} />
          </button>
          {currentEpisode !== 6 && (
            <button onClick={handleEpisodeChange}>
              {continueButton}
              <FiChevronsRight />
            </button>
          )}
        </div>
        {blockCoordinates ? (
          <p>
            Last clicked block coordinates: {blockCoordinates.x} ,
            {blockCoordinates.y}
          </p>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};

export default Maze;
