import React from "react";

//fiber and drei import
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, TrackballControls} from "@react-three/drei";

//CANVAS ELEMENTS
//import Asteroids from "./Asteroids";
import Lights from "./Lights";
import Planets from "./Planets";

const CanvasPage = ({ 
        gridvalue1, 
        gridvalue2, 
        setState, 
        asteroidsQuantity, 
        astMinSize, 
        astMaxSize, 
        astSpeed, 
        astMinDistance, 
        astMaxDistance 
    }) => {

    //VELIKOST CANVAS
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    //GRAVITATION
    //settings
    const rAmp = 2 * Math.pow (10, 5)
    const gAmp = 2 * 2500 /5;  

    return (
        <div className="canvas" style={{width: width, height: height, background: "black"}}>

                <Canvas >
                    <TrackballControls />
                    <PerspectiveCamera makeDefault args={[75, 1, 0.1, 100000]} position={[90, -170, 400]} />

                    <Lights gridvalue1={gridvalue1} gridvalue2={gridvalue2}/>

                    <group>
                        <Planets 
                            rAmp={rAmp} 
                            gAmp={gAmp} 
                            gridvalue1={gridvalue1} 
                            gridvalue2={gridvalue2} 
                            setState={setState} 
                            asteroidsQuantity={asteroidsQuantity}
                            astMinSize={astMinSize} 
                            astMaxSize={astMaxSize} 
                            astSpeed={astSpeed}
                            astMinDistance={astMinDistance}
                            astMaxDistance={astMaxDistance} 
                        />
                    </group>
                </Canvas>

        </div>
    )
}

export default CanvasPage;