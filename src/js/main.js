document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "/data/episodes.json";

    const episodesContainer = document.querySelector(".episodes-container");
    const modal = document.getElementById("episode-detail-modal");
    const modalContent = modal.querySelector(".episode-detail-container");
    const closeBtn = modal.querySelector(".close");

    fetch(API_URL)
        .then((res) => res.json())
        .then((episodes) => {
            episodesContainer.innerHTML = "";

            episodes.forEach((ep, index) => {
                const card = document.createElement("div");
                card.className = "episode-card";
                card.innerHTML = `
                    <div class="episode-number">${index + 1}</div>
                    <div class="episode-info">
                        <h3>${ep.metadata.title || "Episodio"}</h3>
                        <p>${ep.metadata.subtitle || ""}</p>
                    </div>
                    <div class="episode-actions">
                        <button class="view-btn"><i class="fas fa-eye"></i></button>
                    </div>
                `;

                card.querySelector(".view-btn").addEventListener("click", () => {
                    modalContent.innerHTML = `
                        <h3>${ep.metadata.title}</h3>
                        <p><strong>${ep.metadata.subtitle}</strong></p>
                        <pre style="white-space:pre-wrap;">${ep.script}</pre>
                        ${ep.audio ? `<audio controls src="${ep.audio}"></audio>` : ""}
                    `;
                    modal.style.display = "block";
                });

                episodesContainer.appendChild(card);
            });
        });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    document.querySelectorAll("nav a").forEach((navLink) => {
        navLink.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelectorAll("nav a").forEach((el) => el.classList.remove("active"));
            navLink.classList.add("active");

            const target = navLink.dataset.section;
            document.querySelectorAll("main section").forEach((section) => {
                section.style.display = section.id === target ? "block" : "none";
            });
        });
    });
});
