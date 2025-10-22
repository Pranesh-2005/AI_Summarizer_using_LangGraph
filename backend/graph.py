from langgraph.graph import StateGraph, END
from agents.search_agent import search_topic
from agents.summary_agent import summarize_text

def build_graph():
    graph = StateGraph(name="AIResearchGraph")

    @graph.node("search")
    def search_node(state):
        state["results"] = search_topic(state["topic"])
        return state

    @graph.node("summarize")
    def summarize_node(state):
        state["summary"] = summarize_text(state["results"])
        return state

    graph.edge("search", "summarize")
    graph.edge("summarize", END)

    return graph
