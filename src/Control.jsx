import React, { useState, useRef } from "react";
import { FiChevronsRight } from "react-icons/fi";

const Control = React.forwardRef((props, ref) => {
  const [firstTry, setFirstTry] = useState(true);
  // const [message, setMessage] = useState(props.msg);
  const [sizeError, setSizeError] = useState("");

  const handleHideDiv = () => {
    ref.current.style.display = "none";
  };

  const widhtInput = useRef(null);
  const heightInput = useRef(null);

  const handleFirstTry = () => {
    var validInput = true;
    console.log("First Try");
    if (widhtInput.current.value && heightInput.current.value) {
      if (widhtInput.current.value > 20) {
        setSizeError("Width must be <= 20");
        validInput = false;
      }
      if (widhtInput.current.value <= 0) {
        setSizeError("Width must be > 0");
        validInput = false;
      }
      if (heightInput.current.value > 20) {
        setSizeError("Height must be <= 20");
        validInput = false;
      }
      if (heightInput.current.value <= 0) {
        setSizeError("Height must be > 0");
        validInput = false;
      }
    } else {
      if (widhtInput.current.value) {
        heightInput.current.focus;
      } else {
        widhtInput.current.focus;
      }
      setSizeError("Please Enter  width and height for your maze");
      validInput = false;
    }

    if (validInput) {
      props.onButtonClick(heightInput.current.value, widhtInput.current.value);
      setFirstTry(false);
      handleHideDiv();
      props.changeEp();
    }
  };

  return (
    <>
      <div className="controlDiv" ref={ref}>
        <div className="allContainer">
          <div className="controlContainer">
            <p>{props.msg}</p>
            {firstTry && (
              <div className="sizeHolder">
                <p>Enter Your Maze's Size : </p>
                <div className="sizeInputs">
                  <input
                    type="number"
                    placeholder="width"
                    ref={widhtInput}
                    min="1"
                    max="10"
                  />
                  ×
                  <input
                    type="number"
                    placeholder="height"
                    ref={heightInput}
                    min="1"
                    max="10"
                  />
                </div>
                <p className="errorSize">{sizeError}</p>
              </div>
            )}
            <button onClick={firstTry ? handleFirstTry : handleHideDiv}>
              {firstTry ? (
                <>
                  Continue <FiChevronsRight />
                </>
              ) : (
                <>
                  Okey <FiChevronsRight />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

Control.displayName = "Control";

export default Control;
