export const capitalize = (val: string) => {
    const char = val[0];
    const rest = val.slice(1).toLowerCase();
    const final = String.fromCharCode(char.charCodeAt(0)-32) + rest;
    return final;
}