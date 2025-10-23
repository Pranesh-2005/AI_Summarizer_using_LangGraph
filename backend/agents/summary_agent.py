import httpx, os

def summarize_text(text: str):
    """Summarize using OpenRouter AI model"""
    api_key = os.getenv("OPENROUTER_API_KEY")
    headers = {
        "Authorization": f"Bearer {api_key}",
    }
    data = {
        "model": "z-ai/glm-4.5-air:free",  # free model
        "messages": [
            {"role": "system", "content": "You are a helpful research summarizer. Refer the data given by the user and use your own knowledge to generate a concise summary. Refer Research papers, articles, and verified sources which is in your training data or memory, But don't make it hard for the user to understand keep it simple and easy to read/understand."},
            {"role": "user", "content": f"Summarize these findings into clear points:\n\n{text}"}
        ]
    }
    resp = httpx.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)
    if resp.status_code != 200:
        return f"Error: {resp.text}"
    return resp.json()["choices"][0]["message"]["content"]
