// Elementos do DOM
// Aqui buscamos os elementos HTML que vamos usar no JavaScript.
const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');
const itemCount = document.getElementById('itemCount');
const quantityInput = document.getElementById('quantityInput');
const unitSelect = document.getElementById('unitSelect');
const sortSelect = document.getElementById('sortSelect');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');
const noPendingMessage = document.getElementById('noPendingMessage');
const noCompletedMessage = document.getElementById('noCompletedMessage');

// Chaves do Local Storage
// Usamos essas chaves para salvar e recuperar dados no navegador.
const STORAGE_KEY = 'shoppingList';
const SORT_KEY = 'shoppingListSort';

// Estado da aplicação
// "items" guarda todos os itens da lista, e "sortOrder" guarda a forma de ordenação escolhida.
let items = [];
let sortOrder = 'date-asc';

// Inicializa a aplicação
// Essa função é chamada quando a página carrega.
function init() {
    loadFromStorage();        // Tenta recuperar a lista salva
    loadSortPreference();     // Tenta recuperar a ordenação salva
    renderList();             // Mostra a lista na tela
    setupEventListeners();    // Cria os ouvintes de clique/teclado
}

// Carrega os dados do Local Storage
function loadFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        // Converte o JSON em um array de objetos
        items = JSON.parse(stored);
    }
}

// Carrega a preferência de ordenação do Local Storage
function loadSortPreference() {
    const stored = localStorage.getItem(SORT_KEY);
    if (stored) {
        sortOrder = stored;
        sortSelect.value = sortOrder;
    }
}

// Salva os dados no Local Storage
function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Salva a preferência de ordenação
function saveSortPreference() {
    localStorage.setItem(SORT_KEY, sortOrder);
}

// Configura os ouvintes de eventos
function setupEventListeners() {
    addBtn.addEventListener('click', addItem);
    clearBtn.addEventListener('click', clearAllItems);
    sortSelect.addEventListener('change', handleSortChange);

    // Permite adicionar o item pressionando Enter no input.
    itemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    });
}

// Adiciona um novo item à lista
function addItem() {
    const text = itemInput.value.trim();
    const quantity = Number(quantityInput.value);
    const unit = unitSelect.value;

    if (text === '') {
        alert('Por favor, digite um item!');
        return;
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
        alert('Por favor, informe uma quantidade válida (1 ou mais).');
        quantityInput.focus();
        return;
    }

    // Evita duplicar itens iguais com a mesma unidade
    if (items.some(item => item.text.toLowerCase() === text.toLowerCase() && item.unit === unit)) {
        alert('Este item com a unidade selecionada já existe na lista!');
        return;
    }

    // Cria um novo item com quantidade e unidade
    const newItem = {
        id: Date.now(),      // id único
        text: text,          // texto do item
        quantity: quantity,  // quantos serão comprados
        unit: unit,          // unidade escolhida
        completed: false     // status inicial: não comprado
    };

    items.push(newItem);    // adiciona ao array
    saveToStorage();        // salva no navegador
    renderList();           // atualiza a interface
    itemInput.value = '';   // limpa o campo
    quantityInput.value = 1;
    unitSelect.value = 'unidades';
    itemInput.focus();      // mantém o foco para novo item
}

// Manipula mudança de ordenação
function handleSortChange(event) {
    sortOrder = event.target.value;
    saveSortPreference();   // guarda a escolha do usuário
    renderList();           // atualiza a lista ordenada
}

// Ordena os itens de acordo com a preferência
function getSortedItems(itemsToSort = items) {
    let sorted = [...itemsToSort];

    switch (sortOrder) {
        case 'alpha-asc':
            sorted.sort((a, b) => a.text.localeCompare(b.text, 'pt-BR'));
            break;
        case 'alpha-desc':
            sorted.sort((a, b) => b.text.localeCompare(a.text, 'pt-BR'));
            break;
        case 'date-desc':
            sorted.sort((a, b) => b.id - a.id);
            break;
        case 'completed-last':
            sorted.sort((a, b) => a.completed - b.completed);
            break;
        case 'completed-first':
            sorted.sort((a, b) => b.completed - a.completed);
            break;
        case 'date-asc':
        default:
            sorted.sort((a, b) => a.id - b.id);
            break;
    }

    return sorted;
}

