/** PM2 process list — copy to /opt/mbti-api/ecosystem.config.cjs on the VPS */
module.exports = {
  apps: [
    {
      name: "mbti-api",
      cwd: "/opt/mbti-api",
      script: "dist/index.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
