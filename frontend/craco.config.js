module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Remove source-map-loader warnings
      webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {
        if (rule.oneOf) {
          rule.oneOf = rule.oneOf.map(oneOfRule => {
            if (oneOfRule.loader && oneOfRule.loader.includes('source-map-loader')) {
              // Skip source map loading for node_modules
              oneOfRule.exclude = /node_modules/;
            }
            return oneOfRule;
          });
        }
        return rule;
      });
      return webpackConfig;
    }
  }
}; 