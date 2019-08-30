export const urlFinder = (emotions, baseUrl) => {
	const filtered = emotions.filter(emotion => emotion.url.includes(baseUrl));
	console.log(filtered);
	return filtered;
};
