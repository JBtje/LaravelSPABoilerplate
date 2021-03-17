<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AddRolesAndPermissions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Reset cached roles and permissions
        app()['cache']->forget( 'spatie.permission.cache' );

        // ------------------
        // Self
        // ------------------
        // Own account edit
        Permission::create( ['guard_name' => 'web', 'name' => 'View Self'] );
        Permission::create( ['guard_name' => 'web', 'name' => 'Edit Self'] );
        Permission::create( ['guard_name' => 'web', 'name' => 'Delete Self'] );

        // ------------------
        // Users
        // ------------------
        Permission::create( ['guard_name' => 'web', 'name' => 'Add Users'] );
        Permission::create( ['guard_name' => 'web', 'name' => 'View Users'] );
        Permission::create( ['guard_name' => 'web', 'name' => 'Edit Users'] );
        //Permission::create( ['guard_name' => 'web', 'name' => 'Softdelete Users'] );
        //Permission::create( ['guard_name' => 'web', 'name' => 'Restore Users'] );
        Permission::create( ['guard_name' => 'web', 'name' => 'Delete Users'] );

        // ------------------
        // User Roles
        // ------------------
        $role = Role::create( ['name' => 'User'] );
        $role->syncPermissions( [
            'View Self',
            'Edit Self',
        ] );

        $role = Role::create( ['name' => 'Admin'] );
        $role->syncPermissions( [
            'View Self',
            'Edit Self',

            'Add Users',
            'View Users',
            'Edit Users',
            'Delete Users',
        ] );
    }
}
