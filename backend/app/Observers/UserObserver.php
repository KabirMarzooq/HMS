<?php
// app/Observers/UserObserver.php


namespace App\Observers;

use App\Models\User;
use App\Models\SystemLog;

class UserObserver
{
    public function created(User $user): void
    {
        SystemLog::log(
            'user.created',
            'New user registered: ' . $user->name . ' (' . $user->role . ')',
            $user
        );
    }

    public function updated(User $user): void
    {
        // Specifically calling out role changes since they're sensitive
        if ($user->wasChanged('role')) {
            SystemLog::log(
                'user.role_changed',
                auth('api')->user()?->name . ' changed ' . $user->name . "'s role to " . $user->role,
                $user
            );
        } else {
            SystemLog::log(
                'user.updated',
                auth('api')->user()?->name . ' updated profile for ' . $user->name,
                $user
            );
        }
    }

    public function deleted(User $user): void
    {
        SystemLog::log(
            'user.deleted',
            auth('api')->user()?->name . ' deleted user account: ' . $user->name,
            $user
        );
    }
}
