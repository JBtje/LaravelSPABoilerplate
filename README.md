# Laravel SPA Boilerplate

This boilerplate is based on **Laravel 8** and **Vue 2**. It makes use of multiple useful packages, like Vuex, Vue-router and a lot more (see [Packages](#Packages) for a full list).

This boilerplate is a SPA (Single Page Application) which works out of the box. It comes with a working login, a register page with email validation and dashboard. This means you don't have to spend any time on setting that up, just focus on what's important.

This boilerplate comes with many useful extra's, to automatically handle server messages or to help you with debugging. These features are described below. Don't like them? Just press delete a few times and implement your own methods. 


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

[Download](https://github.com/JBtje/LaravelSPABoilerplate/archive/master.zip) the project and open it in your terminal and code editor!
Or use git clone:
```
git clone git@github.com:JBtje/LaravelSPABoilerplate.git
```



1 - Install the packages via [composer](https://getcomposer.org/):
```
composer install
```

2 - Install the packages via [npm](https://www.npmjs.com/):
```
npm install 
```

3 - Copy the `.env` file
```
cp .env.example .env
```

4 - Generate application key
```
php artisan key:generate
```

5 - Setup your `.env` file with correct database settings

6 - Run the migrations
```
php artisan migrate
```

7 - Run the migrations
```
php artisan passport:install
```

optional - Run the seeder to create the default admin user
```
php artisan db:seed

[press enter]

Username: Admin
Password: password
```

## Start coding

Serve the website
```
php artisan serve
```

While developing run:
```
npm run watch
```


## Deployment

Before deploying your project run the following command
```
npm run production
```

## Extra's

#### Setting guard for a route
[AppServiceProvider](https://github.com/JBtje/LaravelSPABoilerplate/blob/master/app/Providers/AppServiceProvider.php) contains extra logic, that allows you to set a guard for a specific route.
i.e. all SPA routes require the `spa` guard (using laravel passport). To achieve this, all we have to do is:
```
Route::group( [
    'guard' => 'spa',
], function() {
    ...
});
``` 
All routes in this group will use the `spa` guard by default.

#### Get the raw SQL query
You can add `->toRawSql()` to a query, to obtain the raw query. The difference with `->toSQL()` is that all values are filled in as well!
```
User::where('name', '=', 'Admin')->toSql()
> select * from `users` where `name` = ?
```
```
User::where('name', '=', 'Admin')->toRawSql()
> select * from `users` where `name` = 'Admin'
```
This code can also be found in [AppServiceProvider](https://github.com/JBtje/LaravelSPABoilerplate/blob/master/app/Providers/AppServiceProvider.php).

#### Vue-router
The routes are defined in the [router](https://github.com/JBtje/LaravelSPABoilerplate/blob/master/resources/js/router) folder. This folder contains the [DefaultRouter] (https://github.com/JBtje/LaravelSPABoilerplate/blob/master/resources/js/router/DefaultRouter.php), for non-logged in users as well as the [UserRouter] (https://github.com/JBtje/LaravelSPABoilerplate/blob/master/resources/js/router/UserRouter.php), for logged in users. You can easily extend this with more routes based upon the user's permissions.

#### Handling error responses
This project comes with two JavaScript functions to handle axios call responses. The methods can be found in [formMixin.js](https://github.com/JBtje/LaravelSPABoilerplate/blob/master/resources/js/mixins/formMixin.js) 
`handleResponse` and `handleErrorResponse` respectively handle the normal server responses and errors. This project assumes the server always sends a `200` status code. If an error occurred, the server should send back `"success" => false` with an optional message `"message" => __( 'error.some error' )`. `handleResponse` will show the message in a message box, red for errors, green for success.
```
axios.get( 'spa/some/url').then( response => {
    if( !this.handleResponse( response ) ) {
        return;
    }

    // Response is valid, do something with it
    ...
} )
 .catch( ( error ) => {
     this.handleErrorResponse( error );
 } );
```

#### Async-validator
This project comes with Async-validator 3.4.0, even while Element-ui is limited to the `~1.8.1`. This is achieved by including a pre-build version of Async-validator 3.4.0 and package it with version number `1.8.7`. One of the advantages is that you can make use of arrow function, e.g. for translations!

```
Rules: [
    {
        min:     4,
        max:     64,
        message: () => this.$t( 'validate.string.range', [4, 64] ),
        trigger: 'change',
    },
    ...
],
```

#### pr / pre / ddc
These functions can be found in [devHelper](https://github.com/JBtje/LaravelSPABoilerplate/tree/master/app/Http/Helpers/devHelper.php). Note that dump-server is included in the project, though in some cases you might need these.
##### pr
Short for `print_r( ... )`

##### pre
Short for `echo '<pre>'; print_r( ... ); echo '</pre>';`

##### ddc
Same as `dd` but with headers properly set, so that the value can be seen even if `cors` apply. Useful for debugging external programs.

## Built With

  - [Laravel 8](https://laravel.com/)
  - [Laravel-Mix](https://laravel.com/docs/master/mix)
  - [SASS](https://sass-lang.com/)
  - [TypeScript](https://www.typescriptlang.org/) 
  - [VueJS](https://vuejs.org/)
  - [Vue i18n](https://kazupon.github.io/vue-i18n/)
  - [Vue Router](https://router.vuejs.org/)
  - [Vuex](https://vuex.vuejs.org/guide/)

## Packages

### PHP

  - [Dump Server](https://github.com/beyondcode/laravel-dump-server)
  - [Laravel Permission](https://github.com/spatie/laravel-permission)
  - [Passport](https://laravel.com/docs/8.x/passport)

### JS
  - [Async-validator 3.4.0](https://github.com/yiminghe/async-validator)
  - [Axios](https://github.com/axios/axios)
  - [Browser Sync](https://github.com/BrowserSync/browser-sync)
  - [Bundle Analyzer](https://github.com/MaximVanhove/laravel-mix-bundle-analyzer)
  - [Day.js](https://github.com/iamkun/dayjs)
  - [Fontawesome free](https://github.com/FortAwesome/Font-Awesome)
  - [Lodash](https://github.com/lodash/lodash)
  - [PurgeCss](https://github.com/spatie/laravel-mix-purgecss)
  - [TailwindCSS](https://tailwindcss.com)

## Credits

* **[Pascal Hesselink](https://pascalhesselink.nl)** - *created the [base for this boilerplate](https://github.com/PascalHesselink/LaravelSPABoilerplate)*


## License

This project is licensed under the MIT License

