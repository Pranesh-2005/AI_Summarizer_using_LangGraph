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
      // Parse Markdown to HTML using marked.js with proper configuration
      const markdownHtml = marked.parse(data.summary, {
        breaks: true,
        gfm: true,
        sanitize: false
      });
      resultBox.innerHTML = `
        <div class="research-result">
          <h2 class="topic-title">📋 ${data.topic}</h2>
          <div class="markdown-content">${markdownHtml}</div>
        </div>
      `;
    } else if (data.error) {
      resultBox.innerHTML = `<p style="color:red;">❌ ${data.error}</p>`;
    } else {
      resultBox.innerHTML = `<p style="color:red;">❌ Failed to get summary.</p>`;
    }
  } catch (err) {
    loading.classList.add('hidden');
    resultBox.classList.remove('hidden');
    resultBox.innerHTML = `<p style="color:red;">❌ Error connecting to API: ${err.message}</p>`;
    console.error('API Error:', err);
  }
}

// Allow Enter key to trigger research
document.getElementById('topicInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    getResearch();
  }
});