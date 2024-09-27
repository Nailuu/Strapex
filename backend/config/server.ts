export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 8080),
  url: 'https://manon-cooking-garden.ovh/strapi',
  app: {
    keys: env.array('APP_KEYS'),
  },
});
