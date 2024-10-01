export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 8080),
  url: 'https://' + env('DOMAIN', '127.0.0.1'),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
