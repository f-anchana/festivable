<?php

// src/Controller/DefaultController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

use App\Repository\UserRepository;
use App\Entity\User;

#[AsController] //Taguer le controller sinon il est pv est ça marche pas
class DefaultController
{
    private $userRepository;

    // Injection du repository dans le contrôleur
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    
    #[Route('/users', methods: ['GET'])]
    public function getUsers(): JsonResponse
    {
        $users = $this->userRepository->findAllUsers();

        // Créer un tableau avec les données des utilisateurs
        $data = [];
        foreach ($users as $user) {
            $data[] = [
                'id' => $user->getId(),
                'pseudo' => $user->getPseudo(),
                'mail' => $user->getMail()
            ];
        }

        // Retourner les données au format JSON
        return new JsonResponse($data);
    }
    
       // Insérer un nouvel utilisateur
       #[Route('/users', methods: ['POST'])]
       public function createUser(Request $request): JsonResponse
       {
           $data = json_decode($request->getContent(), true);
   
           if (!isset($data['pseudo'],$data['mdp'], $data['mail'])) {
               return new JsonResponse(['error' => 'Invalid data'], 400);
           }
   
           $user = new User();
           $user->setPseudo($data['pseudo']);
           $user->setMdp($data['mdp']);
           $user->setMail($data['mail']);
   
           $this->userRepository->saveUser($user);
   
           return new JsonResponse(['message' => 'User created successfully'], 201);
       }
}

?>