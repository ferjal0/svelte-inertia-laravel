<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed roles and permissions first
        $this->call(RolesAndPermissionsSeeder::class);

        // Create 85 regular users: 60 verified, 25 unverified
        User::factory()
            ->count(60)
            ->create()
            ->each(function (User $user) {
                $user->assignRole('regular');
            });

        User::factory()
            ->count(25)
            ->unverified()
            ->create()
            ->each(function (User $user) {
                $user->assignRole('regular');
            });

        // Create 15 admins total: keep one named admin, add 11 verified + 3 unverified
        $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => bcrypt('password'), // password
            'remember_token' => Str::random(10),
        ]);
        $admin->assignRole('admin');

        User::factory()
            ->count(11)
            ->create()
            ->each(function (User $user) {
                $user->assignRole('admin');
            });

        User::factory()
            ->count(3)
            ->unverified()
            ->create()
            ->each(function (User $user) {
                $user->assignRole('admin');
            });
    }
}
