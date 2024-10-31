// rounds with respect to the precision/fractional digits desired
// e.g., 240.00019 with precision=4 converts to 240.0002


export const toMathFractionalDigits = (number: number, precision: number) => {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}


