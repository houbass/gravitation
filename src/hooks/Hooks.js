

const hooks = () => {
    
    //RANDOM RANGE NUMBER HOOK
    const randomRange = (min, max) => {
        return (Math.random() * (max-min)) + min;
    }

    //GRAVITATION HOOKS
    //gravitational acceleration
    const gc = 6.67424 * Math.pow(10, -11);
    const gravityFun = (m, r) => {
        return gc * m / Math.pow(r, 2);
    }

    //sinB and cosB HOOKS
    const sinBFun = (y, l) => {
        return y / l
    } 
    const cosBFun = (x, l) => {
        return x / l
    } 


    return {
        randomRange,
        gravityFun,
        sinBFun,
        cosBFun
    }
}

export default hooks;