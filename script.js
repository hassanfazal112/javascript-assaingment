const chatContainer = document.getElementById("chatContainer");
const userInput = document.getElementById("userInput");

const API_KEY = "AIzaSyCPHYYqy7dkXH62bC437CJvNQ8KWGbXEq4";

async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  if (!userMessage.toLowerCase().includes("saylani")) {
    renderMessage("XXX Only Saylani-related questions are allowed.", "bot");
    userInput.value = "";
    return;
  }

  renderMessage(userMessage, "user");
  userInput.value = "";

  const payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: userMessage }],
      },
    ],
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    const botMessage =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    renderMessage(botMessage, "bot");
  } catch (error) {
    renderMessage("Error: " + error.message, "bot");
  }
}
function renderMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);

  const textNode = document.createElement("p");
  textNode.innerText = message;

  messageDiv.appendChild(textNode);
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
