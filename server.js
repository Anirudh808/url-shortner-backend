import express from "express";
import bodyParser from "body-parser";
import {
  generateId,
  getExistingUrl,
  getLongUrl,
  isValidUrl,
  writeUrls,
} from "./controllers/urls.controller.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Allow CORS from any domain
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// POST /shorten
app.post("/shorten", async (req, res) => {
  const { url } = req.body;
  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const existingUrl = await getExistingUrl(url);

  if (existingUrl) {
    return res.status(200).json({
      shortId: existingUrl.shortUrlId,
    });
  }

  const shortId = generateId();

  writeUrls(url, shortId);

  res.json({ shortId });
});

// GET /:shortId
app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  console.log(shortId);
  const url = await getLongUrl(shortId);

  if (url) {
    return res.json({ url: url });
  } else {
    return res.status(404).json({ error: "Not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
