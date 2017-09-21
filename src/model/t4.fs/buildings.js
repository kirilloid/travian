import { extend } from '../../utils';

import { TimeT3 } from '../base/buildings';
import buildings from '../t4/buildings';

export default extend(buildings, {
    41: {c: [ 110, 160,  70,  60], k: 1.28, u: 0, cp:1, t:new TimeT3( 3875), m:20, e:9, y:2, r: {r:6}, dt: 'b_42_t4'},
    42: {c: [  50,  80,  40,  30], k: 1.28, u: 0, cp:1, t:new TimeT3( 3875), m:20, e:9, y:2, r: {r:7}},
    43: {c: [1600,1250,1050, 200], k: 1.22, u: 1, cp:2, t:new TimeT3( 3875), m:20, e:9, y:3, r: {r:7,v:"4-"}, b: {15:5, 25:-1, 26:-1}},
    44: {c: [ 650, 670, 650, 240], k: 1.28, u: 1, cp:1, t:new TimeT3( 3875), m:20, e:2, y:1, r: {r:6,v:"4-"}, b: {37:10}}
});