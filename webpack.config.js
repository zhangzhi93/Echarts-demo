var path = require('path');

module.exports = {
	devtool: 'source-map',
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: __dirname + '/dist'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			include: path.resolve(__dirname, 'src'),
			loader: 'babel-loader'
		}]
	}
}