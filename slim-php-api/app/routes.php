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

    // get quotes from email
    $app->get('/{email}', function (Request $request, Response $response, $args) {
        // Retrieve email from the route parameter
        $email = $args['email'];
    
        // Create an email validator
        $email_validator = v::email();
    
        // Validate the email
        if (!$email_validator->validate($email)) {
            $error = json_encode(['error' => 'Invalid email']);
            $response->getBody()->write($error);
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    
        // Assuming successful validation continues here
        $success = json_encode(['message' => 'Valid email']);
        $response->getBody()->write($success);
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    });
    
    $app->post('/quote', function (Request $request, Response $response) {
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
