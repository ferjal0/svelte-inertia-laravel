<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class SessionController extends Controller
{
    /**
     * Destroy all sessions except the current one.
     */
    public function destroyOtherSessions(Request $request): RedirectResponse
    {
        if (config('session.driver') !== 'database') {
            return back(409);
        }

        $request->validate([
            'password' => ['required', 'string', 'current_password'],
        ]);

        DB::table('sessions')
            ->where('user_id', Auth::id())
            ->where('id', '!=', request()->session()->getId())
            ->delete();

        return back(303)->with('status', 'other-browser-sessions-terminated');
    }

    /**
     * Destroy a specific session.
     */
    public function destroySession(Request $request, string $id): RedirectResponse
    {
        if (config('session.driver') !== 'database') {
            return back(409);
        }

        $request->validate([
            'password' => ['required', 'string', 'current_password'],
        ]);

        // Don't allow destroying the current session
        if ($id === $request->session()->getId()) {
            throw ValidationException::withMessages([
                'session' => ['Cannot terminate current session'],
            ]);
        }

        // Verify the session belongs to the current user
        $session = DB::table('sessions')
            ->where('user_id', Auth::id())
            ->where('id', $id)
            ->first();

        if (! $session) {
            throw ValidationException::withMessages([
                'session' => ['Session not found or does not belong to you'],
            ]);
        }

        DB::table('sessions')
            ->where('user_id', Auth::id())
            ->where('id', $id)
            ->delete();

        return back(303)->with('status', 'browser-session-terminated');
    }
}
