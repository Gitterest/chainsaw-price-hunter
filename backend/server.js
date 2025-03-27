const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const puppeteer = require("puppeteer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Define Mongoose schema
const SearchSchema = new mongoose.Schema({
    query: String,
    timestamp: { type: Date, default: Date.now },
});

const AlertSchema = new mongoose.Schema({
    query: String,
    targetPrice: Number,
    email: String,
    timestamp: { type: Date, default: Date.now },
});

const Search = mongoose.model("Search", SearchSchema);
const Alert = mongoose.model("Alert", AlertSchema);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ...previous imports, mongoose schemas, MongoDB connection...

const { scrapeFacebookMarketplace, scrapeOfferUp, scrapeMercari } = require('../scraper');

// Combined API Route to fetch from FB, OfferUp & Mercari
app.get("/api/prices", async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Search query is required" });

    await new Search({ query }).save();

    try {
        const [fbResults, offerUpResults, mercariResults] = await Promise.all([
            scrapeFacebookMarketplace(query),
            scrapeOfferUp(query),
            scrapeMercari(query)
        ]);

        const combinedResults = [
            ...fbResults.map(item => ({ ...item, source: 'Facebook Marketplace' })),
            ...offerUpResults.map(item => ({ ...item, source: 'OfferUp' })),
            ...mercariResults.map(item => ({ ...item, source: 'Mercari' }))
        ];

        // 👇 Add this line to debug output!
        console.log("🔥 Combined Results:", JSON.stringify(combinedResults, null, 2));

        res.json(combinedResults);
    } catch (error) {
        console.error("🔥 Scraping error:", error);
        res.status(500).json({ error: "Failed to scrape listings" });
    }
});


// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
