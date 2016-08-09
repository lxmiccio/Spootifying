<?php

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {

	$api->get('key', 'App\Api\V1\Controllers\ApiController@key');

});
