export default async function handler(req, res) {
  const baseUrl = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;
  const episodes = [];

  for (let i = 1; i <= 10; i++) {
    try {
      const metaRes = await fetch(`${baseUrl}/episodes/${i}/metadata.json`);
      const metadata = await metaRes.json();

      const scriptRes = await fetch(`${baseUrl}/episodes/${i}/script.txt`);
      const script = await scriptRes.text();

      const audio = `${baseUrl}/episodes/${i}/audio.mp3`;

      episodes.push({
        id: `${i}`,
        metadata,
        script,
        audio
      });
    } catch (err) {
      episodes.push({
        id: `${i}`,
        metadata: {
          titolo: `Episodio ${i} (Titolo mancante)`,
          descrizione_breve: 'Dati non ancora disponibili'
        },
        script: '',
        audio: null
      });
    }
  }

  res.status(200).json(episodes);
}
