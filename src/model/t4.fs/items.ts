import items, { Item } from '../t4/items';

export default items.concat([
    // 115: egyptians
	{str: 500, unit: { 50: 3 }},	{str: 1000, unit: { 50: 4 }},	{str: 1500, unit: { 50: 5 }},
	{str: 500, unit: { 51: 3 }},	{str: 1000, unit: { 51: 4 }},	{str: 1500, unit: { 51: 5 }},
	{str: 500, unit: { 52: 3 }},	{str: 1000, unit: { 52: 4 }},	{str: 1500, unit: { 52: 5 }},
	{str: 500, unit: { 54: 6 }},	{str: 1000, unit: { 54: 8 }},	{str: 1500, unit: { 54: 10 }},
	{str: 500, unit: { 55: 9 }},	{str: 1000, unit: { 55: 12 }},	{str: 1500, unit: { 55: 15 }},
	// 130: huns
	{str: 500, unit: { 60: 3 }},	{str: 1000, unit: { 60: 4 }},	{str: 1500, unit: { 60: 5 }},
	{str: 500, unit: { 61: 3 }},	{str: 1000, unit: { 61: 4 }},	{str: 1500, unit: { 61: 5 }},
	{str: 500, unit: { 63: 6 }},	{str: 1000, unit: { 63: 8 }},	{str: 1500, unit: { 63: 10 }},
	{str: 500, unit: { 64: 6 }},	{str: 1000, unit: { 64: 8 }},	{str: 1500, unit: { 64: 10 }},
    {str: 500, unit: { 65: 9 }},	{str: 1000, unit: { 65: 12 }},	{str: 1500, unit: { 65: 15 }},
]) as Item[];