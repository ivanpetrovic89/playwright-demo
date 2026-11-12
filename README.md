# Toolshop Playwright Tests

End-to-end tests for [Practice Software Testing](https://practicesoftwaretesting.com) (Toolshop), a demo web shop built for practicing test automation. Written in TypeScript with Playwright Test.

## Tech Stack

- Playwright Test
- TypeScript
- Page Object Model
- Prettier
- Docker, to run Toolshop locally

## Prerequisites

- Node.js 22 or later
- Docker Desktop, running
- The Toolshop application, cloned next to this project:

```bash
git clone https://github.com/testsmith-io/practice-software-testing.git
```

## Running Toolshop Locally

From the `practice-software-testing` folder:

```bash
docker compose -f docker-compose.prod.yml up --pull missing -d
docker compose -f docker-compose.prod.yml exec laravel-api php artisan migrate:fresh --seed --force
docker compose -f docker-compose.prod.yml exec -u root laravel-api chown -R www-data:www-data storage
```

The shop runs at http://localhost:4200 and the API at http://localhost:8091.

The third command works around a file permission issue in Toolshop's Docker setup. Without it, the API returns 500 and the shop shows no products.

## Setup

```bash
npm ci
npx playwright install
cp .env.example .env
```

`.env.example` contains Toolshop's public demo accounts, which are listed in the Toolshop README. They are not secrets.

## Running Tests

| Command                      | What it runs                              |
| ---------------------------- | ----------------------------------------- |
| `npm test`                   | All tests in Chromium, Firefox and WebKit |
| `npm run test:chrome`        | Chromium only                             |
| `npm run test:firefox`       | Firefox only                              |
| `npm run test:webkit`        | WebKit only                               |
| `npx playwright show-report` | Opens the last HTML report                |

## Code Quality

| Command                | What it does                                                                |
| ---------------------- | --------------------------------------------------------------------------- |
| `npm run typecheck`    | Checks TypeScript types. Playwright does not check them when running tests. |
| `npm run format`       | Formats all files with Prettier                                             |
| `npm run format:check` | Checks formatting without changing anything                                 |

## Project Structure

```text
pages/                 Page objects: locators and user actions
tests/                 Test files
utils/                 Helpers, such as reading required environment variables
playwright.config.ts   Base URL, test ID attribute, browsers, reporters
.env.example           Required environment variables
```

## Notes

- Toolshop marks its elements with `data-test`, so `testIdAttribute` is set to `data-test` in the config.
- Tests expect a freshly seeded database. To reset it, rerun the second Toolshop command.
