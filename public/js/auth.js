// Auth.js - Gestione dell'autenticazione
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const googleBtn = document.getElementById('google-login-btn');
    const loginError = document.getElementById('login-error');
    const loginLoader = document.getElementById('login-loader');
    
    // Authentication instance
    const auth = firebase.auth();
    
    // Controlla se l'utente è già autenticato
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // L'utente è già loggato, reindirizza alla pagina principale
            window.location.href = 'index.html';
        }
    });
    
    // Login click handler
    loginBtn.addEventListener('click', function() {
        // Mostra il loader e nascondi eventuali errori precedenti
        loginLoader.classList.add('show');
        loginError.classList.remove('show');
        loginError.textContent = '';
        
        // Prendi i valori inseriti
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Validazione base
        if (!email || !password) {
            showError('Per favore compila tutti i campi');
            return;
        }
        
        // Tenta il login
        auth.signInWithEmailAndPassword(email, password)
            .then(function(userCredential) {
                // Login completato con successo
                console.log('Login avvenuto con successo');
                window.location.href = 'index.html';
            })
            .catch(function(error) {
                // Gestisci gli errori di login
                let errorMessage;
                
                switch (error.code) {
                    case 'auth/invalid-email':
                        errorMessage = 'L\'indirizzo email non è valido.';
                        break;
                    case 'auth/user-disabled':
                        errorMessage = 'Questo account è stato disabilitato.';
                        break;
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        errorMessage = 'Email o password non corretti.';
                        break;
                    default:
                        errorMessage = 'Si è verificato un errore durante l\'accesso. Riprova più tardi.';
                }
                
                showError(errorMessage);
            });
    });
    
    // Google login handler
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            // Mostra il loader e nascondi eventuali errori precedenti
            loginLoader.classList.add('show');
            loginError.classList.remove('show');
            loginError.textContent = '';
            
            // Provider Google
            const provider = new firebase.auth.GoogleAuthProvider();
            
            // Tenta il login con Google
            auth.signInWithPopup(provider)
                .then(function(result) {
                    // Login completato con successo
                    console.log('Login Google avvenuto con successo');
                    window.location.href = 'index.html';
                })
                .catch(function(error) {
                    // Gestisci gli errori di login
                    console.error('Errore durante il login Google:', error);
                    showError('Si è verificato un errore durante l\'accesso con Google. Riprova più tardi.');
                });
        });
    }
    
    // Enter key press handler
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });
    
    // Funzione per mostrare gli errori
    function showError(message) {
        loginLoader.classList.remove('show');
        loginError.textContent = message;
        loginError.classList.add('show');
    }
});