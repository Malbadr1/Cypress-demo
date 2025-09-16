const webpack = require("@cypress/webpack-preprocessor");

module.exports = (on) => {
  const options = {
    webpackOptions: {
      resolve: {
        extensions: [".ts", ".js"],
        alias: {
          "@pages": require("path").resolve(__dirname, "../pages"),
        },
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: [/node_modules/],
            use: [
              {
                loader: "ts-loader",
              },
            ],
          },
        ],
      },
    },
  };
  on("file:preprocessor", webpack(options));
};
