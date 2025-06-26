const axios = require('axios');

const API_BASE = 'http://localhost:5000';

async function testAPI() {
  try {
    console.log('🧪 Testing API endpoints...\n');

    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const health = await axios.get(`${API_BASE}/api/health`);
    console.log('✅ Health check passed:', health.data);
    console.log('');

    // Test scraper endpoint with sample data
    console.log('2. Testing scraper endpoint...');
    const scraper = await axios.get(`${API_BASE}/api/scraper/prices`, {
      params: {
        query: 'chainsaw',
        region: 'California',
        city: 'Los Angeles'
      },
      timeout: 60000 // 60 second timeout for scraping
    });
    console.log('✅ Scraper test passed');
    console.log(`Found ${scraper.data.listings.length} listings`);
    console.log('Sample listing:', scraper.data.listings[0]);
    console.log('');

    console.log('🎉 All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testAPI(); 