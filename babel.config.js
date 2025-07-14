module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    'react-native-reanimated/plugin',
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-transform-class-properties', { loose: false }],
    ['@babel/plugin-transform-private-methods', { loose: false }],
    ['@babel/plugin-transform-private-property-in-object', { loose: false }],
  ]
};
