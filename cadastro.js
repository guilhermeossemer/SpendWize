document.getElementById('cadastroForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('cadastroEmail').value;
    const password = document.getElementById('cadastroPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
    }

    // Verificar se o e-mail já está cadastrado
    if (localStorage.getItem('email') === email) {
        alert('Este e-mail já está cadastrado.');
        return;
    }

    // Armazenar no Local Storage
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    alert('Cadastro realizado com sucesso!');
    // Redirecionar para a página de login
    window.location.href = 'index.html';
});
