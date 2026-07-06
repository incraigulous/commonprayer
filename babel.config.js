module.exports = function (api) {
  api.cache(true)
  const isTest = process.env.NODE_ENV === 'test'
  return {
    presets: [
      'babel-preset-expo',
      // nativewind/babel returns a preset-shaped object (plugins array),
      // so it must be listed in presets, not plugins
      ...(isTest ? [] : ['nativewind/babel']),
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
          },
        },
      ],
      // react-native-worklets/plugin is a proper babel plugin (safe in plugins array)
      ...(isTest ? [] : ['react-native-worklets/plugin']),
    ],
  }
}
