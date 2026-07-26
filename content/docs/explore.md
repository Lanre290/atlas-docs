# Explore

Atlas Explore orchestrates multi-domain queries, aggregating results from planets, images, missions, and entities for a given topic, and links them into a traversable knowledge graph.

## How Explore Works

- Receives a query (e.g., "mars").
- Executes planet, image, mission, and entity searches concurrently across all providers.
- Resolves and merges results into a unified response.
- Builds a knowledge graph connecting the resolved planet/moons/missions/images/entities via name matching.
- Returns a summary, images, missions, entities, and the graph.

## The Knowledge Graph

`graph.nodes` is a flat list of typed nodes; `graph.edges` connects them by relation. `graph.centralNodeId` points at the planet node the query resolved to, if any.

**Node types:** `planet`, `moon`, `mission`, `image`, `entity`

**Relations:**
| Relation | Direction | Meaning |
|---|---|---|
| `orbits` | moon → planet | The moon orbits the planet |
| `targets` | mission → planet | The mission's target mentions the planet |
| `depicts` | image → planet/moon/mission/entity | The image's title/description mentions the node |
| `references` | entity → planet/mission | The search entity's name/identifiers match the node |

Node linking is done by name/token matching (same approach `EntityResolver` uses for search results), not a stored graph database — it's rebuilt fresh from the domain data on every request.

Asteroids aren't included as graph nodes yet: no provider currently supports asteroid lookup by name, so there's no reliable way to link a free-text query to a specific asteroid.

## Example

**Request:**
```sh
curl "http://localhost:3000/explore/mars"
```

**Response:**
```json
{
  "query": "mars",
  "summary": "Exploration overview for 'mars': Mars. Has 2 moons (Phobos, Deimos). Targeted by 2 missions (...). Appears in 5 images.",
  "images": [/* ... */],
  "missions": [/* ... */],
  "related": [/* ... */],
  "graph": {
    "nodes": [
      { "id": "planet:mars", "type": "planet", "label": "Mars", "sources": ["Le Système Solaire"], "data": { /* ... */ } },
      { "id": "moon:phobos", "type": "moon", "label": "Phobos", "sources": ["Le Système Solaire"], "data": { /* ... */ } }
    ],
    "edges": [
      { "from": "moon:phobos", "to": "planet:mars", "relation": "orbits" }
    ],
    "centralNodeId": "planet:mars"
  }
}
```

## Notes
- Explore is deterministic and does not use AI/ML — the summary and graph edges are both derived from name matching, not a language model.
- All results are attributed to their source providers.
- Useful for dashboards, educational apps, and assistants.
