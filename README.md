# 🤖 AI_Summarizer_using_LangGraph

Welcome to **AI_Summarizer_using_LangGraph**!  
This project is an AI-powered research assistant that leverages LangGraph, LangChain, and OpenRouter to search topics on the web and generate concise summaries using the latest AI models. The project provides a full-stack solution, including a FastAPI backend and a modern, responsive frontend.

---

## 🚀 Introduction

**AI_Summarizer_using_LangGraph** is designed to help users quickly gather information on any topic and receive an AI-generated summary. By combining search tools and advanced language models, it streamlines the research process for students, professionals, and anyone in need of quick insights.

---

## ✨ Features

- **Web Search Integration:** Uses TavilySearchResults via LangChain for fetching relevant web results.
- **AI Summarization:** Summarizes content using OpenRouter's free AI model (`z-ai/glm-4.5-air:free`).
- **Stateful Research Graph:** Orchestrates search and summarization steps with LangGraph.
- **Modern Frontend:** Built with HTML, CSS, and JS. Includes PWA support for offline use.
- **REST API:** FastAPI backend with CORS support to connect frontend and backend seamlessly.

---

## ⚡️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/pranesh-2005/AI_Summarizer_using_LangGraph.git
cd AI_Summarizer_using_LangGraph
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

- Create a `.env` file in `backend/` and add your OpenRouter API key:
  ```
  OPENROUTER_API_KEY=your_api_key_here
  ```

### 3. Frontend Setup

No build steps required!  
Just serve the `frontend` folder with your favorite static server or open `index.html` directly.

---

## 🛠️ Usage

### Run the Backend API

```bash
cd backend
uvicorn app:app --reload
```

The API will be available at: `http://localhost:8000`

### Use the Frontend

1. Open `frontend/index.html` in your browser.
2. Enter a topic in the search box.
3. Click the "Search & Summarize" button.
4. Receive web search results and an AI-generated summary instantly!

---

## 🤝 Contributing

We welcome contributions!

1. Fork this repository.
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to your branch (`git push origin feature/my-feature`)
5. Create a Pull Request.

Check for open issues or request new features by opening an issue.

---

## 📄 License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for details.

---

**Happy researching! 🔍📚🤖**

---
**Project structure:**

```
AI_Summarizer_using_LangGraph/
│
├── backend/
│   ├── agents/
│   │   ├── search_agent.py
│   │   └── summary_agent.py
│   ├── app.py
│   ├── graph.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── manifest.json
│   ├── script.js
│   └── style.css
│
└── README.md
```

---

> For any questions or feedback, please open an issue or contact the maintainer.

## License
This project is licensed under the **MIT** License.

---
🔗 GitHub Repo: https://github.com/Pranesh-2005/AI_Summarizer_using_LangGraph
