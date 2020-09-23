<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        if( config( 'app.env' ) === 'production' ) {
            $this->command->error( 'Application is set to production mode, seeding is not possible! Try manually uploading the database or set the application to development.' );

            return;
        }

        if( config( 'config.AskClearSeed' ) ) {
            if( $this->command->confirm( 'Do you want to clear the database first so you can run the initial seeders again?', true ) ) {
                $this->command->callSilent( 'migrate:fresh' );
                $this->command->callSilent( 'passport:install' );
                $this->command->line( 'Data cleared, starting from blank database.' );
                $this->command->info( 'Seeding default values which are preferably the same as production.' );
            }
        }
        else {
            $this->command->callSilent( 'migrate:fresh' );
            $this->command->callSilent( 'passport:install' );
        }

        $this->call( init\DefaultUserSeeder::class );
    }
}
