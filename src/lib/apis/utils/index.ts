import { WEBUI_API_BASE_URL } from '$lib/constants';

export const getGravatarUrl = async (email: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/utils/gravatar?email=${email}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err;
			return null;
		});

	return res;
};

export const downloadChatAsPDF = async (chat: object) => {
	let error = null;

	const blob = await fetch(`${WEBUI_API_BASE_URL}/utils/pdf`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			title: chat.title,
			messages: chat.messages
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.blob();
		})
		.catch((err) => {
			console.log(err);
			error = err;
			return null;
		});

	return blob;
};

export const getHTMLFromMarkdown = async (md: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/utils/markdown`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			md: md
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err;
			return null;
		});

	return res.html;
};

export const downloadDatabase = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/utils/db/download`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.blob();
		})
		.then((blob) => {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'webui.db';
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
		})
		.catch((err) => {
			console.log(err);
			error = err;
			return null;
		});
};
