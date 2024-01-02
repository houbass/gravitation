import React, { useEffect, useState } from "react";

//THREE FIBER
import { useFrame } from "@react-three/fiber"

//CUSTOM HOOKS
import hooks from "../hooks/Hooks";

const Asteroids = ({ 
        rb3, 
        mb3, 
        rAmp, 
        gAmp, 
        xb1, 
        yb1, 
        zb1, 
        mb1, 
        rb1, 
        setPlanet1Growing, 
        setState, 
        asteroidsQuantity, 
        astMinSize, 
        astMaxSize,
        astSpeed,
        astMinDistance, 
        astMaxDistance 
    }) => {

    //CUSTOM HOOKS
    const {randomRange, gravityFun, sinBFun, cosBFun} = hooks();

    //ASTEROIDS SETTINGS
    //const asteroidQuantity = 500;
    const asteroidSpeed = astSpeed;
    const asteroidMinRadius = astMinSize;
    const asteroidMaxRadius = astMaxSize;
    const asteroidMinLength = rb3 + astMinDistance;
    const asteroidMaxLength = rb3 + astMaxDistance;
    const asteroidZmin = 20;
    const asteroidZmax = -1 * asteroidZmin;
    const asteroidBetaMin = 0;
    const asteroidBetaMax = Math.PI * 2;
    
    //CLASSES FOR RANDOM POSITION
    class Asteroids {
        constructor(ly, lx, asteroidZ, r, vX, vY, index){
            this.x = lx;
            this.y = ly;
            this.z = asteroidZ;
            this.r = r;
            this.vx = vX;
            this.vy = vY;
            this.vz = 0;
            this.index = index;
        }

        update(x, y, z, mb1, rb1) {
            //GRAVITATION LOOP
            
            //POHYB V GRAVITACNIM POLI SLUNCE
            //vzdalenosti L13 a uhel Beta13
            const Lx13 = 0 - this.x;
            const Ly13 = 0 - this.y;
            const Lz13 = 0 - this.z;
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


            //POHYB V GRAVITACNIM POLI TELESA 2
            const Lx23 = x - this.x;
            const Ly23 = y - this.y;
            const Lz23 = z - this.z;
            const Lxy23check = Math.sqrt(Math.pow(Lx23, 2) + Math.pow(Ly23, 2));
            const L23check = Math.sqrt(Math.pow(Lz23, 2) + Math.pow(Lxy23check, 2));
            let L23 = L23check * rAmp;
            const sinB23 = sinBFun(Ly23, L23);
            const cosB23 = cosBFun(Lx23, L23);
            const sinB23z = sinBFun(Lz23, L23);
            //vypocet Gb3 pro Gb2
            const Gb23 = gravityFun(mb1, L23);
            const Gyb23 = sinB23 * Gb23 * gAmp;
            const Gxb23 = cosB23 * Gb23 * gAmp;
            const Gzb23 = sinB23z * Gb23 * gAmp;        


            //Ovlivňování vektoru12 gravitaci
            this.vx += Gxb13 + Gxb23;
            this.vy += Gyb13 + Gyb23;
            this.vz += Gzb13 + Gzb23;
            if(L13check < rb3 + this.r/2){
                this.vx = 0;
                this.vy = 0;
                this.vz = 0;

            }
            if(L23check < rb1 - this.r/4){
                this.r = 0;
            }else{

    
            //hlavní pohyb bodu 1
            this.x += this.vx;
            this.y += this.vy;        
            this.z += this.vz;
            };

            for (let j=0; j < 10; j++){

            }
        }

    }

    //RANDOM LOOP
    const [asteroids, setAsteroids] = useState([]);
    const [filteredAsteroids, setFilteredAsteroids] = useState([]);
    const [asteroidWithZeroR, setAsteroidWithZeroR] = useState([]);
    
    useEffect(() => {
        const asteroidHandler = [];
        for (let i = 0; i < asteroidsQuantity; i++ ) {
            const rFromSun = randomRange(asteroidMinLength, asteroidMaxLength);
            const asteroidZ = randomRange(asteroidZmin, asteroidZmax);
            const asteroidBeta = randomRange(asteroidBetaMin, asteroidBetaMax);
            const ly = Math.sin(asteroidBeta) * rFromSun;
            const lx = Math.cos(asteroidBeta) * rFromSun;
            const r = randomRange(asteroidMinRadius, asteroidMaxRadius);

            //počateční vector
            const asteroidGama = Math.PI - asteroidBeta;
            const thisSpeed = asteroidSpeed * Math.sqrt(rFromSun / asteroidMinLength);
            const deltaLx = thisSpeed * Math.sin(asteroidGama);
            const deltaLy = thisSpeed * Math.cos(asteroidGama);
            const vX = deltaLx;
            const vY = deltaLy;
            const index = i;

            asteroidHandler.push(new Asteroids(ly, lx, asteroidZ, r, vX, vY, index));
        }
        setAsteroids(asteroidHandler);

    }, [setState])
    
    //ANIMATION
    const [rotationAsteroids, setRotationAsteroids] = useState(0);
    useFrame(() => {
        setRotationAsteroids(rotationAsteroids + Math.PI / 3000);
        //filter asteroids with r=0 for render;
        setFilteredAsteroids(asteroids.filter((agent) => agent.r !== 0));
        //filter asteroids with r=0 for planet 1 growing;
        setAsteroidWithZeroR(asteroids.filter((agent) => agent.r === 0));
        setPlanet1Growing(asteroidWithZeroR.length);
        asteroids.forEach((agent) => {
            agent.update(xb1, yb1, zb1, mb1, rb1);
        });
    });

    return (
        <>
            <group name="ASTEROIDS" rotation={[0, 0, 0]}>
                {filteredAsteroids.map((asteroid) => (
                    <mesh key={randomRange(0, 1000000)} position={[asteroid.x, asteroid.y, asteroid.z]}>
                        <sphereGeometry args={[asteroid.r, 8, 4]} />
                        <meshStandardMaterial args={[{ color: 0xa29890 }]} />
                    </mesh>
                ))}                
            </group>        
        </>
    )
};

export default Asteroids;