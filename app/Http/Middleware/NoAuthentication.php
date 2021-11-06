<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class NoAuthentication
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->expectsJson()) {
            return response()->json([
                'statusCode' => 403,
                'message' => 'You are not authorized to access the resource',
            ], 403);
        }

        return $next($request);
    }
}
