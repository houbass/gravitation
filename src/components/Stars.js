import React, { useEffect, useState } from "react";

//CUSTOM HOOKS
import hooks from "../hooks/Hooks";

const Stars = () => {

    //CUSTOM HOOKS
    const { randomRange } = hooks();

    //STARS SETTINGS
    const quantity = 100;
    const maxRange = 1000;
    const minRange = -1 * maxRange;
    const minRadius = 0.3;
    const maxRadius = 2;
    //random positions
    class Agent {
        constructor(){
            this.x = randomRange(minRange, maxRange);
            this.y = randomRange(minRange, maxRange);
            this.z = randomRange(minRange, maxRange);
            this.r = randomRange(minRadius, maxRadius);
        }
    }
    //loop for random position
    const [agents, setAgents] = useState([]);
    useEffect(() => {
        const agentsHandler = [];
        for (let i = 0; i < quantity; i++ ) {
            agentsHandler.push(new Agent());
        }
        setAgents(agentsHandler);
    }, [])
    
    return (
        <>
            {agents.map((agent) => (
                <mesh name="STARS" key={randomRange(0, 1000000)} position={[agent.x, agent.y, agent.z]}>
                    <sphereGeometry args={[agent.r, 16, 8]} />
                    <meshBasicMaterial args={[{ color: 0xffffff }]} />
                </mesh>
            ))}
        </>
    )
    
}

export default Stars;