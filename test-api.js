const axios = require('axios');

const API_BASE = process.env.API_BASE || 'http://localhost:5000';

async function testAPI() {
  try {
    console.log('🧪 Testing API endpoints...\n');
    console.log(`📍 Testing against: ${API_BASE}\n`);

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
    if (scraper.data.listings.length > 0) {
      console.log('Sample listing:', {
        title: scraper.data.listings[0].title,
        price: scraper.data.listings[0].price,
        source: scraper.data.listings[0].source
      });
    }
    console.log('');

    // Test all endpoint
    console.log('3. Testing all endpoint...');
    const all = await axios.get(`${API_BASE}/api/scraper/all`, {
      timeout: 60000
    });
    console.log('✅ All endpoint test passed');
    console.log(`Found ${all.data.listings.length} listings`);
    console.log('');

    console.log('🎉 All tests passed!');
    console.log('🚀 API is working correctly');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.code === 'ECONNREFUSED') {
      console.error('❌ Connection refused. Make sure the backend server is running.');
      console.error('💡 Run: cd backend && npm start');
    } else if (error.code === 'ENOTFOUND') {
      console.error('❌ Host not found. Check the API_BASE URL.');
    }
  }
}

testAPI(); 