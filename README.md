# Installation
## Requirements
- Node.js
- npm/pnpm/yarn/...
## Install
```bash
npm install
```

<!-- config .env -->
## Config
```bash
cp .env.example .env
```
<!-- config .env -->
change `DB_NAME` to your database name<br>
change `DB_USER` to your database username <br>
change `DB_PASS` to your database password <br>
change `DB_HOST` to your database host <br>
change `DB_PORT` to your database port  <br>
change `JWT_SECRET_KEY` to your jwt secret key <br>
change `JWT_REFRESH_TOKEN` to your jwt refresh token <br>

## Run Migration
```bash
pnpm sequelize-cli db:migrate
```

## Run Seeder
```bash
pnpm sequelize-cli db:seed:all
```

## Run
```bash
pnpm start
```

## Run with nodemon
```bash
pnpm dev
```

# API Documentation
```localhost:PORT/api-docs```


