const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const basePath = path.resolve(__dirname);
const episodesDir = path.join(basePath, 'content', 'episodes');

if (!fs.existsSync(episodesDir)){
    fs.mkdirSync(episodesDir, { recursive: true });
}

app.use(cors());
app.use('/media', express.static(path.join(basePath, 'content')));

app.get('/api/episodes', (req, res) => {
  const episodes = [];
  fs.readdirSync(episodesDir).forEach(dir => {
    const episodePath = path.join(episodesDir, dir);
    const metadataPath = path.join(episodePath, 'metadata.json');
    const scriptPath = path.join(episodePath, 'script.txt');
    const files = fs.readdirSync(episodePath);

    if (fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      const script = fs.existsSync(scriptPath) ? fs.readFileSync(scriptPath, 'utf8') : '';
      const audioFile = files.find(f => f.endsWith('.mp3')) || null;

      episodes.push({
        id: dir,
        metadata,
        script,
        audio: audioFile ? `/media/episodes/${dir}/${audioFile}` : null
      });
    }
  });

  res.json(episodes);
});

app.listen(PORT, () => {
  console.log(`🚀 Server avviato su http://localhost:${PORT}`);
});
