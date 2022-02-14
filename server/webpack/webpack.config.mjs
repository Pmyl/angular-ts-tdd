/* eslint-disable no-undef */

import webpack from 'webpack';
import * as shellParams from '../../helpers/shellParams.mjs';
import { getDir as getWorkingRootDir } from '../../helpers/workingRoot.mjs';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import AngularLinkerPlugin from '@angular/compiler-cli/linker/babel';

export default function getConfig() {
  const tsConfigPath = shellParams.get().tsconfig || getWorkingRootDir('tsconfig.json');

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
          use: [
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
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: tsConfigPath,
                transpileOnly: true
              }
            },
            'angular2-template-loader'
          ]
        },
        {
          test: /\.m?js$/,
          exclude: /angular-ts-tdd[\/\\]bundle\.js/,
          resolve: {
            fullySpecified: false
          },
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [AngularLinkerPlugin],
              compact: false,
              cacheDirectory: true,
            }
          }
        },
        {
          test: /\.html$/,
          use: [
            'html-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'to-string-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        // Ignore warnings about System.import in Angular
        { test: /(.+)?angular([\\/]).+\.js$/, parser: { system: true } }
      ]
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: tsConfigPath,
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
        },
      }),
      new webpack.ContextReplacementPlugin(
        /(.+)?angular([\\/])core(.+)?/,
        getWorkingRootDir('src')
      ),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ]
  };
}
