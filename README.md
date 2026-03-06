
# 🌍 Countries API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

A simple, fast, and lightweight REST API built with Node.js and Express.js to query comprehensive country data. You can easily search for countries by name, region, language, currency, and capital.

> **Note**: This is my first backend project! 🚀

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
   _The server will start and listen on `http://localhost:3000` (or the port defined in your environment)._

---

## 📡 API Endpoints

### `GET /countries`

Fetches a list of countries based on the provided query parameters.

**Behavioral Note:**

- When searching by `name`, the response **includes** detailed government data for the matched country.
- All other queries (`capital`, `region`, `language`, `currency`) will return country data **excluding** the government data to keep the payload lightweight.

---

## 🔍 Query Parameters

You can filter the `/countries` endpoint using the following query parameters:

| Parameter  | Type     | Description                                                       | Government Data Included? |
| :--------- | :------- | :---------------------------------------------------------------- | :------------------------ |
| `name`     | `string` | Search by country name (e.g., "Indonesia", "Canada").             | ✅ **Yes**                |
| `capital`  | `string` | Search by the capital city (e.g., "Jakarta", "Tokyo").            | ❌ **No**                 |
| `region`   | `string` | Filter countries by geographical region (e.g., "Asia", "Europe"). | ❌ **No**                 |
| `language` | `string` | Filter countries by spoken language (e.g., "Spanish", "English"). | ❌ **No**                 |
| `currency` | `string` | Filter countries by currency (e.g., "IDR", "USD").                | ❌ **No**                 |

---

## 💻 Example cURL Commands

Here are some examples of how to interact with the API using `curl`.

### 1. Search by Name (Includes Government Data)

```bash
curl -X GET "http://localhost:3000/countries?name=Indonesia"
```

**Example Response:**

```json[
  {
    "name": "Indonesia",
    "capital": "Jakarta",
    "region": "Asia",
    "language": "Indonesian",
    "currency": "IDR",
    "government": {
      "type": "Presidential republic",
      "headOfState": "President"
    }
  }
]
```

### 2. Search by Region (Excludes Government Data)

```bash
curl -X GET "http://localhost:3000/countries?region=Europe"
```

**Example Response:**

```json[
  {
    "name": "France",
    "capital": "Paris",
    "region": "Europe",
    "language": "French",
    "currency": "EUR"
  },
  {
    "name": "Germany",
    "capital": "Berlin",
    "region": "Europe",
    "language": "German",
    "currency": "EUR"
  }
]
```

### 3. Search by Currency

```bash
curl -X GET "http://localhost:3000/countries?currency=USD"
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
