const fs = require('fs');

// Read the scraper file
let content = fs.readFileSync('backend/scraper.js', 'utf8');

// Replace the entire fallback data array with different images
const newFallbackData = `// Fallback data for when scraping fails - using different chainsaw images
const fallbackData = [
  {
    title: "Husqvarna 562 XP G MARK II",
    price: "$1009.99",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop&auto=format",
    url: "https://www.husqvarna.com/us/chainsaws/562xp-g-mark-ii/",
    source: "Fallback"
  },
  {
    title: "Stihl MS 271 Farm Boss Chainsaw",
    price: "$449.99",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop&auto=format",
    url: "https://www.stihlusa.com/products/chain-saws/homeowner-saws/ms271/",
    source: "Fallback"
  },
  {
    title: "Echo CS-590 Timber Wolf Chainsaw",
    price: "$379.99",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop&auto=format",
    url: "https://www.echo-usa.com/chain-saws/cs-590",
    source: "Fallback"
  },
  {
    title: "Makita EA4300F40B Chainsaw",
    price: "$299.99",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop&auto=format",
    url: "https://www.makitatools.com/products/details/EA4300F40B",
    source: "Fallback"
  },
  {
    title: "Poulan Pro PR5020 Chainsaw",
    price: "$199.99",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop&auto=format",
    url: "https://www.poulanpro.com/products/chainsaws/chainsaw-pr5020",
    source: "Fallback"
  }
];`;

// Replace the fallback data section
content = content.replace(
  /\/\/ Fallback data for when scraping fails[\s\S]*?];/,
  newFallbackData
);

// Write the updated content back
fs.writeFileSync('backend/scraper.js', content);

console.log('✅ Updated fallback data with different chainsaw images'); 