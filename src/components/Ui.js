import { useEffect, useState } from "react";




const Ui = ({ 
        asteroidsQuantity, 
        setAsteroidsQuantity, 
        setState, 
        setSetState, 
        astMinSize, 
        setAstMinSize, 
        astMaxSize, 
        setAstMaxSize,
        astSpeed,
        setAstSpeed, 
        astMinDistance, 
        setAstMinDistance,
        astMaxDistance, 
        setAstMaxDistance
    }) => {

    //SHOW SETTING HANDLER
    const [showSettings, setShowSettings] = useState("hidden");
    const [showSettingsOpacity, setShowSettingsOpacity] = useState(0);
    const [showSettingsState, setShowSettingsState] = useState(false);
    const showSettingsFunction = () => {
        setShowSettingsState(!showSettingsState);
        if(showSettingsState === false){
            setShowSettings("visible");
            setShowSettingsOpacity(1);
        }else{
            setShowSettings("hidden");
            setShowSettingsOpacity(0);
        }
    }

    console.log(showSettings);

    //ASTEROIDS SETTINGS
    const asteroidsQuantityHandler = (e) => {
        setAsteroidsQuantity(Number(e.target.value));
    };
    const asteroidsMinSizeHandler = (e) => {
        setAstMinSize(Number(e.target.value));
        if(Number(astMinSize) > Number(astMaxSize)){
            setAstMaxSize(Number(e.target.value));
        }else{}
    };
    const asteroidsMaxSizeHandler = (e) => {
        setAstMaxSize(Number(e.target.value));
        if(Number(astMaxSize) < Number(astMinSize)){
            setAstMinSize(Number(e.target.value));
        }else{}
    };
    const asteroidsSpeedHandler = (e) => {
        setAstSpeed(Number(e.target.value));
    };


    const asteroidsMinDistanceHandler = (e) => {
        setAstMinDistance(Number(e.target.value));
        if(Number(astMinDistance) > Number(astMaxDistance)){
            setAstMaxDistance(Number(e.target.value));
        }else{}
    };
    const asteroidsMaxDistanceHandler = (e) => {
        setAstMaxDistance(Number(e.target.value));
        if(Number(astMaxDistance) < Number(astMinDistance)){
            setAstMinDistance(Number(e.target.value));
        }else{}
    };


    //SET HANDLER
    const setHandler = () => {
        setSetState(!setState);
    };


    return(
        <>
        <button onClick={showSettingsFunction} className="ui">Settings</button>
        
        
            <div className="uipage" style={{visibility: showSettings, opacity: showSettingsOpacity}}>
                <h4>Asteroids</h4>
                <div>
                    <div className="uilabel">
                        <p>quantity:</p>
                        <p><strong>{asteroidsQuantity}</strong></p>
                    </div>
                    <input onChange={asteroidsQuantityHandler} type="range" min="10" max="500" step="10" value={asteroidsQuantity}></input>
                </div>

                <div>
                    <div className="uilabel">
                        <p>min size:</p>
                        <p><strong>{astMinSize}</strong></p>
                    </div>
                    <input onChange={asteroidsMinSizeHandler} type="range" min="1" max="30" step="1" value={astMinSize}></input>
                </div>

                <div>
                    <div className="uilabel">
                        <p>max size:</p>
                        <p><strong>{astMaxSize}</strong></p>
                    </div>
                    <input onChange={asteroidsMaxSizeHandler} type="range" min="1" max="30" step="1" value={astMaxSize} ></input>
                </div>

                <div>
                    <div className="uilabel">
                        <p>speed:</p>
                        <p><strong>{astSpeed}</strong></p>
                    </div>
                    <input onChange={asteroidsSpeedHandler} type="range" min="0" max="3" step="0.1" defaultValue="0.9"></input>
                </div>

                <div>
                    <div className="uilabel">
                        <p>min distance:</p>
                        <p><strong>{astMinDistance}</strong></p>
                    </div>
                    <input onChange={asteroidsMinDistanceHandler} type="range" min="70" max="300" step="1" value={astMinDistance}></input>
                </div>

                <div>
                    <div className="uilabel">
                        <p>max distance:</p>
                        <p><strong>{astMaxDistance}</strong></p>
                    </div>
                    <input onChange={asteroidsMaxDistanceHandler} type="range" min="80" max="300" step="1" value={astMaxDistance} ></input>
                </div>

                
                <button onClick={setHandler}>set</button>

            </div>


       
        </>
    )
}

export default Ui;