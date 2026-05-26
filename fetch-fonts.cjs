const fs = require('fs');
const https = require('https');

const URL = 'https://raw.githubusercontent.com/jonathantneal/google-fonts-complete/master/google-fonts.json';

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
  console.log('Fetching Google Fonts metadata from Jonathan Neal...');
  try {
    const text = await fetchURL(URL);
    const fetchedData = JSON.parse(text);
    const keys = Object.keys(fetchedData);
    console.log(`Successfully fetched! Keys count: ${keys.length}`);
    
    const popularFonts = [
      'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Inter', 'Oswald', 
      'Source Sans Pro', 'Raleway', 'PT Sans', 'Merriweather', 'Noto Sans', 
      'Nunito', 'Playfair Display', 'Lora', 'Rubik', 'Work Sans', 'Fira Sans', 
      'Barlow', 'Mulish', 'Quicksand', 'Josefin Sans', 'PT Serif', 'DM Sans', 
      'Heebo', 'Ubuntu', 'Space Grotesk', 'Outfit', 'Plus Jakarta Sans'
    ];

    const modernFonts = ['Poppins', 'Plus Jakarta Sans', 'Outfit', 'Montserrat', 'Inter', 'Kanit', 'Sora', 'Syne', 'Clash Display', 'Cabinet Grotesk'];
    const minimalFonts = ['Inter', 'Raleway', 'DM Sans', 'Abel', 'Actor', 'Urbanist', 'Manrope', 'Lexend', 'Questrial', 'Tenor Sans'];
    const futuristicFonts = ['Orbitron', 'Space Grotesk', 'Syncopate', 'Rajdhani', 'Share Tech Mono', 'Oxanium', 'Audiowide', 'Michroma', 'Exo 2', 'Teko'];
    const decorativeFonts = ['Lobster', 'Pacifico', 'Cinzel', 'Playfair Display', 'Abril Fatface', 'Righteous', 'Creepster', 'Ewert', 'Monoton', 'Spicy Rice'];

    const fonts = keys.map((key, index) => {
      const f = fetchedData[key];
      let category = formatCategory(f.category || 'sans-serif');
      
      // Map custom categories to showcase diverse filters
      if (futuristicFonts.includes(key)) {
        category = 'Futuristic';
      } else if (minimalFonts.includes(key) && index % 3 === 0) {
        category = 'Minimal';
      } else if (modernFonts.includes(key) && index % 4 === 0) {
        category = 'Modern';
      } else if (decorativeFonts.includes(key)) {
        category = 'Decorative';
      }

      const isPopular = popularFonts.includes(key) || index < 100;
      const isTrending = !isPopular && (index % 7 === 0 || key.startsWith('A') || key.startsWith('S') || key.startsWith('P'));
      const variants = Object.keys(f.variants || {});
      
      return {
        name: key,
        category: category,
        popular: isPopular,
        trending: isTrending,
        variants: variants,
      };
    });

    console.log(`Processed ${fonts.length} fonts. Writing to src/data/google-fonts.json...`);
    
    if (!fs.existsSync('src/data')) {
      fs.mkdirSync('src/data', { recursive: true });
    }
    
    fs.writeFileSync('src/data/google-fonts.json', JSON.stringify(fonts, null, 2));
    console.log('Success!');
  } catch (e) {
    console.error('Error fetching font data:', e.message);
  }
}

function formatCategory(cat) {
  const c = cat.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (c.includes('sans')) return 'Sans Serif';
  if (c.includes('serif')) return 'Serif';
  if (c.includes('mono')) return 'Monospace';
  if (c.includes('hand') || c.includes('write')) return 'Handwriting';
  if (c.includes('display')) return 'Display';
  if (c.includes('script')) return 'Script';
  return 'Sans Serif';
}

main();
