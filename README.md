# 🌍 Countries API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A simple, fast, and lightweight REST API built with Node.js and Express.js to query comprehensive country data. You can easily search for countries by name, region, language, currency, and capital.

> **Note**: This is my first backend project! 🚀

**Live API**: [https://countriesapi-v0.vercel.app](https://countriesapi-v0.vercel.app)

---

## 📁 Project Structure

```
├── public
│   ├── assets
│   │   └── bahlil.png
│   ├── index.html
│   └── scripts
│       └── getData.js
├── src
│   ├── api
│   │   └── v1
│   │       └── countries.js
│   ├── index.js
│   ├── routes
│   │   └── countriesRoutes.js
│   ├── scripts
│   │   └── updateGovernment.js
│   ├── tests
│   │   └── test.js
│   └── utils
│       └── handlers.js
└── vercel.json
```

---

## ⚙️ Installation and Setup

To get this project up and running on your local machine, follow these steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/chx-bit/countries-api.git
   cd countries-api
   ```

2. **Install dependencies**
   Make sure you have [Node.js](https://nodejs.org/) installed, then run:

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:3000`.

---

## 📡 API Endpoints

Base URL: `https://countriesapi-v0.vercel.app`

| Method | Endpoint                        | Description                              | Government Data |
| :----- | :------------------------------ | :--------------------------------------- | :-------------- |
| `GET`  | `/v1/countries`                 | Fetch all countries                      | ❌ No           |
| `GET`  | `/v1/countries?government=true` | Fetch all countries with government data | ✅ Yes          |
| `GET`  | `/v1/countries?name=X`          | Filter by country name                   | ✅ Yes          |
| `GET`  | `/v1/countries?capital=X`       | Filter by capital city                   | ❌ No           |
| `GET`  | `/v1/countries?region=X`        | Filter by region                         | ❌ No           |
| `GET`  | `/v1/countries?language=X`      | Filter by language                       | ❌ No           |
| `GET`  | `/v1/countries?currency=X`      | Filter by currency                       | ❌ No           |
| `GET`  | `/v1/countries?govType=X`       | Filter by government type                | ✅ Yes          |
| `GET`  | `/v1/countries/:code`           | Fetch single country by ISO2 code        | ✅ Yes          |
| `GET`  | `/ping`                         | Health check & performance metrics       | —               |

---

## 🔍 Query Parameters

| Parameter    | Type      | Description                                  | Government Data |
| :----------- | :-------- | :------------------------------------------- | :-------------- |
| `name`       | `string`  | Search by country name (e.g., `Indonesia`)   | ✅ Yes          |
| `capital`    | `string`  | Search by capital city (e.g., `Jakarta`)     | ❌ No           |
| `region`     | `string`  | Filter by region (e.g., `Asia`, `Europe`)    | ❌ No           |
| `language`   | `string`  | Filter by language (e.g., `Spanish`)         | ❌ No           |
| `currency`   | `string`  | Filter by currency (e.g., `IDR`, `USD`)      | ❌ No           |
| `govType`    | `string`  | Filter by government type (e.g., `republic`) | ✅ Yes          |
| `government` | `boolean` | Set `true` to include government data        | ✅ Yes          |

---

## 📦 Response Format

All endpoints return a consistent response structure:

```json
{
  "logs": {
    "success": 200,
    "message": "OK",
    "timestamp": "2026-03-08T10:00:00.000Z",
    "total": 200,
    "count": 200,
    "version": "v1.0.0",
    "endpoint": "/v1/countries",
    "method": "GET",
    "docs": "https://github.com/chx-bit/countries-api",
    "author": "chxbit",
    "response_time": "5ms"
  },
  "data": [...]
}
```

---

## 💻 Example cURL Commands

### 1. Fetch All Countries

```bash
curl -X GET "https://countriesapi-v0.vercel.app/v1/countries"
```

### 2. Search by Name (Includes Government Data)

```bash
curl -X GET "https://countriesapi-v0.vercel.app/v1/countries?name=Indonesia"
```

**Example Response:**

```json
{
  "logs": {
    "success": 200,
    "message": "OK",
    "total": 200,
    "count": 1
  },
  "data": [
    {
      "id": 1,
      "name": "Indonesia",
      "capital": "Jakarta",
      "region": "Asia",
      "language": "Indonesian",
      "currency": "IDR",
      "phone_code": "+62",
      "government": {
        "type": "Presidential republic",
        "leader_title": "President",
        "leader": "Prabowo Subianto"
      }
    }
  ]
}
```

### 3. Search by Region

```bash
curl -X GET "https://countriesapi-v0.vercel.app/v1/countries?region=Europe"
```

### 4. Search by Currency

```bash
curl -X GET "https://countriesapi-v0.vercel.app/v1/countries?currency=USD"
```

### 5. Fetch All Countries with Government Data

```bash
curl -X GET "https://countriesapi-v0.vercel.app/v1/countries?government=true"
```

### 6. Filter by Government Type

```bash
curl -X GET "https://countriesapi-v0.vercel.app/v1/countries?govType=monarchy"
```

### 7. Fetch Single Country by ISO2 Code

```bash
curl -X GET "https://countriesapi-v0.vercel.app/v1/countries/ID"
```

### 8. Health Check

```bash
curl -X GET "https://countriesapi-v0.vercel.app/ping"
```

**Example Response:**

```json
{
  "status": "OK",
  "uptime": "620.77s",
  "response_time": {
    "ping": "29ms",
    "countries": "29ms"
  },
  "memory": {
    "used": "13.56MB",
    "total": "14.98MB"
  },
  "timestamp": "2026-03-08T10:00:00.000Z"
}
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Collab with [Lightning-88](https://github.com/Lightning-88)
