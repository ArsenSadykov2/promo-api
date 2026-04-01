# Promo API

REST API для системы промокодов. Реализовано на NestJS + PostgreSQL + Prisma.

## Стек
- Node.js
- TypeScript
- NestJS
- PostgreSQL
- Prisma ORM
- Docker

## Запуск

### 1. Клонируй репозиторий
git clone https://github.com/ArsenSadykov2/promo-api.git
cd promo-api

### 2. Установи зависимости
npm install

### 3. Запусти PostgreSQL через Docker
docker run --name promo-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=promo_db \
  -p 5432:5432 \
  -d postgres

### 4. Создай файл .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/promo_db?schema=public"

### 5. Примени миграции
npx prisma migrate dev

### 6. Запусти сервер
npm run start:dev

Сервер запустится на http://localhost:3000

## API Endpoints

### Промокоды

| Метод | URL | Описание |
|-------|-----|----------|
| POST | /promo | Создать промокод |
| GET | /promo | Список всех промокодов |
| GET | /promo/:id | Получить промокод по ID |
| POST | /promo/:code/activate | Активировать промокод |

### Примеры запросов

**Создать промокод:**
POST /promo
{
  "code": "SALE20",
  "discount": 20,
  "limit": 5,
  "expiresAt": "2026-12-31"
}

**Активировать промокод:**
POST /promo/SALE20/activate
{
  "email": "user@gmail.com"
}

## Бизнес логика
- Каждый email может активировать конкретный промокод только один раз
- Нельзя активировать промокод сверх лимита
- Нельзя активировать истёкший промокод
