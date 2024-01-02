import React from "react";

const Lights = ({ gridvalue1, gridvalue2 }) => {

    return(
        <>
            <mesh name="LIGHTS">
                <pointLight args={[0xffffff]} position={[0, 0, 0]} />
                <gridHelper args={[gridvalue1, gridvalue2]} /> 
                <ambientLight args={[0x404040]} />
            </mesh>
        </>
    )
}

export default Lights;