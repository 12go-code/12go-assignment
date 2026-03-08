<?php

namespace App\Controller;

use App\Repository\OperatorRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class OperatorController extends AbstractController
{
    #[Route('/operator', name: 'operator_list', methods: ['GET'])]
    public function list(OperatorRepository $repo): JsonResponse
    {
        $operators = $repo->findBy([], ['id' => 'ASC']);

        return $this->json(array_map(
            fn ($o) => [
                'id' => $o->getId(),
                'name' => $o->getName(),
            ],
            $operators
        ));
    }

    #[Route('/operator/{id}', name: 'operator_show', requirements: ['id' => '\d+'])]
    public function show(int $id, OperatorRepository $repo): JsonResponse
    {
        $operator = $repo->find($id);

        if (!$operator) {
            return $this->json(null, Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            'id' => $operator->getId(),
            'name' => $operator->getName(),
            'sales' => $operator->getSales(),
            'routes' => $operator->getRoutes(),
            'rating' => $operator->getRating(),
        ]);
    }
}
