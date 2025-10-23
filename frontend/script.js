async function getResearch() {
  const topic = document.getElementById('topicInput').value.trim();
  const resultBox = document.getElementById('result');
  const loading = document.getElementById('loading');

  if (!topic) {
    alert("Please enter a topic");
    return;
  }

  resultBox.classList.add('hidden');
  loading.classList.remove('hidden');
  loading.textContent = "⏳ Fetching data...";

  try {
    const res = await fetch(`http://127.0.0.1:8000/research?topic=${encodeURIComponent(topic)}`);
    const data = await res.json();
    
    loading.classList.add('hidden');
    resultBox.classList.remove('hidden');

    if (data.summary) {
      // Parse Markdown to HTML using marked.js
      const markdownHtml = marked.parse(data.summary);
      resultBox.innerHTML = `<h2>${data.topic}</h2><div class="markdown-content">${markdownHtml}</div>`;
    } else {
      resultBox.innerHTML = `<p style="color:red;">${data.error || 'Failed to get summary.'}</p>`;
    }
  } catch (err) {
    loading.classList.add('hidden');
    resultBox.classList.remove('hidden');
    resultBox.innerHTML = `<p style="color:red;">Error connecting to API.</p>`;
  }
}

// Allow Enter key to trigger research
document.getElementById('topicInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    getResearch();
  }
});