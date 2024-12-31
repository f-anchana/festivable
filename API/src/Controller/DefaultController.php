<?php

// src/Controller/DefaultController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class DefaultController
{
    #[Route('/hello/{name}', name: 'index')]
     public function index(string $name): Response
    {
         return new Response("Hello $name!");
    }

    #[Route('/simplicity', methods: ['GET'])]
    public function simple(): Response
    {
        return new Response('Simple! Easy! Great!');
    }
}

?>