<?php

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {

	$api->get('keys/lastfm', 'App\Api\V1\Controllers\ApiController@lastfm');
	$api->get('keys/spotify', 'App\Api\V1\Controllers\ApiController@spotify');

});
