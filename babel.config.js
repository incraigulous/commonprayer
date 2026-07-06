module.exports = function (api) {
  api.cache(true)
  const isTest = process.env.NODE_ENV === 'test'
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // nativewind/babel and reanimated/plugin use React Native internals
      // that aren't available in the jest-node environment
      ...(isTest ? [] : ['nativewind/babel']),
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
          },
        },
      ],
      ...(isTest ? [] : ['react-native-worklets/plugin']),
    ],
  }
}
