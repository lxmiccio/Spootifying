<?php

namespace App\Api\V1\Controllers;

use App\Http\Controllers\Controller;
use Dingo\Api\Routing\Helpers;

class ApiController extends Controller
{
  use Helpers;

  public function lastfm()
  {
    return env('LAST_FM_API');
  }

  public function spotify()
  {
    return [
      'client_id' => env('SPOTIFY_CLIENT_ID'),
      'secret' => env('SPOTIFY_SECRET')
    ];
  }
}
