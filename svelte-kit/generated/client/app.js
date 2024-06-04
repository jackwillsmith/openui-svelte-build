export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16')
];

export const server_loads = [];

export const dictionary = {
		"/(app)": [3,[2]],
		"/(app)/admin": [4,[2]],
		"/auth": [14],
		"/(app)/c/[id]": [5,[2]],
		"/(app)/documents": [6,[2]],
		"/error": [15],
		"/(app)/modelfiles": [7,[2]],
		"/(app)/modelfiles/create": [8,[2]],
		"/(app)/modelfiles/edit": [9,[2]],
		"/(app)/playground": [10,[2]],
		"/(app)/prompts": [11,[2]],
		"/(app)/prompts/create": [12,[2]],
		"/(app)/prompts/edit": [13,[2]],
		"/s/[id]": [16]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';