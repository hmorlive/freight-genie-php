<?php

declare(strict_types=1);

use App\Application\Actions\User\ListUsersAction;
use App\Application\Actions\User\ViewUserAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;
use Respect\Validation\Validator as v;
use db\db;

return function (App $app) {
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });

    // get quotes from email
    $app->post('/quotes/all', function (Request $request, Response $response) {
        // get email from request
        $data = $request->getParsedBody();
        $email = $data['email'] ?? null;
    
        // validate email
        $email_validator = v::email();
        if (!$email || !$email_validator->validate($email)) {
            return $response->withStatus(400);
        }
    
        // fetch quotes from db
        $statement = $db->prepare('SELECT * FROM quotes WHERE email = :email');

        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    });    

    $app->post('/quote/request', function (Request $request, Response $response) {
        // get body data
        $data = $request->getParsedBody();
        // Validators
        $validators = [
            'email' => v::email(),
            'from' => v::stringType()->length(1, null),
            'to' => v::stringType()->length(1, null),
            'shippingDate' => v::date('Y-m-d'),
            'freightType' => v::in(['ftl', 'ltl', 'partial', 'intermodal']),
            'goodsType' => v::in(['general', 'perishable', 'hazardous', 'fragile', 'oversized']),
        ];

        $errors = [];

        foreach ($validators as $field => $validator) {
            if (isset ($data[$field]) && !$validator->validate($data[$field])) {
                $errors[$field] = "Invalid value for {$field}.";
            } elseif (!isset ($data[$field])) {
                $errors[$field] = "{$field} is required.";
            }
        }

        # if errors, return status: bad request
        if (count($errors) > 0) {
            $response->getBody()->write(json_encode($errors));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        // return success
        return $response->withStatus(201);
    });
};
