import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
  longUrl: { type: String, required: [true, "long url is needed"] },
  shortUrlId: { type: String, required: [true, "shortUrlId is needed"] },
});

const Url = mongoose.model("Url", urlSchema);

export default Url;
