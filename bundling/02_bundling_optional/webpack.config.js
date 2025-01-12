const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const isAnalyze = env.analyze || false;      // Activa el análisis si se pasa --env analyze

    return {
        entry: './src/index.jsx',
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
            }),
            new Dotenv({
                path: isProduction ? './.env.production' : './.env.development', // Carga el archivo .env correcto
            }),
            ...(isAnalyze ? [new BundleAnalyzerPlugin()] : []), // Agrega el analizador solo si se pasa --env analyze
        ],
        devServer: {
            static: path.resolve(__dirname, 'dist'),
            open: true,
            port: 3000,
        },
        mode: isProduction ? 'production' : 'development', // Define el modo según el entorno
    };
};
