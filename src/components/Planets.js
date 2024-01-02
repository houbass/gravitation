import React, { useEffect, useState } from "react";

//fiber and drei import
import { useFrame } from "@react-three/fiber"

//CUSTOM HOOKS
import hooks from "../hooks/Hooks";

//ELEMENTS
import Asteroids from "./Asteroids";

const Planets = ({ 
        rAmp, 
        gAmp, 
        setState, 
        asteroidsQuantity, 
        astMinSize, 
        astMaxSize, 
        astSpeed, 
        astMinDistance, 
        astMaxDistance  
    }) => {

    //CUSTOM HOOKS
    const {gravityFun, sinBFun, cosBFun} = hooks();

    //PLANET 1 GROWING
    const [planet1Growing, setPlanet1Growing] = useState(0);

    //PLANETS DEFINITION
    //green planet
    const rb1 = 15 + planet1Growing / 10;
    const mb1 = 6 * Math.pow(10, 24) * rb1 / 10;

    const [xb1, setXb1] = useState(250);
    const [yb1, setYb1] = useState(0);
    const [zb1, setZb1] = useState(0);
    const [vxb1, setVxb1] = useState(0.5);
    const [vyb1, setVyb1] = useState(-0.7);
    const [vzb1, setVzb1] = useState(0.3);
    const color1 = 0x3fb59e;
    //orange planet
    const xb3 = 0;
    const yb3 = 0;
    const zb3 = 0;
    const rb3 = 50;    
    const mb3 = 6 * Math.pow(10,24) * rb3 / 10;

    //ANIMATION
    //blue planet rotation variables
    const [rotationZ, setRotationZ] = useState(0);
    const [rotationX, setRotationX] = useState(0);
    const [rotation2, setRotation2] = useState(0);

    useFrame(() => {

        //ROTATION LOOP
        setRotationZ(rotationZ + Math.PI / 10000);
        setRotationX(rotationX + Math.PI / 1000);
        setRotation2(rotation2 + Math.PI / 500);

        //GRAVITATION LOOP
        //POHYB V GRAVITACNIM POLI
        //vzdalenosti L13 a uhel Beta13
        const Lx13 = xb3 - xb1;
        const Ly13 = yb3 - yb1;
        const Lz13 = zb3 - zb1;
        const Lxy13check = Math.sqrt(Math.pow(Lx13, 2) + Math.pow(Ly13, 2));
        const L13check = Math.sqrt(Math.pow(Lz13, 2) + Math.pow(Lxy13check, 2));
        let L13 = L13check * rAmp;
        const sinB13 = sinBFun(Ly13, L13);
        const cosB13 = cosBFun(Lx13, L13);
        const sinB13z = sinBFun(Lz13, L13);

        //vypocet Gb3 pro Gb1
        const Gb13 = gravityFun(mb3, L13);
        const Gyb13 = sinB13 * Gb13 * gAmp;
        const Gxb13 = cosB13 * Gb13 * gAmp;
        const Gzb13 = sinB13z * Gb13 * gAmp;

        //Ovlivňování vektoru12 gravitaci
        setVxb1(vxb1 + Gxb13);
        setVyb1(vyb1 + Gyb13);
        setVzb1(vzb1 + Gzb13);

        //hlavní pohyb bodu 1
        setXb1(xb1 + vxb1);
        setYb1(yb1 + vyb1);
        setZb1(zb1 + vzb1);
    });


    return (
        <>
            <mesh name="SUN" position={[xb3, yb3, zb3]}>
                <sphereGeometry args={[rb3, 64, 32]} />
                <meshBasicMaterial args={[{ color: 0xdf6e12 }]} />

            </mesh>

            <group name="BLUE PLANET" position={[xb3, yb3, zb3]} rotation={[rotationZ, rotationX, 0]} >
                <mesh position={[0, 0, 100]} rotation={[rotationZ, rotationX, 0]} >
                    <torusKnotGeometry args={[10, 3, 100, 16]}/>
                    <meshStandardMaterial args={[{ color: 0x3b75a9 }]} />
                </mesh>
            </group>

            <mesh name="GREEN PLANET" position={[xb1, yb1, zb1]}>
                <sphereGeometry args={[rb1, 64, 32]}/>
                <meshStandardMaterial args={[{ color: color1 }]} />
            </mesh>

            <group name="MOON OF GRAVITY" position={[xb1, yb1, zb1]} rotation={[rotation2, 0, 0]} >
                <mesh position={[0, 0, 30 + planet1Growing / 10]} >
                    <torusKnotGeometry args={[2, 3, 37, 8, 13, 11]}/>
                    <meshStandardMaterial args={[{ color: 0xa29890 }]} />
                </mesh>
            </group>               

            <Asteroids 
                rb3={rb3} 
                mb3={mb3} 
                rAmp={rAmp} 
                gAmp={gAmp} 
                rb1={rb1} 
                xb1={xb1} 
                yb1={yb1} 
                zb1={zb1} 
                mb1={mb1} 
                planet1Growing={planet1Growing} 
                setPlanet1Growing={setPlanet1Growing} 
                setState={setState} 
                asteroidsQuantity={asteroidsQuantity} 
                astMinSize={astMinSize} 
                astMaxSize={astMaxSize} 
                astSpeed={astSpeed}
                astMinDistance={astMinDistance}
                astMaxDistance={astMaxDistance}
            />
        </>
    )
}

export default Planets;