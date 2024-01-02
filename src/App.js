import React, { useState } from "react";
import './App.css';

//imported pages
import CanvasPage from "./components/Canvas";
import Ui from "./components/Ui";

function App() {

  //GRID ON/OFF
  const [gridvalue1, setGridvalue1] = useState(0);
  const [gridvalue2, setGridvalue2] = useState(0);
  const [gridHandler, setGridhandler] = useState(false);
  const [gridText, setGridtext] = useState("Show Grid")
  const gridHelperHandler = () => {
    setGridhandler(!gridHandler)
    if(gridHandler === false){
      setGridvalue1(1000);
      setGridvalue2(50);
      setGridtext("Hide Grid");
    }else{
      setGridvalue1(0);
      setGridvalue2(0);
      setGridtext("Show Grid");
    }
  };

  //UI
  const [asteroidsQuantity, setAsteroidsQuantity] = useState(100);
  const [astMinSize, setAstMinSize] = useState(1);
  const [astMaxSize, setAstMaxSize] = useState(3);
  const [astSpeed, setAstSpeed] = useState(0.9);
  const [astMinDistance, setAstMinDistance] = useState(145);
  const [astMaxDistance, setAstMaxDistance] = useState(155);



  const [setState, setSetState] = useState(false);
  
  return (
    <div className="App">
      <div style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: "5"
      }}>
        <button onClick={gridHelperHandler}>{gridText}</button> 
      </div>

      <Ui 
        asteroidsQuantity={asteroidsQuantity} 
        setAsteroidsQuantity={setAsteroidsQuantity} 
        astMinSize={astMinSize} 
        setAstMinSize={setAstMinSize} 
        astMaxSize={astMaxSize} 
        setAstMaxSize={setAstMaxSize}
        setState={setState} 
        setSetState={setSetState}
        astSpeed={astSpeed}
        setAstSpeed={setAstSpeed} 
        astMinDistance={astMinDistance} 
        setAstMinDistance={setAstMinDistance} 
        astMaxDistance={astMaxDistance} 
        setAstMaxDistance={setAstMaxDistance} 

      />
      <CanvasPage 
        asteroidsQuantity={asteroidsQuantity} 
        astMinSize={astMinSize} 
        astMaxSize={astMaxSize} 
        astSpeed={astSpeed}
        astMinDistance={astMinDistance}
        astMaxDistance={astMaxDistance}

        gridvalue1={gridvalue1} 
        gridvalue2={gridvalue2} 
        setState={setState}
      />

    </div>
  );
}

export default App;
