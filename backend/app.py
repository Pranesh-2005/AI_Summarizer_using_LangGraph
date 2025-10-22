from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from graph import build_graph
from dotenv import load_dotenv

load_dotenv()
app = FastAPI(title="AI Research Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Frontend access
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

graph = build_graph()

@app.get("/research")
async def research(topic: str):
    try:
        result = graph.run({"topic": topic})
        return {
            "topic": topic,
            "summary": result["summary"]
        }
    except Exception as e:
        return {"error": str(e)}

@app.get("/")
def root():
    return {"message": "LangGraph AI Research Assistant API running!"}
