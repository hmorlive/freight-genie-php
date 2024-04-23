<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Respect\Validation\Validator as v;
use Tuupola\Middleware\CorsMiddleware;

require __DIR__ . '/../vendor/autoload.php';
require "../db/index.php";


$app = AppFactory::create();

// CORS Middleware setup
$app->add(new Tuupola\Middleware\CorsMiddleware([
    "origin" => ["*"], // Adjust this to be more restrictive as needed
    "methods" => ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    "headers.allow" => ["Accept", "Content-Type", "Authorization"],
    "headers.expose" => [],
    "credentials" => true,
    "cache" => 0,
]));

// body parsing middleware
$app->addBodyParsingMiddleware();

// routing middleware
$app->addRoutingMiddleware();

// error handling middleware
$app->addErrorMiddleware(true, true, true);


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
    $db = getDB();
    $statement = $db->prepare('SELECT * FROM quotes WHERE email = :email');
    $statement->execute([':email' => $email]);
    $quotes = $statement->fetchAll();

    // return quotes
    $response->getBody()->write(json_encode($quotes));
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


    // generate uuid for quote
    $quote_id = uniqid();

    // insert quote into db
    $db = getDB();
    $statement = $db->prepare('INSERT INTO quotes (id, email, from_location, to_location, shipping_date, freight_type, goods_type) VALUES (:quote_id, :email, :from_location, :to_location, :shipping_date, :freight_type, :goods_type)');
    // Bind parameters and execute the statement
    $statement->execute([
        ':quote_id' => $quote_id,
        ':email' => $data['email'],
        ':from_location' => $data['from'],
        ':to_location' => $data['to'],
        ':shipping_date' => $data['shippingDate'],
        ':freight_type' => $data['freightType'],
        ':goods_type' => $data['goodsType']
    ]);

    // Success response
    return $response->withStatus(201);
});

// catch all route
$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
    return $res->withStatus(404);
});

$app->run();