export default ({ env }) => ({
  'webp-converter': {
    enabled: true,
    config: {
      mimeTypes: ['image/png', 'image/jpeg', 'image/jpg'],
      options: {
        quality: 80,
        lossless: false,
      },
    },
  },
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),  // <-- make sure JWT_SECRET is set in your env variables
    },
  },
});