import { AiFillThunderbolt } from "react-icons/ai";
import { useRef, useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
const TopBar = (props) => {
  const bat = useRef(null);

  useEffect(() => {
    if (bat.current) {
      if (props.moves <= 0) {
        bat.current.style.justifyContent = "center";
      } else {
        bat.current.style.justifyContent = "start";
      }
    }
  }, [props.moves]);

  function battreyBar() {
    if (props.moves === 0) {
      return <AiFillThunderbolt className="Batt" />;
    } else {
      const divs = Array.from({ length: props.moves }, (_, index) => (
        <div key={index} className="bar" />
      ));
      return <>{divs}</>;
    }
  }

  return (
    <>
      <div className="topBar">
        <div className="bar-holder">
          <div className="steveIcon">
            <img src="../public/steveFAce.png" alt="steve" />
            <div>
              <h3>Steve Finding Diamonds</h3>
              <h5>Maze Solving Using AI (A* Algorithm)</h5>
            </div>
          </div>
          <div className="leftMenu">
            <div className="bar-info">
              <div className="batteryholder">
                <div
                  className="battery"
                  ref={bat}
                  onClick={props.increaseMoves}
                >
                  {battreyBar()}
                </div>
                <div className="endBattery"></div>
              </div>
              <p>
                Maze Size : {props.size.width} x {props.size.height}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
