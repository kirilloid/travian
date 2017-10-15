import { roundP } from '../../utils';

const round = roundP(1000);

export default function culture(n) {
    return round(1600 * n ** 2.3);
}