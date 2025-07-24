const socket = io();

// Request permission for notifications
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

// Emit signal
document.getElementById("alarmBtn").addEventListener("click", () => {
  socket.emit("triggerAlarm");
});

// Refuse button emits a different event
document.getElementById("refuseBtn").addEventListener("click", () => {
  socket.emit("triggerRefuse");
});

// Receive signal
socket.on("showAlarm", (payload) => {
  if (Notification.permission === "granted") {
    const audio = document.getElementById("alarmSound");
    if (audio) {
      audio.play().catch((err) => {
        console.error("Unable to play alarm audio:", err);
      });
    }

    new Notification("🚨 System Alert", {
      body: `Hey! Users: ${payload.connectedUsers}`,
      icon: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
    });
  } else {
    alert("Please grant the System Notification Permission!");
  }
});

// Receive refuse signal
socket.on("showRefuse", () => {
  if (Notification.permission === "granted") {
    const audio = document.getElementById("refuseSound");
    if (audio) {
      audio.play().catch((err) => {
        console.error("Unable to play refuse audio:", err);
      });
    }

    new Notification("❌ Refusal Notice", {
      body: "The request has been refused.",
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
    });
  } else {
    alert("Please grant the System Notification Permission!");
  }
});

const sourceText = document.getElementById("sourceText");
const targetText = document.getElementById("targetText");

function normalizeText(text) {
  return text
    .replace(/[‘’‛]/g, "'")
    .replace(/[“”„]/g, '"')
    .replace(/[—–‐‑]/g, "-")
    .replace(/[！]/g, "!")
    .replace(/[。]/g, ".")
    .replace(/[、]/g, ",")
    .replace(/[？]/g, "?")
    .replace(/\s+$/, ""); // trim trailing whitespace
}

function updateConvertedText() {
  const input = sourceText.value;
  targetText.value = normalizeText(input);
}

function copyToClipboard() {
  targetText.select();
  document.execCommand("copy");
}

sourceText.addEventListener("input", updateConvertedText);

// Emit current source text to server every 1 minute
setInterval(() => {
  const content = sourceText.value;
  socket.emit("syncText", { text: content });
}, 60000); // 60,000 ms = 1 minute

// Listen for synced text from the server
socket.on("syncText", ({ text }) => {
  // Update source and target textareas without triggering recursive input
  sourceText.value = text;
  updateConvertedText();
});
