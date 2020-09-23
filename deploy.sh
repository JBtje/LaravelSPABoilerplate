#!/usr/bin/env bash
git stash
git pull
npm run production
php artisan clear-compiled
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan config:cache
php artisan view:cache
composer dump-autoload
