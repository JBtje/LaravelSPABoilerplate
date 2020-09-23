<?php

namespace App\Http\Controllers\SPA;

use App\Exceptions\UserException_InvalidUsernamePasswordCombination;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware( 'throttle:6,1', [
            'only' => [
                'login',
                'register',
                'logout',
            ],
        ] );
    }

    /**
     * Login the user
     *
     * @param LoginRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws UserException_InvalidUsernamePasswordCombination
     */
    public function login( LoginRequest $request )
    {
        // Login using the web guard. Passport will still create an access token.
        if( !auth( 'web' )->attempt( $request->validated() ) ) {
            throw new UserException_InvalidUsernamePasswordCombination();
        }

        // Obtain the user (still web guard)
        $user = auth( 'web' )->user();

        // Check if the email address was validated. If not, resend the validation email.
        if( !$user->hasVerifiedEmail() ) {
            // Send the user an email to validate the email address.
            $user->sendEmailVerificationNotification();

            return response()->json( [
                'success' => 'false',
                'message' => __( 'message.require email validation' ),
            ] );
        }

        // Login was successful, return the access token & user data.
        return response()->json( [
            'success'      => true,
            'access_token' => $user->createToken( 'authToken' )->accessToken,
            'user'         => new UserResource( $user ),
        ] );
    }

    /**
     * Register a new user
     *
     * @param RegisterRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register( RegisterRequest $request )
    {
        $user = User::create( [
            'username' => $request->username,
            'email'    => $request->email,
            'password' => bcrypt( $request->password ),
        ] );

        // Send the user an email to validate the email address.
        event( new Registered( $user ) );

        return response()->json( [
            'success' => true,
            'message' => __( 'message.successfully registered' ),
        ] );
    }

    /**
     * Validate the email address
     *
     * @param Request $request
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function verify( Request $request )
    {
        $user = User::find( $request->route( 'id' ) );

        if( $user->hasVerifiedEmail() ) {
            return redirect( '/' );
        }

        if( $user->markEmailAsVerified() ) {
            event( new Verified( $request->user() ) );
        }

        return redirect( '/' );
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function user()
    {
        return response()->json( [
            'success' => true,
            'user'    => new UserResource( auth()->user() ),
        ] );
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        optional( optional( auth()->user() )->token() )->revoke();

        return response()->json( [
            'success' => true,
            'message' => __( 'message.successfully logged out' ),
        ] );
    }
}
