# Strapex
Cooking blog using NextJS 14 + Strapi as headless CMS

# Initial setup

Run `sudo docker compose up`

When the strapi service is up and running, follow theses steps:

- Create the admin account
- Populate fields in 'infos' with Title and Tagline (optional)
- Add permissions to the role 'Public':
    - General-information -> find
- Add permissions to the role 'Authenticated':
    - General-information -> find
    - Users-permissions:
        - user -> me
        - role -> find
- Create new role 'Owner' and add permissions:
    - General-information -> find
    - Article -> find and findOne
    - Users-permissions:
        - user -> me
        - role -> find
- Create new role 'Authorized' and add permissions:
    - General-information -> find
    - Article -> find and findOne
    - Users-permissions:
        - user -> me
        - role -> find

add HOST in .env in frontend/

Example .env in backend/

```
# Server
HOST=0.0.0.0
PORT=8080

NODE_ENV=production

# Secrets
APP_KEYS=XXXXX
API_TOKEN_SALT=XXXXX
ADMIN_JWT_SECRET=XXXXX
TRANSFER_TOKEN_SALT=XXXXX

STRAPI_TELEMETRY_DISABLED=true

# Database
DATABASE_HOST=mysql
DATABASE_PORT=3306
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=superprotected
DATABASE_CLIENT=mysql

MYSQL_USER=strapi
MYSQL_ROOT_PASSWORD=superprotected
MYSQL_PASSWORD=superprotected
MYSQL_DATABASE=strapi
MYSQL_ROOT_HOST=127.0.0.1
```

GitHub Actions CI/CD
`https://www.youtube.com/watch?v=fkzpywlJcMA`