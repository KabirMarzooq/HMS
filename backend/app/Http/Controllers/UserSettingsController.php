<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Appointment;

class UserSettingsController extends Controller
{
    /**
     * Update user email
     */
    public function updateEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:100|unique:users,email,' . $request->user()->id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = $request->user();
        $user->email = $request->email;
        $user->save();

        return response()->json([
            'message' => 'Email updated successfully',
            'user' => $user
        ], 200);
    }

    /**
     * Update user password
     */
    public function updatePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'currentPassword' => 'required|string|min:6',
            'newPassword' => 'required|string|min:6|different:currentPassword',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = $request->user();

        if (!Hash::check($request->currentPassword, $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect'
            ], 401);
        }

        $user->password = Hash::make($request->newPassword);
        $user->save();

        return response()->json([
            'message' => 'Password updated successfully'
        ], 200);
    }

    /**
     * Delete user account permanently
     */
    public function deleteAccount(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'password' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->has('password')) {
            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    'message' => 'Password is incorrect'
                ], 401);
            }
        }

        try {
            
            Appointment::where('patient_id', $user->id)->delete();

            Appointment::where('doctor_id', $user->id)->delete();

            $user->delete();

            return response()->json([
                'message' => 'Account deleted successfully. We\'re sorry to see you go.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete account. Please contact support.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
