

// let { [x: string]: string | number; name: string; age: number; gender: string; } = {}

let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};

let fn: () => number = () => {
    return 1;
}

interface T {
    fn: () => {};
    fn2: Function;
}