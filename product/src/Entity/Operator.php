<?php

namespace App\Entity;

use App\Repository\OperatorRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OperatorRepository::class)]
#[ORM\Table(name: 'operator')]
class Operator
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::INTEGER)]
    private int $sales = 0;

    #[ORM\Column(type: Types::INTEGER)]
    private int $routes = 0;

    #[ORM\Column(type: Types::FLOAT)]
    private float $rating = 0.0;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;
        return $this;
    }

    public function getSales(): int
    {
        return $this->sales;
    }

    public function setSales(int $sales): static
    {
        $this->sales = $sales;
        return $this;
    }

    public function getRoutes(): int
    {
        return $this->routes;
    }

    public function setRoutes(int $routes): static
    {
        $this->routes = $routes;
        return $this;
    }

    public function getRating(): float
    {
        return $this->rating;
    }

    public function setRating(float $rating): static
    {
        $this->rating = $rating;
        return $this;
    }
}
