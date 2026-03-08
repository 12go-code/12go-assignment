<?php

namespace App\DataFixtures;

use App\Entity\Operator;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $operators = [
            ['name' => 'Alpha', 'sales' => 1200, 'routes' => 45, 'rating' => 4.8],
            ['name' => 'Beta', 'sales' => 890, 'routes' => 32, 'rating' => 4.5],
            ['name' => 'Gamma', 'sales' => 2100, 'routes' => 78, 'rating' => 4.9],
        ];

        foreach ($operators as $data) {
            $operator = new Operator();
            $operator
                ->setName($data['name'])
                ->setSales($data['sales'])
                ->setRoutes($data['routes'])
                ->setRating($data['rating']);
            $manager->persist($operator);
        }

        $manager->flush();
    }
}
