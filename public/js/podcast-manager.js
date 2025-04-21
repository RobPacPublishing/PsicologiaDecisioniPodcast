// Podcast Manager - Handles content loading and processing
class PodcastManager {
    constructor() {
        this.episodes = [];
        this.assets = {
            jingles: [],
            music: [],
            images: [],
            voices: []
        };
        this.scheduledEpisodes = [];
        
        // Initialize by loading configuration and content
        this.init();
    }
    
    // Initialize the podcast manager
    async init() {
        try {
            // Load configuration
            const config = await this.loadJSON('config.json');
            this.config = config;
            
            // Load episode index
            await this.loadEpisodes();
            
            // Load assets index
            await this.loadAssets();
            
            // Load scheduled episodes
            await this.loadSchedule();
            
            console.log('Podcast Manager initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Podcast Manager:', error);
        }
    }
    
    // Load episodes from content directory
    async loadEpisodes() {
        try {
            // In a real implementation, this would scan the episodes directory
            // For now, we'll explicitly load all known episodes
            this.episodes = [
                {
                    number: "01",
                    title: "L'Euristica della Disponibilità",
                    subtitle: "Perché temiamo squali più degli incidenti domestici",
                    path: "content/episodes/episode-01"
                },
                {
                    number: "02",
                    title: "L'Effetto Ancoraggio",
                    subtitle: "Come un numero casuale determina quanto spendi",
                    path: "content/episodes/episode-02"
                },
                {
                    number: "03",
                    title: "Il Bias di Conferma",
                    subtitle: "L'arte di vedere solo ciò che vogliamo vedere",
                    path: "content/episodes/episode-03"
                },
                {
                    number: "04",
                    title: "L'Avversione alla Perdita",
                    subtitle: "Perché odiamo perdere più di quanto amiamo vincere",
                    path: "content/episodes/episode-04"
                },
                {
                    number: "05",
                    title: "L'Effetto Dunning-Kruger",
                    subtitle: "Quando non sappiamo di non sapere",
                    path: "content/episodes/episode-05"
                }
            ];
            
            // Try to load metadata for each episode to verify it exists
            for (const episode of this.episodes) {
                try {
                    const metadata = await this.loadJSON(`${episode.path}/metadata.json`);
                    // Update title and subtitle from metadata if available
                    if (metadata) {
                        episode.title = metadata.title || episode.title;
                        episode.subtitle = metadata.short_description || episode.subtitle;
                    }
                } catch (error) {
                    console.warn(`Could not load metadata for episode ${episode.number}:`, error);
                }
            }
            
            console.log(`Loaded ${this.episodes.length} episodes`);
        } catch (error) {
            console.error('Failed to load episodes:', error);
        }
    }
    
    // Load assets from assets directory
    async loadAssets() {
        try {
            // In a real implementation, this would scan the assets directories
            // For now, we'll just load a few hardcoded assets
            this.assets = {
                jingles: [
                    {
                        name: "Intro Theme",
                        description: "20 secondi - Apertura",
                        path: "assets/jingles/intro.mp3"
                    },
                    {
                        name: "Outro Theme",
                        description: "20 secondi - Chiusura",
                        path: "assets/jingles/outro.mp3"
                    },
                    {
                        name: "Transition",
                        description: "5 secondi - Transizione tra sezioni",
                        path: "assets/jingles/transition.mp3"
                    }
                ],
                music: [
                    {
                        name: "Science Background",
                        description: "Sottofondo per sezione scientifica",
                        path: "assets/music/science_bg.mp3"
                    },
                    {
                        name: "Examples Background",
                        description: "Sottofondo per esempi pratici",
                        path: "assets/music/examples_bg.mp3"
                    },
                    {
                        name: "Strategies Background",
                        description: "Sottofondo per strategie pratiche",
                        path: "assets/music/strategies_bg.mp3"
                    }
                ],
                images: [
                    {
                        name: "Podcast Cover",
                        description: "Immagine principale del podcast",
                        path: "assets/images/podcast_cover.jpg"
                    },
                    {
                        name: "Episode 01 Cover",
                        description: "Euristica della Disponibilità",
                        path: "assets/images/episode01_cover.jpg"
                    }
                ],
                voices: [
                    {
                        name: "Rob Pac",
                        description: "Voce maschile profonda - Host",
                        path: "assets/voices/rob_pac.mp3"
                    }
                ]
            };
            
            console.log('Assets loaded successfully');
        } catch (error) {
            console.error('Failed to load assets:', error);
        }
    }
    
    // Load scheduled episodes
    async loadSchedule() {
        try {
            // In a real implementation, this would load from a schedule file
            // For now, we'll just use a hardcoded schedule
            this.scheduledEpisodes = [
                {
                    episodeNumber: "01",
                    date: new Date(2025, 3, 15) // April 15, 2025
                },
                {
                    episodeNumber: "02",
                    date: new Date(2025, 3, 22) // April 22, 2025
                },
                {
                    episodeNumber: "03",
                    date: new Date(2025, 3, 29) // April 29, 2025
                }
            ];
            
            console.log(`Loaded ${this.scheduledEpisodes.length} scheduled episodes`);
        } catch (error) {
            console.error('Failed to load schedule:', error);
        }
    }
    
