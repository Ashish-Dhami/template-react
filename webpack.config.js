import path from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { EsbuildPlugin } from 'esbuild-loader'

export default function webpack(_, argv) {
  const isDevelopment = argv.mode !== 'production'
  return {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/main.jsx',
    output: {
      path: path.resolve(import.meta.dirname, 'dist'),
      filename: isDevelopment ? 'bundle.js' : 'bundle.[contenthash].js',
      publicPath: '/',
      clean: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, 'src'),
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
      mainFiles: ['index'],
    },
    plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    devServer: {
      static: path.resolve(import.meta.dirname, 'public'),
      historyApiFallback: true,
      hot: true,
      open: true,
      port: 3000,
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          loader: 'esbuild-loader',
          options: {
            loader: 'jsx',
            target: 'es2015',
            jsx: 'automatic',
          },
        },
        {
          test: /\.module\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isDevelopment ? '[name]__[local]' : '[hash:base64]',
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    optimization: {
      minimizer: [
        new EsbuildPlugin({
          target: 'es2015',
          css: true,
        }),
      ],
    },
  }
}
