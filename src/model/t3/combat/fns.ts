import { limit } from '../../../utils';

export const cataMorale = (offPop: number, defPop: number) =>
    limit(0.3333, 1)((offPop / defPop) ** -0.3);
