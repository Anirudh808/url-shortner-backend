# URL Shortener Backend

A lightweight backend service for shortening URLs using **Node.js**, **Express**, and **MongoDB**.

## 🌐 Overview

This backend application allows users to shorten long URLs and retrieve the original links using a simple REST API.

### How It Works

- `POST /shorten`  
  Accepts a long URL in the request body, checks if it already exists in the database, and returns a corresponding short ID:
  - If the URL exists: returns the existing short ID.
  - If it's new: generates a 6-character unique ID, saves it along with the long URL, and returns the short ID.

- `GET /:shortId`  
  Redirects to the original long URL corresponding to the `shortId`, if it exists. If not found, returns a `404 Not Found`.

---

## ⚙️ Tech Stack

- **Node.js** (v22)
- **Express.js**
- **MongoDB** with **Mongoose**
- JSON for basic URL storage (used in development)

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anirudh808/url-shortner-backend.git
   cd url-shortner-backend

2. **Install dependencies**
   ```bash
   npm install

3. **Configure environment**
   -Create a ```.env``` file (if applicable) or update config.js directly with your MongoDB connection string.
