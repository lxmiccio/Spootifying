<?php

namespace App\Api\V1\Controllers;

use App\Http\Controllers\Controller;
use Dingo\Api\Routing\Helpers;

class ApiController extends Controller
{
  use Helpers;

  public function key()
  {
    return env('SPOTIFY_API');
  }
}
