// server.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); // or global fetch on newer Node
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const GOOGLE_KEY = "AIzaSyC1BYzMy6sTI99zf-3E-IBOxX6aM4q1XZ8";
const GOOGLE_CX  = process.env.GOOGLE_CX;

if(!GOOGLE_KEY || !GOOGLE_CX) {
  console.warn('Set GOOGLE_API_KEY and GOOGLE_CX in .env');
}

app.post('/api/search', async (req, res) => {
  try {
    const q = (req.body && req.body.query) ? String(req.body.query) : '';
    if(!q) return res.status(400).json({ error: 'No query provided' });

    if(!GOOGLE_KEY || !GOOGLE_CX) {
      return res.status(500).json({ error: 'Search not configured on server' });
    }

    // Call Google Custom Search JSON API
    const url = new URL('https://www.googleapis.com/customsearch/v1');
    url.searchParams.set('key', GOOGLE_KEY);
    url.searchParams.set('cx', GOOGLE_CX);
    url.searchParams.set('q', q);
    url.searchParams.set('num', '3');

     // top 3 results

    const apiResp = await fetch(url.toString());
    if(!apiResp.ok) {
      const t = await apiResp.text();
      return res.status(502).json({ error: 'Search API error', detail: t });
    }
    const apiJson = await apiResp.json();
    const items = apiJson.items || [];

    // Build short answer: combine snippets
    let answer = '';
    if(items.length === 0) {
      answer = "Koi direct result nahi mila. Try different keywords.";
    } else {
      // Combine title + snippet of first result as the quick answer
      answer = items.map((it, idx) => {
        const snippet = it.snippet || '';
        return (idx===0 ? ('Top result: ' + (it.title || '') + ' — ' + snippet) : (it.title ? (it.title + ' — ' + snippet) : snippet));
      }).join('\\n\\n');
    }

    // Prepare sources to send to frontend (title, snippet, link)
    const sources = items.map(it => ({ title: it.title, snippet: it.snippet, link: it.link }));

    return res.json({ answer, sources });
  } catch (err) {
    console.error('search error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve static frontend if you want:
// app.use(express.static('public')); // place index.html in ./public

app.listen(PORT, () => console.log('Server listening on', PORT));


