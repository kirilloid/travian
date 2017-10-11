import { extend } from '../../utils';

import units from '../t4/units';

export default extend(units, {
	5:[	{a:10, di:30, dc:20, v:7, c:[   45,   60,   30,   15], u:1, t:  530, p:15,  t:'i', rt:3390},
		{a:30, di:55, dc:40, v:6, c:[  115,  100,  145,   60], u:1, t: 1320, p:50,  t:'i', rt:5760},
		{a:65, di:50, dc:20, v:7, c:[  170,  180,  220,   80], u:1, t: 1440, p:45,  t:'i', rt:6120},
		{a:0,  di:20, dc:10, v:16,c:[  170,  150,   20,   40], u:2, t: 1360, p:0,   t:'c', rt:5880, s:35, ds:20},
		{a:50, di:110,dc:50, v:15,c:[  360,  330,  280,  120], u:2, t: 2560, p:50,  t:'c', rt:9480},
		{a:110,di:120,dc:150,v:10,c:[  450,  560,  610,  180], u:3, t: 3240, p:70,  t:'c', rt:11520},
		{a:55, di:30, dc:95, v:4, c:[  995,  575,  340,   80], u:3, t: 4800, p:0,   t:'i', rt:16200},
		{a:65, di:55, dc:10, v:3, c:[  980, 1510,  660,  100], u:6, t: 9000, p:0,   t:'i', rt:28800},
		{a:40, di:50, dc:50, v:4, c:[34000,50000,34000,42000], u:4, t:90700, p:0,   t:'i', rt:24475, l:[20,25]},
		{a:0,  di:80, dc:80, v:5, c:[ 4560, 5890, 4370, 4180], u:1, t:24800, p:3000,t:'i', rt:0}
	],
	6:[	{a:35, di:40, dc:30, v:6, c:[  130,   80,   40,   40], u:1, t:  810, p:50,  t:'i', rt:4230},
		{a:50, di:30, dc:10, v:6, c:[  140,  110,   60,   60], u:1, t: 1120, p:30,  t:'i', rt:5160},
		{a:0,  di:20, dc:10, v:19,c:[  170,  150,   20,   40], u:2, t: 1360, p:0,   t:'c', rt:5880, s:35, ds:20},
		{a:120,di:30, dc:15, v:16,c:[  290,  370,  190,   45], u:2, t: 2400, p:115, t:'c', rt:9000},
		{a:115,di:80, dc:70, v:16,c:[  320,  350,  330,   50], u:2, t: 2480, p:105, t:'c', rt:9240},
		{a:180,di:60, dc:40, v:14,c:[  450,  560,  610,  140], u:3, t: 2990, p:80,  t:'c', rt:10770},
		{a:65, di:30, dc:90, v:4, c:[ 1060,  330,  360,   70], u:3, t: 4400, p:0,   t:'i', rt:15000},
		{a:45, di:55, dc:10, v:3, c:[  950, 1280,  620,   60], u:6, t: 9000, p:0,   t:'i', rt:28800},
		{a:40, di:50, dc:50, v:5, c:[37200,27600,25200,27600], u:4, t:90700, p:0,   t:'i', rt:24475, l:[15,30]},
		{a:0,  di:80, dc:80, v:5, c:[ 6100, 4600, 4800, 5400], u:1, t:28950, p:3000,t:'i', rt:0}
	]
});