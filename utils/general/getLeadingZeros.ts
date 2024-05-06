export const getLeadingZeros = (number: number, digits: number) => {
    let i = number.toString();
    while (i.length < digits) {
        i ='0' + i;
    }
    return i;
}