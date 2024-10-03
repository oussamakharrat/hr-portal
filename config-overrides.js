// config-overrides.js

module.exports = function override(config, env) {
    config.resolve.fallback = {
        crypto: require.resolve('crypto-browserify'),
        // You can add more polyfills if needed
    };
    return config;
};
