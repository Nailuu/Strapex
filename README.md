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