/* eslint-disable no-undef */

const webpack = require('webpack');
const workingRoot = require('../../helpers/workingRoot');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

function getConfig() {
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.js', '.ts']
    },
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            {
              loader: 'file-loader',
              options: {
                context: '/src',
                name: '[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.ts$/,
          loaders: [
            {
              loader: 'ts-loader',
              options: {
                configFile: workingRoot.getDir('tsconfig.json'),
                transpileOnly: true
              }
            },
            'angular2-template-loader'
          ]
        },
        {
          test: /\.html$/,
          loaders: [
            'html-loader'
          ]
        },
        // Ignore warnings about System.import in Angular
        { test: /[\/\\]@angular[\/\\].+\.js$/, parser: { system: true } }
      ]
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: workingRoot.getDir('tsconfig.json'),
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
        },
      }),
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(@angular|esm5)/,
        workingRoot.getDir('src')
      ),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ]
  };
}

module.exports = getConfig;
