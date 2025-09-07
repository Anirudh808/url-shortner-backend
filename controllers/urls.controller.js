import Url from "../db/model.js";
import connectToDatabase from "../db/mongodb.js";

// Helper to validate URL
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Helper to generate 6-char unique ID
export const generateId = () => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id;
  id = "";
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

// Read URLs from db
export const getLongUrl = async (shortId) => {
  try {
    await connectToDatabase();
    const urls = await Url.find({ shortUrlId: shortId });
    if (urls.length > 0) {
      return urls[0].longUrl;
    } else {
      return -1;
    }
  } catch (error) {
    console.log("Error fetching long url: ", error);
    return -1;
  }
};

// Get existing URL
export const getExistingUrl = async (longUrl) => {
  try {
    await connectToDatabase();
    const existingUrl = await Url.find({ longUrl: longUrl });
    if (existingUrl.length > 0) {
      return existingUrl;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error while checing existing url: ", error);
    return -1;
  }
};

// Write URLs to db
export const writeUrls = async (url, shortId) => {
  try {
    await connectToDatabase();
    const newUrl = await Url.create({
      longUrl: url,
      shortUrlId: shortId,
    });
    return newUrl;
  } catch (error) {
    console.log("Error while creating new URL in DB: ", error);
    return null;
  }
};
