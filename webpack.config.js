module.exports = {
    // ... autres configurations ...
    module: {
      rules: [
        {
          test: /\.map$/,
          use: 'ignore-loader',
        },
      ],
    },
  };
  