<?php

namespace App\DataFixtures;

use App\Entity\Meta;
use App\Enum\Language;
use App\Enum\MetaEntityType;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        foreach ([1, 2, 3] as $entityId) {
            $meta = new Meta();
            $meta
                ->setEntityType(MetaEntityType::Operator)
                ->setEntityId($entityId)
                ->setLang(Language::EN)
                ->setTitle($faker->sentence(6))
                ->setDescription($faker->sentence(12));
            $manager->persist($meta);
        }

        $manager->flush();
    }
}
