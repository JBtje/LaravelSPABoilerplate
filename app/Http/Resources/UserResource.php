<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function toArray( $request )
    {
        return [
            'id'          => $this->id,
            'username'    => $this->username,

            // Roles assigned to the user
            'roles'       => [
                'User'  => $this->hasRole( 'User' ),
                'Admin' => $this->hasRole( 'Admin' ),
            ],

            // Permissions (under roles) assigned to the user
            'permissions' => [
                'View Self' => $this->hasPermissionTo( 'View Self' ),
                'Edit Self' => $this->hasPermissionTo( 'Edit Self' ),

                'Add Users'    => $this->hasPermissionTo( 'Add Users' ),
                'View Users'   => $this->hasPermissionTo( 'View Users' ),
                'Edit Users'   => $this->hasPermissionTo( 'Edit Users' ),
                'Delete Users' => $this->hasPermissionTo( 'Delete Users' ),
            ],
        ];
    }
}
