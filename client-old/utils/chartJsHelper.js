const avgOfEmotionValues = arr => {
	let arrOfAvgs = [];
	let sum = 0;

	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < arr.length - 1; j++) {
			sum += arr[j][i] * 1;
		}
		arrOfAvgs.push((sum / arr.length).toFixed(4));
		sum = 0;
	}
	return arrOfAvgs;
};

export const datafyRadar = arr => {
	let values = [];
	arr.map(n => {
		values.push(Object.values(n).slice(2, 10));
	});

	return {
		labels: [
			'Anger',
			'Contempt',
			'Disgust',
			'Fear',
			'Happiness',
			'Neutral',
			'Sadness',
			'Surprise'
		],
		datasets: [
			{
				label: 'Snapshot:',
				backgroundColor: [
					'#F14D45',
					'#F0C445',
					'#D7D9DD',
					'#F9A755',
					'#FF6384',
					'#4BC0C0',
					'#61A2DA',
					'#916ED6'
				],
				borderColor: 'rgba(	127,255,212,0)',
				pointBackgroundColor: 'rgba(255,99,132,1)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgba(255,99,132,1)',
				data: avgOfEmotionValues(values)
			}
		]
	};
};

export const datafyLine = (arr, emotion, color) => {
	let data = [];
	let dates = [];
	for (let i = 0; i < arr.length; i++) {
		for (let key in arr[i]) {
			if (arr[i].hasOwnProperty(key)) {
				if (key === emotion.toLowerCase()) {
					data.push(arr[i][key]);
				}
				if (key === 'createdAt') {
					dates.push(`${arr[i][key].slice(0, 10)}`);
				}
			}
		}
	}
	return {
		labels: dates,
		datasets: [
			{
				label: emotion,
				fill: false,
				lineTension: 0.1,
				backgroundColor: color,
				borderColor: color,
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(152,251,152,.1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 0.1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(75,192,192,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: data
			}
		]
	};
};

export const datafyBar = arr => {
	let values = [];
	arr.map(n => {
		values.push(Object.values(n).slice(2, 10));
	});

	return {
		labels: [
			'Anger',
			'Contempt',
			'Disgust',
			'Fear',
			'Happiness',
			'Neutral',
			'Sadness',
			'Surprise'
		],
		datasets: [
			{
				label: '',
				backgroundColor: [
					'#F14D45',
					'#F0C445',
					'#D7D9DD',
					'#F9A755',
					'#FF6384',
					'#4BC0C0',
					'#61A2DA',
					'#916ED6'
				],
				borderColor: 'rgba(	127,255,212,0)',
				pointBackgroundColor: 'rgba(255,99,132,0)',
				pointBorderColor: 'rgba(255,99,132,0)',
				pointHoverBackgroundColor: 'rgba(255,99,132,0)',
				pointHoverBorderColor: 'rgba(255,99,132,0)',
				data: peakEmotion(values)
			}
		]
	};
};
const peakEmotion = arr => {
	let arrOfPeaks = [];
	let peak = 0;

	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < arr.length - 1; j++) {
			if (arr[j][i] * 1 > peak) peak = arr[j][i] * 1;
		}
		arrOfPeaks.push(peak.toFixed(4));
		peak = 0;
	}
	return arrOfPeaks;
};