// Remove um item da lista
function removeItem(id) {
    items = items.filter(item => item.id !== id);
    saveToStorage();
    renderList();
}

// Alterna o status de conclusão de um item (comprado / não comprado)
function toggleCompleted(id) {
    const item = items.find(item => item.id === id);
    if (item) {
        item.completed = !item.completed;
        saveToStorage();
        renderList();
    }
}

// Limpa todos os itens
function clearAllItems() {
    if (items.length === 0) {
        alert('A lista já está vazia!');
        return;
    }

    if (confirm('Tem certeza que deseja limpar toda a lista?')) {
        items = [];
        saveToStorage();
        renderList();
    }
}

// Renderiza a lista na tela
function renderList() {
    // Separa itens em pendentes e comprados
    const pending = items.filter(item => !item.completed);
    const completed = items.filter(item => item.completed);

    renderPendingItems(pending);    // mostra itens que ainda não foram comprados
    renderCompletedItems(completed); // mostra itens que já foram comprados

    updateItemCount();              // atualiza o contador geral
}

// Renderiza itens não comprados
function renderPendingItems(itemsToRender) {
    pendingList.innerHTML = '';

    if (itemsToRender.length === 0) {
        noPendingMessage.classList.add('show');
        pendingCount.textContent = '0';
        return;
    }

    noPendingMessage.classList.remove('show');
    pendingCount.textContent = itemsToRender.length;

    const sortedItems = getSortedItems(itemsToRender);

    sortedItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <span class="item-text">${escapeHtml(item.text)}</span>
                <span class="item-meta">${item.quantity} ${escapeHtml(item.unit)}</span>
            </div>
            <div class="item-actions">
                <button class="btn-toggle" 
                        onclick="toggleCompleted(${item.id})"
                        title="Marcar como comprado">
                    ✓ Comprar
                </button>
                <button class="btn-remove" 
                        onclick="removeItem(${item.id})"
                        title="Remover item">
                    Remover
                </button>
            </div>
        `;

        pendingList.appendChild(li);
    });
}

// Renderiza itens comprados
function renderCompletedItems(itemsToRender) {
    completedList.innerHTML = '';

    if (itemsToRender.length === 0) {
        noCompletedMessage.classList.add('show');
        completedCount.textContent = '0';
        return;
    }

    noCompletedMessage.classList.remove('show');
    completedCount.textContent = itemsToRender.length;

    const sortedItems = getSortedItems(itemsToRender);

    sortedItems.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('completed');
        li.innerHTML = `
            <div>
                <span class="item-text">${escapeHtml(item.text)}</span>
                <span class="item-meta">${item.quantity} ${escapeHtml(item.unit)}</span>
            </div>
            <div class="item-actions">
                <button class="btn-toggle completed" 
                        onclick="toggleCompleted(${item.id})"
                        title="Marcar como não comprado">
                    ↺ Desfazer
                </button>
                <button class="btn-remove" 
                        onclick="removeItem(${item.id})"
                        title="Remover item">
                    Remover
                </button>
            </div>
        `;

        completedList.appendChild(li);
    });
}

// Atualiza o contador de itens
function updateItemCount() {
    const total = items.length;
    const completed = items.filter(item => item.completed).length;
    const pending = total - completed;

    clearBtn.disabled = total === 0;
    itemCount.textContent = `${total} item${total !== 1 ? 's' : ''} no total (${pending} pendente${pending !== 1 ? 's' : ''}, ${completed} comprado${completed !== 1 ? 's' : ''})`;
}

// Escapa caracteres HTML para evitar injeção de código
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Inicia a aplicação quando o DOM está carregado
document.addEventListener('DOMContentLoaded', init);
