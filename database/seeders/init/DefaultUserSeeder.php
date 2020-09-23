<?php

namespace Database\Seeders\init;

use App\Models\User;
use Illuminate\Database\Seeder;

class DefaultUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();

        $user = User::factory()
                    ->create( [
                        'username' => 'Admin',
                        'email'    => 'Admin@domain.com',
                    ] );

        $user->assignRole( [
            'User',
            'Admin',
        ] );

        // Notify user about the account creation.
        $this->command->info( ' ' );
        $this->command->alert( 'Created user: Admin / password' );
    }
}
