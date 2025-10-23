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
      resultBox.innerHTML = `<h2>${data.topic}</h2><p>${data.summary}</p>`;
    } else {
      resultBox.innerHTML = `<p style="color:red;">${data.error || 'Failed to get summary.'}</p>`;
    }
  } catch (err) {
    loading.classList.add('hidden');
    resultBox.classList.remove('hidden');
    resultBox.innerHTML = `<p style="color:red;">Error connecting to API.</p>`;
  }
}
