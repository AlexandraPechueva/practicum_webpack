const path = require('path'); // подключаем path к конфигу вебпак
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключили к проекту плагин для css 
const HtmlWebpackPlugin = require('html-webpack-plugin'); // плагин для html
const WebpackMd5Hash = require('webpack-md5-hash'); // плагин для хеширования

// module.exports — это синтаксис экспорта в Node.js
module.exports = {
	entry: { main: './src/index.js' },  // указали первое место куда заглянет webpack — файл index.js в папке src
	// указали в какой файл будет собирться весь js и дали ему имя
	output: {
        	path: path.resolve(__dirname, 'dist'),
        	filename: '[name].[chunkhash].js'
    	},
module: {
    rules: [
		{ // тут описываются правила
			test: /\.js$/, // регулярное выражение, которое ищет все js файлы
			use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
			exclude: /node_modules/ // исключает папку node_modules
		},
			
		{
			test: /\.css$/, // применять это правило только к CSS-файлам
			use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] // минификация и postcss
		}
		]
    },
plugins: [
		//css
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),
		new HtmlWebpackPlugin({
		// Означает, что:
		inject: false, // стили НЕ нужно прописывать внутри тегов
		template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
		filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
		})
    ]
};
