document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
        // Redirecionar para a página principal ou dashboard
        window.location.href = 'pagina-inicial.html';
    } else {
        alert('Email ou senha incorretos.');
    }
});
