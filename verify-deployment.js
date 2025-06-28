#!/usr/bin/env node

/**
 * Railway Deployment Verification Script
 * Run this to verify your deployment configuration
 */

const https = require('https');
const http = require('http');

console.log('🔍 Railway Deployment Verification\n');

// Configuration - Update these with your actual Railway URLs
const config = {
  frontendUrl: process.env.FRONTEND_URL || 'https://your-frontend-service.up.railway.app',
  backendUrl: process.env.BACKEND_URL || 'https://your-backend-service.up.railway.app'
};

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });
    
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

async function checkService(name, url, endpoint = '') {
  console.log(`\n🔍 Checking ${name}...`);
  console.log(`   URL: ${url}${endpoint}`);
  
  try {
    const response = await makeRequest(`${url}${endpoint}`);
    console.log(`   ✅ Status: ${response.status}`);
    
    if (response.status >= 200 && response.status < 300) {
      console.log(`   ✅ ${name} is responding correctly`);
      return true;
    } else {
      console.log(`   ⚠️  ${name} returned status ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`   ❌ ${name} error: ${error.message}`);
    return false;
  }
}

async function runVerification() {
  console.log('📋 Configuration:');
  console.log(`   Frontend: ${config.frontendUrl}`);
  console.log(`   Backend: ${config.backendUrl}`);
  
  const results = {
    frontend: await checkService('Frontend', config.frontendUrl),
    backend: await checkService('Backend', config.backendUrl),
    backendHealth: await checkService('Backend Health', config.backendUrl, '/api/health'),
    backendTest: await checkService('Backend Test', config.backendUrl, '/api/scraper/test')
  };
  
  console.log('\n📊 Results Summary:');
  console.log(`   Frontend: ${results.frontend ? '✅' : '❌'}`);
  console.log(`   Backend: ${results.backend ? '✅' : '❌'}`);
  console.log(`   Backend Health: ${results.backendHealth ? '✅' : '❌'}`);
  console.log(`   Backend Test: ${results.backendTest ? '✅' : '❌'}`);
  
  const allPassed = Object.values(results).every(result => result);
  
  if (allPassed) {
    console.log('\n🎉 All services are working correctly!');
  } else {
    console.log('\n⚠️  Some services have issues. Check the logs above.');
    console.log('\n💡 Troubleshooting tips:');
    console.log('   1. Verify environment variables are set in Railway');
    console.log('   2. Check that NEXT_PUBLIC_API_BASE points to your backend URL');
    console.log('   3. Ensure both services are deployed and running');
    console.log('   4. Check Railway logs for any build or runtime errors');
  }
}

// Run verification
runVerification().catch(console.error); 