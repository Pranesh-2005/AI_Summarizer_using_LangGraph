async function getResearch() {
  const topic = document.getElementById("topicInput").value.trim()
  const resultBox = document.getElementById("result")
  const resultContent = resultBox.querySelector(".result-content")
  const loading = document.getElementById("loading")

  if (!topic) {
    alert("Please enter a topic")
    return
  }

  resultBox.classList.add("hidden")
  loading.classList.remove("hidden")
  loading.textContent = "⏳ Fetching data..."

  try {
    const res = await fetch(`https://ai-summarizer-using-langgraph.onrender.com/research?topic=${encodeURIComponent(topic)}`)
    const data = await res.json()

    loading.classList.add("hidden")
    resultBox.classList.remove("hidden")

    if (data.summary) {
      // More aggressive cleaning of markdown text
      const cleanedMarkdown = data.summary
        .replace(/\n{3,}/g, "\n\n") // Replace 3+ newlines with 2
        .replace(/^\s+/gm, "") // Remove leading spaces
        .replace(/\s+$/gm, "") // Remove trailing spaces
        .replace(/\n\s*\n\s*\n/g, "\n\n") // Clean up extra empty lines
        .trim()

      // Parse Markdown to HTML with strict settings
      const markdownHtml = marked.parse(cleanedMarkdown, {
        breaks: false, // Don't convert single line breaks to <br>
        gfm: true,
        headerIds: false,
        mangle: false,
        sanitize: false,
        smartypants: false,
      })

      // Clean up the HTML output
      const cleanedHtml = markdownHtml
        .replace(/<p>\s*<\/p>/g, "") // Remove empty paragraphs
        .replace(/\s{2,}/g, " ") // Replace multiple spaces with single space
        .replace(/>\s+</g, "><") // Remove spaces between tags

      resultContent.innerHTML = cleanedHtml
    } else {
      resultContent.innerHTML = `<p style="color:#f59e0b;">❌ ${data.error || "Failed to get summary."}</p>`
    }
  } catch (err) {
    loading.classList.add("hidden")
    resultBox.classList.remove("hidden")
    resultContent.innerHTML = `<p style="color:#f59e0b;">❌ Error connecting to API: ${err.message}</p>`
    console.error("API Error:", err)
  }
}

function clearResult() {
  document.getElementById("result").classList.add("hidden")
  document.getElementById("topicInput").value = ""
  document.getElementById("topicInput").focus()
}

// Allow Enter key to trigger research
document.getElementById("topicInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getResearch()
  }
})