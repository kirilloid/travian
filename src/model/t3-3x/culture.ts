import { roundP } from '../../utils';

const round = roundP(100);

export default function culture(n: number) {
    return round(1600 / 3 * n ** 2.3);
}