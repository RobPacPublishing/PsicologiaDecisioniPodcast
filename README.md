# Psicologia delle Decisioni Quotidiane - Podcast Manager

Un tool per la gestione e creazione automatizzata di episodi del podcast "Psicologia delle Decisioni Quotidiane".

## Struttura del Progetto

```
PsicologiaDecisioniPodcast/
├── content/                 # Contenuti del podcast
│   ├── episodes/            # Script e metadati degli episodi
│   └── templates/           # Template per la generazione di nuovi contenuti
├── assets/                  # Asset multimediali 
│   ├── jingles/             # Jingle e transizioni audio
│   ├── music/               # Musica di sottofondo
│   ├── images/              # Copertine e immagini
│   └── voices/              # Sample di voci
├── src/                     # Codice sorgente dell'applicazione
│   ├── css/                 # Fogli di stile
│   ├── js/                  # Script JavaScript
│   └── lib/                 # Librerie esterne
└── exports/                 # Directory per i file esportati
```

## Installazione

1. Clona il repository:
   ```bash
   git clone https://github.com/RobPacPublishing/PsicologiaDecisioniPodcast.git
   ```

2. Apri il file `index.html` in un browser moderno.

## Utilizzo

Il tool offre diverse funzionalità:

### Gestione Episodi

- Visualizzazione dell'elenco degli episodi disponibili
- Ricerca per titolo o contenuto
- Anteprima del contenuto degli episodi
- Esportazione in diversi formati (solo audio, script, pacchetto completo)

### Gestione Asset

- Organizzazione di jingle, musica di sottofondo, immagini e voci
- Anteprima degli asset audio
- Associazione degli asset agli episodi

### Calendario Pubblicazioni

- Pianificazione delle date di pubblicazione
- Visualizzazione del piano editoriale
- Promemoria per le pubblicazioni programmate

### Esportazione

- Esportazione di singoli episodi o pacchetti completi
- Supporto per diversi formati di output
- Integrazione con piattaforme di hosting podcast (es. Anchor/Spotify)

## Workflow di Utilizzo

1. **Accesso al Tool**: Apri `index.html` nel tuo browser
2. **Sfoglia Episodi**: Visualizza l'elenco degli episodi disponibili
3. **Seleziona un Episodio**: Clicca sul pulsante "Visualizza" di un episodio
4. **Anteprima**: Esplora lo script, audio e metadati dell'episodio
5. **Personalizza (opzionale)**: Modifica dettagli se necessario
6. **Esporta**: Scegli il formato di esportazione desiderato
7. **Pubblica**: Carica su Anchor/Spotify o esporta i file

## Dettagli Tecnici

- Framework: JavaScript vanilla (nessun framework esterno)
- Storage: File system locale per contenuti, Firebase per backup (opzionale)
- Audio: Integrazione con API di sintesi vocale di terze parti
- Hosting: Vercel per la versione web (opzionale)

## Requisiti

- Browser web moderno (Chrome, Firefox, Safari, Edge)
- Connessione internet per alcune funzionalità (es. sintesi vocale)
- Almeno 2GB di spazio su disco per i contenuti completi

## Link Utili

- [Suno AI](https://suno.ai) - Per la generazione di musica di sottofondo
- [GitHub Repository](https://github.com/RobPacPublishing/PsicologiaDecisioniPodcast)
- [Vercel Dashboard](https://vercel.com) - Per il deployment (opzionale)

## Nota per lo Sviluppo

Questo progetto è in fase di sviluppo attivo. Alcune funzionalità potrebbero essere in implementazione o soggette a modifiche.