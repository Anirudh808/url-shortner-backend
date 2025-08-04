const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "urls.json");

app.use(bodyParser.json());

// Helper to validate URL
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Helper to generate 6-char unique ID
function generateId(existingIds) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id;
  do {
    id = "";
    for (let i = 0; i < 6; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  } while (existingIds.has(id));
  return id;
}

// Read URLs from file
function readUrls() {
  if (!fs.existsSync(DATA_FILE)) return {};
  const data = fs.readFileSync(DATA_FILE, "utf8");
  return data ? JSON.parse(data) : {};
}

// Write URLs to file
function writeUrls(urls) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(urls, null, 2));
}

// POST /shorten
app.post("/shorten", (req, res) => {
  const { url } = req.body;
  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const urls = readUrls();
  const existingIds = new Set(Object.keys(urls));

  // Check if URL already exists
  for (const [id, fullUrl] of Object.entries(urls)) {
    if (fullUrl === url) {
      return res.json({ shortId: id });
    }
  }

  const shortId = generateId(existingIds);
  urls[shortId] = url;
  writeUrls(urls);

  res.json({ shortId });
});

// GET /:shortId
app.get("/:shortId", (req, res) => {
  const { shortId } = req.params;
  const urls = readUrls();

  if (urls[shortId]) {
    return res.json({ url: urls[shortId] });
  } else {
    return res.status(404).json({ error: "Not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
