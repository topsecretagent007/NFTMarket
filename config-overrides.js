const webpack = require("webpack");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    assert: require.resolve("assert"),
    crypto: require.resolve("crypto-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    stream: require.resolve("stream-browserify"),
    url: require.resolve("url"),
    ws: require.resolve("xrpl/dist/npm/client/WSWrapper"),
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  // This is deprecated in webpack 5 but alias false does not seem to work
  config.module.rules.push({
    test: /node_modules[\\\/]https-proxy-agent[\\\/]/,
    use: "null-loader",
  });
  return config;
};