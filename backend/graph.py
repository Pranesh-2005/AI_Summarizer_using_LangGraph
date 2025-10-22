from langgraph.graph import StateGraph, END
from typing import TypedDict
from agents.search_agent import search_topic
from agents.summary_agent import summarize_text

class ResearchState(TypedDict):
    topic: str
    results: str
    summary: str

def build_graph():
    graph = StateGraph(ResearchState)

    def search_node(state):
        state["results"] = search_topic(state["topic"])
        return state

    def summarize_node(state):
        state["summary"] = summarize_text(state["results"])
        return state

    graph.add_node("search", search_node)
    graph.add_node("summarize", summarize_node)
    
    graph.add_edge("search", "summarize")
    graph.add_edge("summarize", END)
    
    graph.set_entry_point("search")

    return graph.compile()