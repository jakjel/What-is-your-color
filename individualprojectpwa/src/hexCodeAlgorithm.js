export function usersColorRange(hexCode) {
    const rgbValues = hexToRgb(hexCode);
    let colorRange = "";
//this can be refactored into a dicionary
    if (isInRange(rgbValues, [90, 255], [0,60], [0, 60])) {
        colorRange = "red";
    } else if (isInRange(rgbValues, [0, 60], [120, 255], [0, 60])) {
        colorRange = "green";
    } else if (isInRange(rgbValues, [0, 90], [0, 255], [120, 255])) {
        colorRange = "blue";
    } else if (isInRange(rgbValues, [200, 255], [200, 255], [0, 100])) {
        colorRange = "yellow";
    } else if (isInRange(rgbValues, [210, 255], [210, 255], [170, 200])) {
        colorRange = "light";
    } else if (isInRange(rgbValues, [0,140], [0,140], [0,140])){
        colorRange = "dark";
    }else {
        colorRange = "none"
    }
    console.log(colorRange)
    return colorRange;
}

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

function isInRange(rgbValues, rRange, gRange, bRange) {
    return (
        rRange[0] <= rgbValues[0] && rgbValues[0] <= rRange[1] &&
        gRange[0] <= rgbValues[1] && rgbValues[1] <= gRange[1] &&
        bRange[0] <= rgbValues[2] && rgbValues[2] <= bRange[1]
    );
}