    // Get episode by number
    async getEpisode(number) {
        const episode = this.episodes.find(ep => ep.number === number);
        
        if (!episode) {
            throw new Error(`Episode ${number} not found`);
        }
        
        try {
            // In a real implementation, this would load the episode files
            const metadata = await this.loadJSON(`${episode.path}/metadata.json`);
            const script = await this.loadTextFile(`${episode.path}/script.txt`);
            
            return {
                ...episode,
                metadata,
                script
            };
        } catch (error) {
            console.error(`Failed to load episode ${number}:`, error);
            throw error;
        }
    }
    
    // Schedule an episode
    scheduleEpisode(episodeNumber, date) {
        // Check if episode exists
        const episode = this.episodes.find(ep => ep.number === episodeNumber);
        
        if (!episode) {
            throw new Error(`Episode ${episodeNumber} not found`);
        }
        
        // Check if date is valid
        if (!(date instanceof Date) || isNaN(date)) {
            throw new Error('Invalid date');
        }
        
        // Add to schedule
        this.scheduledEpisodes.push({
            episodeNumber,
            date
        });
        
        // In a real implementation, you would save the schedule to a file
        console.log(`Scheduled episode ${episodeNumber} for ${date.toDateString()}`);
        
        return true;
    }
    
    // Export episode to specified format
    async exportEpisode(episodeNumber, format) {
        try {
            const episode = await this.getEpisode(episodeNumber);
            
            switch (format) {
                case 'audio':
                    // In a real implementation, this would export just the audio file
                    console.log(`Exporting audio for episode ${episodeNumber}`);
                    return {
                        success: true,
                        message: `Audio for episode ${episodeNumber} exported successfully`,
                        path: `exports/audio/episode_${episodeNumber}.mp3`
                    };
                
                case 'script':
                    // In a real implementation, this would export just the script
                    console.log(`Exporting script for episode ${episodeNumber}`);
                    return {
                        success: true,
                        message: `Script for episode ${episodeNumber} exported successfully`,
                        path: `exports/scripts/episode_${episodeNumber}.txt`
                    };
                
                case 'complete':
                    // In a real implementation, this would export a package with all files
                    console.log(`Exporting complete package for episode ${episodeNumber}`);
                    return {
                        success: true,
                        message: `Complete package for episode ${episodeNumber} exported successfully`,
                        path: `exports/complete/episode_${episodeNumber}.zip`
                    };
                
                default:
                    throw new Error(`Unknown export format: ${format}`);
            }
        } catch (error) {
            console.error(`Failed to export episode ${episodeNumber}:`, error);
            return {
                success: false,
                message: `Failed to export episode ${episodeNumber}: ${error.message}`
            };
        }
    }
    
    // Helper method to load JSON files
    async loadJSON(path) {
        // In a real implementation, this would load a JSON file from the specified path
        // For demonstration purposes, let's return mock data based on the path
        
        if (path.includes('metadata.json')) {
            // This is a fallback for testing - in reality we would load the actual file
            if (path.includes('episode-01')) {
                return {
                    title: "L'Euristica della Disponibilità",
                    description: "Perché temiamo squali più degli incidenti domestici",
                    duration: "15:00",
                    publishDate: "2025-04-15",
                    tags: ["bias cognitivi", "psicologia", "decisioni"]
                };
            } else if (path.includes('episode-02')) {
                return {
                    title: "L'Effetto Ancoraggio",
                    description: "Come un numero casuale determina quanto spendi",
                    duration: "15:30",
                    publishDate: "2025-04-22",
                    tags: ["bias cognitivi", "psicologia", "decisioni economiche"]
                };
            } else if (path.includes('episode-03')) {
                return {
                    title: "Il Bias di Conferma",
                    description: "L'arte di vedere solo ciò che vogliamo vedere",
                    duration: "16:30",
                    publishDate: "2025-04-29",
                    tags: ["bias cognitivi", "psicologia", "pensiero critico"]
                };
            } else if (path.includes('episode-04')) {
                return {
                    title: "L'Avversione alla Perdita",
                    description: "Perché odiamo perdere più di quanto amiamo vincere",
                    duration: "17:30",
                    publishDate: "2025-05-06",
                    tags: ["bias cognitivi", "psicologia", "decisioni economiche"]
                };
            } else if (path.includes('episode-05')) {
                return {
                    title: "L'Effetto Dunning-Kruger",
                    description: "Quando non sappiamo di non sapere",
                    duration: "18:00",
                    publishDate: "2025-05-13",
                    tags: ["bias cognitivi", "psicologia", "metacognizione"]
                };
            }
            
            // Default fallback
            return {
                title: "Episodio del Podcast",
                description: "Descrizione dell'episodio",
                duration: "15:00",
                publishDate: "",
                tags: ["podcast", "psicologia"]
            };
        }
        
        if (path === 'config.json') {
            return {
                podcastName: "Psicologia delle Decisioni Quotidiane",
                podcastSubtitle: "Come Pensiamo Senza Pensare",
                host: "Rob Pac",
                outputDirectory: "exports",