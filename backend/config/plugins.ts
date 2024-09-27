export default () => ({
    'users-permissions': {
        config: {
            jwtSecret: process.env.ADMIN_JWT_SECRET,
        },
    },
});
