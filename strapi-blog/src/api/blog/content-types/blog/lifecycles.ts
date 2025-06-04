import slugify from 'slugify';

export default {
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.Title && !data.slugs) {
      data.slugs = slugify(data.Title, {
        lower: true,
        strict: true,
      });
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    if (data.Title && !data.slugs) {
      data.slugs = slugify(data.Title, {
        lower: true,
        strict: true,
      });
    }
  },
};
