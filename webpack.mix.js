const mix         = require( 'laravel-mix' );
const webpack     = require( 'webpack' );
const del         = require( 'del' );
const tailwindcss = require( 'tailwindcss' );
require( 'dotenv' ).config();

require( 'laravel-mix-bundle-analyzer' );
if( !mix.inProduction() && process.env.WEBPACK_BUNDLE_ANALYZER === 'true' ) {
    mix.bundleAnalyzer();
}

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.extend( 'i18n', new class {
    webpackRules() {
        return [
            {
                resourceQuery: /blockType=i18n/,
                type:          'javascript/auto',
                loader:        '@kazupon/vue-i18n-loader',
            },
        ];
    }
}() );

mix.webpackConfig( {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.vue', '.ts', '.tsx'],
    },
    module:  {
        rules: [
            {
                test:    /\.tsx?$/,
                loader:  'ts-loader',
                options: {appendTsSuffixTo: [/\.vue$/]},
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        // Inject the website version from packages.json, into the build.
        new webpack.DefinePlugin( {
            'process.env.WEBSITE_VERSION': JSON.stringify( process.env.npm_package_version ),
        } ),
    ],
} );

// Remove the old async-validator from the element-ui node_modules folder
console.log( 'Removing element-ui directory...' );
del.sync( ['node_modules/element-ui/node_modules/**'] );
console.log( 'Done!' );


if( !mix.inProduction() ) {
    console.log( '------------------------------------' );
    console.log( 'Running DEV mode, not applying Babel' );
    console.log( '------------------------------------' );
    mix.i18n()
       .js( 'resources/js/app.js', 'public/js' );

}
else {
    mix.i18n()
       .js( 'resources/js/app.js', 'public/js' )
       .babel( ['public/js/app.js'], 'public/js/app.js' )
       .babel( ['public/js/vendor.js'], 'public/js/vendor.js' );
}

mix.sass( 'resources/css/app.scss', 'public/css' )
   .options( {
       processCssUrls: false,
       postCss:        [tailwindcss( 'tailwind.config.js' )],
   } )
   .extract()
   .version();

if( !mix.inProduction() && process.env.WEBPACK_BROWSERSYNC === 'true' ) {
    mix.browserSync(
        {proxy: 'localhost:8000'},
        //     {
        //     base: './public',
        //     proxy: process.env.APP_URL,
        //     port: 8000,
        // }
    );
}
