module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo','@babel/preset-react','module:metro-react-native-babel-preset',],
    plugins: ['nativewind/babel','react-native-reanimated/plugin'],
    
  };
};
