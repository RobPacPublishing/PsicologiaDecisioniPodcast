// Auth-check.js - Verifica dello stato di autenticazione
// Da includere in tutte le pagine protette (es. index.html)

document.addEventListener('DOMContentLoaded', function() {
    // Authentication instance
    const auth = firebase.auth();
    
    // Controlla se l'utente è autenticato
    auth.onAuthStateChanged(function(user) {
        if (!user) {
            // L'utente non è autenticato, reindirizza alla pagina di login
            window.location.href = 'login.html';
        } else {
            // L'utente è autenticato, mostra il contenuto
            document.querySelector('.container').style.display = 'block';
            
            // Aggiunge il pulsante di logout nella navbar
            const nav = document.querySelector('nav ul');
            if (nav) {
                const logoutItem = document.createElement('li');
                logoutItem.innerHTML = '<a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>';
                nav.appendChild(logoutItem);
                
                // Aggiunge l'event listener per il logout
                document.getElementById('logout-btn').addEventListener('click', function(e) {
                    e.preventDefault();
                    auth.signOut().then(function() {
                        window.location.href = 'login.html';
                    }).catch(function(error) {
                        console.error('Errore durante il logout:', error);
                    });
                });
            }
        }
    });
});