const isDev = process.env.NODE_ENV === 'development';
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: isDev ? 'development' : 'production',
	entry: [
		'@babel/polyfill', // enables async-await
		'./client/app/index.js'
	],
	output: {
		path: __dirname + "/build",
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	}
};





