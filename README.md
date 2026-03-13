
# 🚀 VZero API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

VZero API is an actively updated collection of simple, fast, and lightweight REST APIs built with Node.js and Express.js. It provides various utility endpoints, currently featuring a comprehensive **Countries API** and a **Media Downloader**, with more functionalities continuously being added.

> **Note**: This is an ever-growing backend project! 🚀

**Live API**: [https://vzeroapi.vercel.app](https://vzeroapi.vercel.app)

---

## ⚙️ Installation and Setup

To get this project up and running on your local machine, follow these steps:

1. **Clone the repository**

   ```bash
   git clone [https://github.com/chx-bit/vzero-api](https://github.com/chx-bit/vzero-api.git)
   cd vzero-api
   


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

## 📡 API Endpoints Overview

**Base URL:** `https://vzeroapi.vercel.app`

### ⬇️ Downloader API

A utility endpoint to download media directly via a provided URL.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/downloader` | Fetch and download media (e.g., TikTok) as an attachment. |

**Query Parameters:**
| Parameter | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `url` | `string` | The URL of the media you want to download. | ✅ Yes |
| `type` | `string` | The platform type (e.g., `tiktok`). | ✅ Yes |

**Example cURL Command:**

```bash
curl -X GET "[https://vzeroapi.vercel.app/downloader?url=YOUR_MEDIA_URL&type=tiktok](https://vzeroapi.vercel.app/downloader?url=YOUR_MEDIA_URL&type=tiktok)" -O -J

```

---

### 🌍 Countries API

Query comprehensive country data. Easily search for countries by name, region, language, currency, government type, and capital.

| Method | Endpoint | Description | Government Data |
| --- | --- | --- | --- |
| `GET` | `/v1/countries` | Fetch all countries | ❌ No |
| `GET` | `/v1/countries?government=true` | Fetch all countries with government data | ✅ Yes |
| `GET` | `/v1/countries?name=X` | Filter by country name | ✅ Yes |
| `GET` | `/v1/countries?capital=X` | Filter by capital city | ❌ No |
| `GET` | `/v1/countries?region=X` | Filter by region | ❌ No |
| `GET` | `/v1/countries?language=X` | Filter by language | ❌ No |
| `GET` | `/v1/countries?currency=X` | Filter by currency | ❌ No |
| `GET` | `/v1/countries?govType=X` | Filter by government type | ✅ Yes |
| `GET` | `/v1/countries/:code` | Fetch single country by ISO2 code | ✅ Yes |
| `GET` | `/ping` | Health check & performance metrics | — |

**Query Parameters:**

| Parameter | Type | Description | Government Data |
| --- | --- | --- | --- |
| `name` | `string` | Search by country name (e.g., `Indonesia`) | ✅ Yes |
| `capital` | `string` | Search by capital city (e.g., `Jakarta`) | ❌ No |
| `region` | `string` | Filter by region (e.g., `Asia`, `Europe`) | ❌ No |
| `language` | `string` | Filter by language (e.g., `Spanish`) | ❌ No |
| `currency` | `string` | Filter by currency (e.g., `IDR`, `USD`) | ❌ No |
| `govType` | `string` | Filter by government type (e.g., `republic`) | ✅ Yes |
| `government` | `boolean` | Set `true` to include government data | ✅ Yes |

---

## 📦 Response Format (Countries API)

The Countries endpoints return a consistent JSON response structure:

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
    "docs": "[https://github.com/chx-bit/vzero-api](https://github.com/chx-bit/vzero-api)",
    "author": "chxbit",
    "response_time": "5ms"
  },
  "data": [...]
}

```

---

## 💻 Example cURL Commands (Countries API)

### 1. Fetch All Countries

```bash
curl -X GET "[https://vzeroapi.vercel.app/v1/countries](https://vzeroapi.vercel.app/v1/countries)"

```

### 2. Search by Name (Includes Government Data)

```bash
curl -X GET "[https://vzeroapi.vercel.app/v1/countries?name=Indonesia](https://vzeroapi.vercel.app/v1/countries?name=Indonesia)"

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
curl -X GET "[https://vzeroapi.vercel.app/v1/countries?region=Europe](https://vzeroapi.vercel.app/v1/countries?region=Europe)"

```

### 4. Search by Currency

```bash
curl -X GET "[https://vzeroapi.vercel.app/v1/countries?currency=USD](https://vzeroapi.vercel.app/v1/countries?currency=USD)"

```

### 5. Fetch All Countries with Government Data

```bash
curl -X GET "[https://vzeroapi.vercel.app/v1/countries?government=true](https://vzeroapi.vercel.app/v1/countries?government=true)"

```

### 6. Filter by Government Type

```bash
curl -X GET "[https://vzeroapi.vercel.app/v1/countries?govType=monarchy](https://vzeroapi.vercel.app/v1/countries?govType=monarchy)"

```

### 7. Fetch Single Country by ISO2 Code

```bash
curl -X GET "[https://vzeroapi.vercel.app/v1/countries/ID](https://vzeroapi.vercel.app/v1/countries/ID)"

```

### 8. Health Check

```bash
curl -X GET "[https://vzeroapi.vercel.app/ping](https://vzeroapi.vercel.app/ping)"

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

This project is licensed under the MIT License. See the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

---

Collab with [Lightning-88](https://github.com/Lightning-88)

