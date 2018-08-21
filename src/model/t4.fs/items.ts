import items, { Item } from '../t4/items';

export default items.concat([
    // 115: egyptians
    {str: 500, utype: 50, ubonus: 3}, {str: 1000, utype: 50, ubonus: 4}, {str: 1500, utype: 50, ubonus: 5},
    {str: 500, utype: 51, ubonus: 3}, {str: 1000, utype: 51, ubonus: 4}, {str: 1500, utype: 51, ubonus: 5},
    {str: 500, utype: 52, ubonus: 3}, {str: 1000, utype: 52, ubonus: 4}, {str: 1500, utype: 52, ubonus: 5},
    {str: 500, utype: 54, ubonus: 6}, {str: 1000, utype: 54, ubonus: 8}, {str: 1500, utype: 54, ubonus: 10},
    {str: 500, utype: 55, ubonus: 9}, {str: 1000, utype: 55, ubonus: 12}, {str: 1500, utype: 55, ubonus: 15},
    // 130: huns
    {str: 500, utype: 60, ubonus: 3}, {str: 1000, utype: 60, ubonus: 4}, {str: 1500, utype: 60, ubonus: 5},
    {str: 500, utype: 61, ubonus: 3}, {str: 1000, utype: 61, ubonus: 4}, {str: 1500, utype: 61, ubonus: 5},
    {str: 500, utype: 63, ubonus: 6}, {str: 1000, utype: 63, ubonus: 8}, {str: 1500, utype: 63, ubonus: 10},
    {str: 500, utype: 64, ubonus: 6}, {str: 1000, utype: 64, ubonus: 8}, {str: 1500, utype: 64, ubonus: 10},
    {str: 500, utype: 65, ubonus: 9}, {str: 1000, utype: 65, ubonus: 12}, {str: 1500, utype: 65, ubonus: 15},
]) as Item[];
