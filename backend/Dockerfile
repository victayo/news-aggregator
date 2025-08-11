FROM php:8.3-fpm

# Install system dependencies including cron
RUN apt-get update && apt-get install -y \
    git unzip libpq-dev libzip-dev zip curl cron \
    && docker-php-ext-install pdo_mysql zip

# Install Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy Laravel code
COPY . .

# Install dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Add Laravel scheduler to crontab with logging
RUN mkdir -p /var/www/html/storage/logs \
    && echo "* * * * * cd /var/www/html && /usr/local/bin/php artisan schedule:run >> storage/logs/scheduler.log 2>&1" > /etc/cron.d/laravel-scheduler \
    && chmod 0644 /etc/cron.d/laravel-scheduler \
    && crontab /etc/cron.d/laravel-scheduler

CMD service cron start && php artisan serve --host=0.0.0.0 --port=80
