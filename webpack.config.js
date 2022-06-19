const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshTypeScript = require('react-refresh-typescript')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = (env, argv) => {
  const { HOST, PORT, NODE_ENV } = process.env

  const isDev = NODE_ENV === 'development'

  const cssuse = [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: { auto: true, localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64]' },
        importLoaders: 1,
      },
    },
  ]

  return {
    entry: { index: 'src/index.tsx' },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      assetModuleFilename: 'assets/[name][ext]',
      publicPath: '/',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    mode: NODE_ENV,
    devtool: isDev ? 'eval-source-map' : 'source-map',
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src/'),
        public: path.resolve(__dirname, 'public/'),
      },
      extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|gif|svg|json)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: require.resolve('ts-loader'),
              options: {
                getCustomTransformers: () => ({
                  before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                }),
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            ...cssuse,
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [['postcss-preset-env', { stage: 0 }]],
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: cssuse,
        },
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new HtmlWebpackPlugin({
        title: '',
        inject: false,
        template: 'public/index.html',
      }),
      isDev && new ReactRefreshWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
    ].filter(Boolean),
    devServer: {
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      host: HOST,
      port: PORT,
      hot: true,
    },
  }
}
