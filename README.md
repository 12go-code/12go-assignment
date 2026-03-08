# 12go-assignment

## Introduction

This repository (**12go-assignment**) is a **task assignment** for Software Engineer candidates at **12Go Asia Pte. Ltd.**  
It contains a multi-service application (Symfony backends and a Nuxt frontend) intended to be run with Docker.

---

## Deployment

### 1. Clone the repository

```bash
git clone git@github.com:12go-code/12go-assignment.git
cd 12go-assignment
```

### 2. Build the images

```bash
docker compose build
```

### 3. Install dependencies and prepare DB (SEO service)

Install PHP dependencies, run migrations, and load fixtures for the SEO service.

```bash
docker compose run --rm seo sh -c "composer install && php bin/console doctrine:migrations:migrate --no-interaction && php bin/console doctrine:fixtures:load --no-interaction"
```

### 4. Install dependencies and prepare DB (Product service)

Same for the Product service: dependencies, migrations, and seed data.

```bash
docker compose run --rm product sh -c "composer install && php bin/console doctrine:migrations:migrate --no-interaction && php bin/console doctrine:fixtures:load --no-interaction"
```

### 5. Install frontend dependencies

Install npm packages for the Nuxt app.

```bash
docker compose run --rm front sh -c "npm install"
```

### 6. Start the application

Bring up all services (backends and frontend).

```bash
docker compose up
```

### 7. Open the app

In your browser go to: **http://localhost:3000/en**

---

## Assignment overview

The assignment is split into **two parts**:

- **Part 1 – Feature implementation**: build stations-related pages in the frontend (described below).
- **Part 2 – Architecture & improvements**: propose and/or implement improvements to the current solution.

### Part 1: Stations pages

Your first task is to implement **stations** pages in the frontend (Nuxt app), similar in spirit to the existing **operators** pages.

#### 1. Stations list page

- **Route**: a localized list page, e.g. `/{lang}/stations`
- **Data**: list of stations (you may reuse the existing patterns for fetching data used on the operators list page)
- **UI**:
  - Display a simple list of station names
  - Each item must be clickable and navigate to the corresponding station detail page

#### 2. Station detail page

- **Route**: a localized detail page, e.g. `/{lang}/stations/{slug}`
- **Meta / SEO**:
  - The page must have standard meta tags (title, description) configured via `useHead`, **similar to the Operators detail page**
  - The page must display **SEO text** (HTML string) coming from the backend, similar to the `seoText` on the Operators page
- **Content**:
  - Station name as the main title
  - SEO text block
  - **List of operators linked to this station** (you decide how to visually present it, but it should at least show operator names)

#### 3. Navigation and UX

- From the stations list page, clicking a station should open its detail page.
- From the station detail page, it should be easy to go back to the stations list (e.g. a “Back to stations” link or button).

### Part 2: Architecture & improvements

In the second part of the assignment, we want to understand how you think about **performance**, **scalability**, **maintainability**, and overall **architecture** of the system — not just about low-level code style.

You can:

- **Implement improvements directly in the codebase**, and/or
- **Write your recommendations in this README** (e.g. in a new section `Proposed improvements`).

We are **not** looking for:

- **Code style tweaks only**
  - Minor formatting changes, renaming variables, reordering imports, etc.
- **Tooling-only improvements**
  - Adding linters, static analyzers, CI configs as the main part of the answer
- **Small refactorings without clear benefits**
  - Changes that do not improve performance, scalability, clarity of architecture, or developer experience in a meaningful way
- **Infrastructure changes for this demo setup**
  - Replacing SQLite with PostgreSQL, changing container orchestration, or similar infra-level changes that are not relevant to the core architectural task
- **Mechanical DB-level tweaks**
  - Blindly adding indexes to tables without addressing higher-level data flow, boundaries, or API design

Instead, we want you to **think architecturally and long-term**:

- Identify what would become a bottleneck or pain point as the system grows.
- Propose how you would evolve the architecture to handle more traffic, more features, and a larger team.
- Explain your reasoning and trade-offs, even if you only partially implement the ideas in code.
