# 🛒 Lista de Compras Dinâmica

Um aplicativo web interativo para gerenciar sua lista de compras com persistência de dados usando Local Storage do navegador.

## ✨ Funcionalidades

- ✅ **Adicionar itens** - Digite um item e clique em "Adicionar" ou pressione Enter
- ✅ **Marcar como comprado** - Clique em "Comprar" para marcar/desmarcar um item como concluído
- ✅ **Remover itens** - Remova itens individuais com o botão "Remover"
- ✅ **Limpar tudo** - Limpe toda a lista de uma vez
- ✅ **Ordenação flexível** - Escolha como exibir os itens:
  - Data de Adição (Mais recentes)
  - Data de Adição (Mais antigos)
  - Alfabética (A-Z)
  - Alfabética (Z-A)
  - Comprados por Último
  - Não Comprados Primeiro
- ✅ **Quantidade e unidade** - Escolha quantos e em que medida comprar (unidades, gramas, kilos, litros, etc.)
- ✅ **Contador dinâmico** - Veja o total de itens e quantos já foram comprados
- ✅ **Local Storage** - Seus itens e preferências são salvos automaticamente e persistem entre sessões
- ✅ **Prevenção de duplicatas** - Evita adicionar o mesmo item duas vezes
- ✅ **Design responsivo** - Funciona perfeitamente em dispositivos móveis

## 📁 Arquivos

- `index.html` - Estrutura HTML da aplicação
- `style.css` - Estilos e design responsivo
- `script.js` - Lógica JavaScript e gerenciamento do Local Storage

## 🎨 Interface em 3 Seções

O aplicativo agora está organizado em 3 seções principais:

### ➕ **Adicionar Itens**
- Campo de entrada para adicionar novos itens
- Seletor de ordenação para escolher como exibir os itens
- Opções de ordenação flexíveis

### 🛒 **Compras**
- Lista de itens pendentes a comprar
- Contador de itens não comprados
- Botões para marcar como comprado ou remover

### ✓ **Comprados**
- Lista de itens já comprados
- Contador de itens comprados
- Botões para desfazer (marcar como não comprado) ou remover

### 🧹 **Ações Gerais**
- Botão para limpar toda a lista
- Contador total com estatísticas detalhadas

## � Como usar

1. Abra o arquivo `index.html` em um navegador web
2. Digite o item que deseja adicionar no campo de entrada (seção **Adicionar Itens**)
3. Clique em "Adicionar" ou pressione Enter
4. O item aparecerá automaticamente na seção **Compras**
5. Use o seletor "Ordenar por:" para reorganizar os itens conforme desejado
6. Ao adicionar mais itens, use os botões da seção **Compras**:
   - **✓ Comprar**: Move o item para a seção **Comprados**
   - **Remover**: Delete o item da lista
7. Na seção **Comprados**, use:
   - **↺ Desfazer**: Move o item de volta para **Compras**
   - **Remover**: Delete o item da lista
8. Use **Limpar Tudo** para remover todos os itens de uma vez

## �💾 Local Storage

Os dados são salvos automaticamente no Local Storage do navegador:
- **Chave de itens**: `shoppingList` - armazena o array de itens
- **Chave de preferência**: `shoppingListSort` - armazena a preferência de ordenação

Isso significa que:
- Sua lista e preferências serão recuperadas ao recarregar a página
- Os dados persistem entre sessões do navegador
- Se você limpar o histórico e cache, os dados serão perdidos

## 🎨 Tecnologias utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com gradientes e animações
- **JavaScript Vanilla** - Sem dependências externas
- **Local Storage API** - Para persistência de dados

## 📱 Características de Design

- Interface moderna e intuitiva
- Animações suaves
- Gradiente de cores atraente (roxo ao rosa)
- Totalmente responsivo (desktop, tablet, mobile)
- Feedback visual para todas as ações do usuário

## 🔒 Segurança

O aplicativo implementa proteção contra injeção de código HTML, escapando caracteres especiais dos itens adicionados. As funções de ordenação são seguras e não afetam a integridade dos dados.

---

Desenvolvido com ❤️ em HTML, CSS e JavaScript puro!