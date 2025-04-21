const fs = require('fs');
const path = require('path');

const episodesDir = path.join(__dirname, 'content', 'episodes');
const outputPath = path.join(__dirname, 'public', 'data', 'episodes.json');

if (!fs.existsSync(episodesDir)){
  fs.mkdirSync(episodesDir, { recursive: true });
}

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

if (!fs.existsSync(path.dirname(outputPath))) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(episodes, null, 2));
console.log("✅ File episodes.json generato correttamente in /public/data");
