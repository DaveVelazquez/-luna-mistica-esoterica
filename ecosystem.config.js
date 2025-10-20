module.exports = {
  apps: [
    {
      name: 'luna-mistica',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
