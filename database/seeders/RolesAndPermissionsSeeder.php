<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create permissions
        $permissions = [
            [
                'name' => 'View Users',
                'slug' => 'users.view',
                'description' => 'Can view users list',
            ],
            [
                'name' => 'Create Users',
                'slug' => 'users.create',
                'description' => 'Can create new users',
            ],
            [
                'name' => 'Edit Users',
                'slug' => 'users.edit',
                'description' => 'Can edit existing users',
            ],
            [
                'name' => 'Delete Users',
                'slug' => 'users.delete',
                'description' => 'Can delete users',
            ],
            [
                'name' => 'Manage Roles',
                'slug' => 'roles.manage',
                'description' => 'Can manage user roles',
            ],
            [
                'name' => 'Manage Permissions',
                'slug' => 'permissions.manage',
                'description' => 'Can manage permissions',
            ],
        ];

        foreach ($permissions as $permissionData) {
            Permission::firstOrCreate(
                ['slug' => $permissionData['slug']],
                $permissionData
            );
        }

        // Create roles
        $adminRole = Role::firstOrCreate(
            ['slug' => 'admin'],
            [
                'name' => 'Administrator',
                'description' => 'Full system access with all permissions',
            ]
        );

        $regularRole = Role::firstOrCreate(
            ['slug' => 'regular'],
            [
                'name' => 'Regular User',
                'description' => 'Standard user with basic permissions',
            ]
        );

        // Assign all permissions to admin role
        $allPermissions = Permission::all();
        $adminRole->permissions()->sync($allPermissions->pluck('id'));

        // Regular users get no special permissions by default
        // You can customize this as needed
        $regularRole->permissions()->sync([]);
    }
}
