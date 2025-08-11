# News Aggregator Laravel + Next.js + Docker Setup

This repository contains a Dockerized setup for running the News Aggregator Laravel backend, a Next.js frontend, and a MySQL database, along with phpMyAdmin for database management.

## Prerequisites

- Docker
- Docker Compose

## Setup

1. Clone this repository:
```bash
git clone https://github.com/yourusername/yourproject.git
cd yourproject
```

2. Create a `.env` file in the project root with the required variables:
```env
LARAVEL_PORT=8000
NEXTJS_PORT=3000
MYSQL_DATABASE=laravel
MYSQL_ROOT_PASSWORD=rootsecret
```

3. Build and start the containers:
```bash
docker compose up --build -d
```

4. **First Installation**: Run Laravel migrations inside the container:
```bash
docker compose exec laravel php artisan migrate
docker compose exec laravel php artisan news:scrape
```

## Accessing the Services

- **Laravel API**: http://localhost:${LARAVEL_PORT}
- **Next.js frontend**: http://localhost:${NEXTJS_PORT}
- **phpMyAdmin**: http://localhost:8080  
  - Username: `${MYSQL_USER}`  
  - Password: `${MYSQL_PASSWORD}`

## Notes

- Laravel’s scheduler is set up to run via cron in the container.
- `.env` changes in Laravel trigger a reload automatically. For Next.js hot reload on `.env` changes, restart the Next.js container:
```bash
docker compose restart nextjs
```

## Stopping the Environment
```bash
docker compose down
```

