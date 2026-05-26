const fs = require('fs');
const https = require('https');

const URLs = [
  'https://raw.githubusercontent.com/hasinhayder/google-fonts/master/fonts.json',
  'https://raw.githubusercontent.com/jonathantneal/google-fonts-complete/master/google-fonts.json'
];

function fetchURL(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to load ${url}: Status Code ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', (err) => reject(err));
  });
}

async function main() {
  console.log('Fetching Google Fonts metadata...');
  let fetchedData = null;
  
  for (const url of URLs) {
    try {
      console.log(`Trying URL: ${url}`);
      const text = await fetchURL(url);
      fetchedData = JSON.parse(text);
      console.log(`Successfully fetched from: ${url}`);
      break;
    } catch (e) {
      console.error(`Failed to fetch from ${url}:`, e.message);
    }
  }

  if (!fetchedData) {
    console.error('Could not fetch font data from any source.');
    process.exit(1);
  }

  let fonts = [];

  // Parse Hasin Hayder format (usually array of fonts) or Jonathan Neal format (usually object mapping font name to details)
  if (Array.isArray(fetchedData)) {
    console.log(`Found array of size ${fetchedData.length}`);
    fonts = fetchedData.map((f, index) => {
      const family = f.family || f.name;
      const category = f.category || 'Sans Serif';
      return {
        name: family,
        category: formatCategory(category),
        popular: index < 150,
        trending: index > 150 && index < 300,
        variants: f.variants || ['regular'],
      };
    });
  } else if (typeof fetchedData === 'object') {
    const keys = Object.keys(fetchedData);
    console.log(`Found object with ${keys.length} keys`);
    fonts = keys.map((key, index) => {
      const f = fetchedData[key];
      const category = f.category || 'sans-serif';
      return {
        name: key,
        category: formatCategory(category),
        popular: index < 150,
        trending: index > 150 && index < 300,
        variants: Object.keys(f.variants || {}),
      };
    });
  }

  // Filter out any fonts without names
  fonts = fonts.filter(f => f.name);

  // If we have more than 600 fonts, take the first 650
  if (fonts.length > 650) {
    fonts = fonts.slice(0, 650);
  }

  console.log(`Processed ${fonts.length} fonts. Writing to src/data/google-fonts.json...`);
  
  if (!fs.existsSync('src/data')) {
    fs.mkdirSync('src/data', { recursive: true });
  }
  
  fs.writeFileSync('src/data/google-fonts.json', JSON.stringify(fonts, null, 2));
  console.log('Success!');
}

function formatCategory(cat) {
  const c = cat.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (c.includes('sans')) return 'Sans Serif';
  if (c.includes('serif')) return 'Serif';
  if (c.includes('mono')) return 'Monospace';
  if (c.includes('hand') || c.includes('write')) return 'Handwriting';
  if (c.includes('display')) return 'Display';
  if (c.includes('script')) return 'Script';
  return 'Display';
}

main();
