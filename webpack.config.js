const path  = require("path");
const fs    = require('fs');
const glob  = require("glob");
const context = path.resolve(__dirname, "build");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const yarnPackage = require("./package.json");

$entries = {'index':'./src/index.js'};

/**
    Webpack Export
**/
module.exports = {
    mode: 'production',
    devtool:'source-map',
    target: "electron-renderer",
    entry: $entries,
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "js/[name].js"
    },
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        port: 9000,
        hot: false,
        open: false,
        inline: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        stats: "minimal"
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader',
                ],
            },
            {
                test: /\.(ttf|eot|svg|otf|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                          name: '[name].[ext]',
                          outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                     plugins: [
                        'transform-react-jsx',
                        'transform-class-properties',
                        ['react-css-modules', 
                            {
                                generateScopedName: 'style-[name]-[local]',
                                context:context,
                                filetypes: {
                                    '.less': {syntax: 'postcss-less'}
                                }
                            }
                        ],
                     ]
                }
            },
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            verbose:false,
            filename: 'css/[name].css'
        }),
        new CopyWebpackPlugin([
            {from: '**/*', to: './', context:'./src/public/electron'},
            {from: '**/*', to: './', context:'./src/public/shared'}
        ], {}),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(yarnPackage.version)
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: "all"
                }
            }
        }
    }
};
