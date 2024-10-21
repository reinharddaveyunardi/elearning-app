import random from "random-number";

const generateCode = () => {
    const code = random({min: 1000, max: 9999, integer: true});
    return code;
};

export default generateCode;
