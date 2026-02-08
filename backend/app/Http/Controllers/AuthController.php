<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Register a new user
     */
    public function register(Request $request)
    {
        // 1. Validate the incoming JSON payload
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'phone' => 'required|string|min:10',
            'role' => 'required|in:patient,doctor,receptionist,admin',

            // Conditional Validation can be handled here or simply allowed as nullable strings
            'profile.specialization' => 'nullable|string',
            'profile.licenseId' => 'nullable|string',
            'profile.staffId' => 'nullable|string',
            'adminKey' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // 2. Security Check: Verify Admin Key
        if ($request->role === 'admin') {
            if ($request->adminKey !== env('ADMIN_SECRET')) {
                return response()->json(['error' => 'Invalid Admin Key. Access Denied.'], 403);
            }
        }

        // 3. Create the User
        // Note: We extract 'profile' data from the nested React payload
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'role' => $request->role,

            // Mapping React "profile" fields to Database columns
            'specialization' => $request->input('profile.specialization'),
            'license_id' => $request->input('profile.licenseId'),
            'staff_id' => $request->input('profile.staffId'),
        ]);

        // 4. Generate JWT Token
        $token = auth('api')->login($user);

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    /**
     * Login user and return the token
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (!$token = auth('api')->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
    }

    /**
     * Helper to format the token response
     */
    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => auth('api')->user()
        ]);
    }
}
