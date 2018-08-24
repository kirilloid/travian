export default function culture(n: number): number {
    return (n < 7
        ? [0, 0, .1, .5, 1, 2, 4][n]
        : Math.ceil(.16 * (n-2) ** 2.33)) * 10000;
}
