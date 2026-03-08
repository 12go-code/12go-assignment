<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260309000000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create operator table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE operator (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(255) NOT NULL, sales INTEGER NOT NULL, routes INTEGER NOT NULL, rating DOUBLE PRECISION NOT NULL)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE operator');
    }
}
