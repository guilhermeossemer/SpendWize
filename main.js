let totalDespesas = 0;
let totalAPagar = 0; // Adicionando variável para total a pagar
let salario = 0;
let despesas = [];

// Referências aos elementos do modal de despesas
const showExpenseModalBtn = document.getElementById('show-expense-form-btn');
const expenseModal = document.getElementById('expense-modal');
const closeExpenseModalBtn = document.getElementById('close-expense-modal');
const saveExpenseBtn = document.getElementById('save-expense-btn');

// Referências aos elementos do modal de salário
const salaryModal = document.getElementById('salary-modal');
const closeSalaryModalBtn = document.getElementById('close-salary-modal');
const showSalaryModalBtn = document.getElementById('show-salary-form-btn');
const saveSalaryBtn = document.getElementById('save-salary-btn');

// Exibe o modal de despesas
showExpenseModalBtn.addEventListener('click', function () {
    expenseModal.style.display = 'block';
});

// Fecha o modal de despesas
closeExpenseModalBtn.addEventListener('click', function () {
    expenseModal.style.display = 'none';
});

// Fecha o modal de despesas ao clicar fora
window.addEventListener('click', function (event) {
    if (event.target === expenseModal) {
        expenseModal.style.display = 'none';
    }
});

// Exibe o modal de salário
showSalaryModalBtn.addEventListener('click', function () {
    salaryModal.style.display = 'block';
});

// Fecha o modal de salário
closeSalaryModalBtn.addEventListener('click', function () {
    salaryModal.style.display = 'none';
});

// Fecha o modal de salário ao clicar fora
window.addEventListener('click', function (event) {
    if (event.target === salaryModal) {
        salaryModal.style.display = 'none';
    }
});

// Salva a despesa
saveExpenseBtn.addEventListener('click', function () {
    const descricao = document.getElementById('expense-desc').value;
    const valor = parseFloat(document.getElementById('expense-value').value) || 0;

    if (descricao && valor > 0) {
        const despesa = { descricao, valor, pago: false }; // Adicionando campo 'pago'
        despesas.push(despesa); // Adiciona a despesa ao array

        // Criação dos elementos da despesa
        const li = criarElementoDespesa(despesa);

        // Adicionar todos os elementos à lista
        document.getElementById('expense-list').appendChild(li);

        // Atualizar total de despesas
        totalDespesas += valor;
        document.getElementById('total-despesas').textContent = `R$ ${totalDespesas.toFixed(2)}`;

        // Atualizar total a pagar
        totalAPagar += valor; // Iniciar com o total de todas as despesas
        atualizarTotalAPagar();

        // Atualiza o saldo logo após adicionar a despesa
        atualizarSaldo();

        // Limpar campos
        document.getElementById('expense-desc').value = '';
        document.getElementById('expense-value').value = '';

        // Fechar o modal após salvar a despesa
        expenseModal.style.display = 'none';

        // Adicionar despesa no modal
        adicionarDespesaNoModal(despesa);
    } else {
        alert('Por favor, preencha a descrição e o valor da despesa.');
    }
});

// Função para criar elementos da despesa
function criarElementoDespesa(despesa) {
    const li = document.createElement('li');
    li.classList.add('expense-item');

    const descricaoSpan = document.createElement('span');
    descricaoSpan.textContent = despesa.descricao;

    const valorSpan = document.createElement('span');
    valorSpan.textContent = `R$ ${despesa.valor.toFixed(2)}`;
    valorSpan.classList.add('value');

    // Adicionar o botão "Pago" ao lado da despesa
    const pagoLabel = document.createElement('label');
    pagoLabel.className = "switch";
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const slider = document.createElement('div');
    slider.className = "slider round";

    pagoLabel.appendChild(checkbox);
    pagoLabel.appendChild(slider);

    // Evento para marcar a despesa como paga
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            totalAPagar -= despesa.valor;
            despesa.pago = true; // Atualiza o estado da despesa para paga
        } else {
            totalAPagar += despesa.valor;
            despesa.pago = false; // Atualiza o estado da despesa para não paga
        }
        atualizarTotalAPagar();
    });

    // Adicionar todos os elementos à lista
    li.appendChild(descricaoSpan);
    li.appendChild(valorSpan);
    li.appendChild(pagoLabel);

    return li;
}

// Função para adicionar despesas na lista do modal
function adicionarDespesaNoModal(despesa) {
    const modalLi = document.createElement('li');
    modalLi.classList.add('expense-item');

    const descricaoSpan = document.createElement('span');
    descricaoSpan.textContent = despesa.descricao;

    const valorSpan = document.createElement('span');
    valorSpan.textContent = `R$ ${despesa.valor.toFixed(2)}`;
    valorSpan.classList.add('value');

    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa-regular', 'fa-trash-can', 'delete-icon');

    // Remover despesa ao clicar no ícone de lixeira no modal
    trashIcon.addEventListener('click', function () {
        modalLi.remove(); // Remove do modal

        // Atualiza a lista de despesas
        despesas = despesas.filter(d => d.descricao !== despesa.descricao || d.valor !== despesa.valor);

        // Atualizar lista principal
        atualizarListaPrincipal();

        // Atualizar total de despesas
        totalDespesas -= despesa.valor;
        document.getElementById('total-despesas').textContent = `R$ ${totalDespesas.toFixed(2)}`;

        // Atualiza o total a pagar, apenas se a despesa não estava paga
        if (!despesa.pago) { // Verifica se a despesa não estava paga
            totalAPagar -= despesa.valor;
        }
        atualizarTotalAPagar(); // Atualiza o total a pagar

        atualizarSaldo();
    });

    modalLi.appendChild(descricaoSpan);
    modalLi.appendChild(valorSpan);
    modalLi.appendChild(trashIcon);
    document.getElementById('expense-list-modal').appendChild(modalLi);
}

// Atualiza o total a pagar
function atualizarTotalAPagar() {
    document.getElementById('total-a-pagar').textContent = `R$ ${totalAPagar.toFixed(2)}`;
}

// Atualiza o saldo
function atualizarSaldo() {
    const saldo = salario - totalAPagar; // Usando totalAPagar para o cálculo do saldo
    document.getElementById('saldo').textContent = `R$ ${saldo.toFixed(2)}`;
}

// Salva o salário
saveSalaryBtn.addEventListener('click', function () {
    const valorSalario = parseFloat(document.getElementById('salary-value').value) || 0;
    if (valorSalario > 0) {
        salario = valorSalario;
        document.querySelector('.salary-value').textContent = `R$ ${salario.toFixed(2)}`;
        salaryModal.style.display = 'none';
        document.getElementById('salary-value').value = '';
        atualizarSaldo(); // Atualiza o saldo após salvar o salário
    } else {
        alert('Por favor, preencha um valor válido para o salário.');
    }
});

// Função para atualizar a lista principal de despesas
function atualizarListaPrincipal() {
    // Limpar a lista principal
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    // Recriar a lista com base no array de despesas
    despesas.forEach(d => {
        const li = criarElementoDespesa(d); // Use a função que cria elementos com checkbox
        expenseList.appendChild(li);
    });
}

// Atualiza o total de despesas
function atualizarTotalDespesas() {
    totalDespesas = despesas.reduce((acc, d) => acc + d.valor, 0);
    document.getElementById('total-despesas').textContent = `R$ ${totalDespesas.toFixed(2)}`;
}
