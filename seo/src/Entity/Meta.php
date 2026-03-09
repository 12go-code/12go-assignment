<?php

namespace App\Entity;

use App\Enum\Language;
use App\Enum\MetaEntityType;
use App\Repository\MetaRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MetaRepository::class)]
#[ORM\Table(
    name: 'meta',
    indexes: [
        new ORM\Index(name: 'meta_entity_idx', columns: ['entity_type', 'entity_id'])
    ],
    uniqueConstraints: [
        new ORM\UniqueConstraint(name: 'meta_entity_lang_uidx', columns: ['entity_type', 'entity_id', 'lang'])
    ]
)]
class Meta
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(name: 'entity_type', enumType: MetaEntityType::class)]
    private ?MetaEntityType $entityType = null;

    #[ORM\Column(name: 'entity_id')]
    private ?int $entityId = null;

    #[ORM\Column(enumType: Language::class)]
    private ?Language $lang = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEntityType(): ?MetaEntityType
    {
        return $this->entityType;
    }

    public function setEntityType(MetaEntityType $entityType): static
    {
        $this->entityType = $entityType;
        return $this;
    }

    public function getEntityId(): ?int
    {
        return $this->entityId;
    }

    public function setEntityId(int $entityId): static
    {
        $this->entityId = $entityId;
        return $this;
    }

    public function getLang(): ?Language
    {
        return $this->lang;
    }

    public function setLang(Language $lang): static
    {
        $this->lang = $lang;
        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;
        return $this;
    }
}
