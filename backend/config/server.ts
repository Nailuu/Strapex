export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 8080),
  url: 'https://' + process.env.DOMAIN,
  app: {
    keys: env.array('APP_KEYS'),
  },
});
