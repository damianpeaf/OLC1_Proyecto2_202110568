

export const charToNumber = (operation: (a: any, b: any) => any) => {
    return (a: any, b: any) => {
        if (typeof a === 'number') {
            return operation(a, b.charCodeAt(0));
        } else {
            return operation(a.charCodeAt(0), b);
        }
    }
}
