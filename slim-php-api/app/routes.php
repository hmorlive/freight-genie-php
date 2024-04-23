<?php

declare(strict_types=1);

use App\Application\Actions\User\ListUsersAction;
use App\Application\Actions\User\ViewUserAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;
use Respect\Validation\Validator as v;

return function (App $app) {
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });

    $app->post('/quote', function (Request $request, Response $response) {
        // get body data
        $data = $request->getParsedBody();
        // Validators
        $validators = [
            'email' => v::email(),
            'from' => v::stringType()->length(1, null),
            'to' => v::stringType()->length(1, null),
            'date' => v::date('Y-m-d'),
            'freight_type' => v::in(['air', 'sea', 'land']),
            'goods_type' => v::in(['perishable', 'non-perishable', 'hazardous']),
            'quote' => v::stringType()->length(1, null),
        ];

        // Perform validation
        foreach ($validators as $field => $validator) {
            if (isset ($data[$field]) && !$validator->validate($data[$field])) {
                $errors[$field] = "Invalid value for {$field}.";
            } elseif (!isset ($data[$field])) {
                $errors[$field] = "{$field} is required.";
            }
        }

        echo $data;

        # if errors, return status: bad request
        if (count($errors) > 0) {
            return $response->withStatus(400);
        }

        // return success
        return $response->withStatus(201);
    });
};
