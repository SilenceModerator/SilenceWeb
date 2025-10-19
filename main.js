// Aguarda o documento HTML carregar antes de executar o script
document.addEventListener("DOMContentLoaded", () => {

    // Seleciona os elementos principais da página
    const messageList = document.getElementById("message-list");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const contactList = document.querySelector(".contact-list");
    const chatTitle = document.getElementById("chat-title");

    // --- Função para enviar mensagem ---
    function sendMessage() {
        const text = messageInput.value.trim(); // Pega o texto e remove espaços em branco

        if (text === "") {
            // Não faz nada se a mensagem estiver vazia
            return;
        }

        // 1. Cria a bolha da mensagem enviada
        createMessageBubble(text, "sent");

        // 2. Limpa o campo de input
        messageInput.value = "";

        // 3. Foca no campo de input novamente
        messageInput.focus();

        // 4. Simula uma resposta automática após 1 segundo
        setTimeout(simulateReply, 1000);
    }

    // --- Função para criar a bolha da mensagem na tela ---
    function createMessageBubble(text, type) {
        // Cria um novo elemento <div>
        const messageBubble = document.createElement("div");
        
        // Adiciona as classes CSS (ex: "message sent" ou "message received")
        messageBubble.classList.add("message", type);
        
        // Coloca o texto dentro da bolha
        messageBubble.innerHTML = `<span>${text}</span>`;
        
        // Adiciona a bolha à lista de mensagens
        messageList.appendChild(messageBubble);
        
        // Rola a lista de mensagens para o final para mostrar a última mensagem
        scrollToBottom();
    }

    // --- Função para simular uma resposta ---
    function simulateReply() {
        const replies = [
            "Entendido!",
            "Ok, obrigado por avisar.",
            "Haha, que legal!",
            "Sério? Me conta mais.",
            "Não sei o que dizer... 😲"
        ];
        
        // Escolhe uma resposta aleatória da lista
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        // Cria a bolha da mensagem recebida
        createMessageBubble(randomReply, "received");
    }

    // --- Função para rolar o chat para o final ---
    function scrollToBottom() {
        messageList.scrollTop = messageList.scrollHeight;
    }

    // --- Adiciona os "escutadores" de eventos ---

    // 1. Ao clicar no botão de enviar
    sendButton.addEventListener("click", sendMessage);

    // 2. Ao pressionar "Enter" no campo de input
    messageInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Impede que o "Enter" pule uma linha
            sendMessage();
        }
    });

    // 3. (BÔNUS) Ao clicar em um contato na barra lateral
    contactList.addEventListener("click", (event) => {
        // Encontra o elemento 'li' que foi clicado
        const clickedContact = event.target.closest("li.contact");
        
        if (!clickedContact) return; // Se clicou em outro lugar, não faz nada

        // Remove o "active" de todos os contatos
        document.querySelectorAll(".contact.active").forEach(contact => {
            contact.classList.remove("active");
        });

        // Adiciona o "active" ao contato clicado
        clickedContact.classList.add("active");

        // Atualiza o título do chat
        const chatName = clickedContact.querySelector("span").textContent;
        chatTitle.textContent = chatName;

        // Limpa as mensagens antigas
        messageList.innerHTML = "";
        
        // Adiciona uma mensagem de boas-vindas ao novo chat
        createMessageBubble(`Bem-vindo ao chat ${chatName}!`, "received");
    });

});
