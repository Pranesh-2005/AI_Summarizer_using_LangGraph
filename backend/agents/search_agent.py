from langchain_community.tools.tavily_search.tool import TavilySearchResults

def search_topic(query: str):
    """Search the web for relevant info"""
    search = TavilySearchResults(max_results=5)
    return search.run(query)