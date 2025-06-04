export default () => ({
  'webp-converter': {
    enabled: true,
    config: {
      mimeTypes: ['image/png', 'image/jpeg', 'image/jpg'], // you can customize this
      options: {
        quality: 80,       // optional: output quality for WebP
        lossless: false,   // optional: set true for PNG-like output
      },
    },
  },
});

