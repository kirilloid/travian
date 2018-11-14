import { compose, limit, roundP } from '../../../utils';

export const cataMorale = (offPop: number, defPop: number) =>
    limit(0.3333, 1)((offPop / defPop) ** -0.3);

export const immensity = compose(
    roundP(0.0002),
    limit(1.2578, 1.5),
    (n: number) => 3.7184 - 2 * n ** 0.015,
);
