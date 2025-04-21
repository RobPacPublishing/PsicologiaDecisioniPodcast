document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/episodes')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(episodes => {
            const episodesContainer = document.querySelector('.episodes-container');
            episodes.forEach(episode => {
                const episodeElement = document.createElement('div');
                episodeElement.classList.add('episode');
                episodeElement.innerHTML = `
                    <h3>${episode.metadata.title}</h3>
                    <p>${episode.metadata.description}</p>
                    <audio controls src="${episode.audio}"></audio>
                `;
                episodesContainer.appendChild(episodeElement);
            });
        })
        .catch(error => {
            document.querySelector('.episodes-container').innerHTML = `
                <p style="color:red;">Errore nel caricamento: Impossibile caricare gli episodi (${error.message})</p>
            `;
        });
});
