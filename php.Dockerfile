FROM php:8.4-fpm-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends libxml2-dev libzip-dev unzip git \
    && docker-php-ext-install -j$(nproc) ctype iconv xml zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN curl -sS https://get.symfony.com/cli/installer | bash \
    && mv /root/.symfony5/bin/symfony /usr/local/bin/symfony
