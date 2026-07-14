import numpy as np

# Lazy-load model on first use to reduce startup memory (critical for
# hosting platforms with tight RAM limits like Render's 512 MB free tier).
# model used :- all-MiniLM-L6-v2

MODEL_NAME = "all-MiniLM-L6-v2"
_model = None


def _get_model():
    """Return the SentenceTransformer model, loading it on first call."""
    global _model
    if _model is None:
        print(f"[INFO] Lazy-loading SentenceTransformer model '{MODEL_NAME}'...")
        from sentence_transformers import SentenceTransformer
        _model = SentenceTransformer(MODEL_NAME)
        print(f"[SUCCESS] SentenceTransformer model loaded.")
    return _model


def embed_texts(texts: list[str]) -> np.ndarray:
    """
    Convert a list of text strings into embeddings (vectors).
    Returns a numpy array of shape (len(texts), 384)
    384 is the vector dimension for all-MiniLM-L6-v2
    """
    embeddings = _get_model().encode(
        texts,
        show_progress_bar=True,
        batch_size=32,
        convert_to_numpy=True
    )
    return embeddings


def embed_query(query: str) -> np.ndarray:
    """
    Embed a single user query for similarity search.
    Returns a numpy array of shape (1, 384)
    """
    embedding = _get_model().encode([query], convert_to_numpy=True)
    return embedding


if __name__ == "__main__":
    # Testing
    test_texts = [
        "AWD is not worth it for city driving in India.",
        "ABS prevents wheels from locking up during emergency braking.",
        "Hyundai Creta is a popular SUV with good mileage."
    ]

    print("Embedding test texts...")
    embeddings = embed_texts(test_texts)
    print(f"✅ Shape: {embeddings.shape}")
    print(f"✅ First vector (first 5 values): {embeddings[0][:5]}")

    print("\nEmbedding test query...")
    query_embedding = embed_query("Is AWD worth buying in India?")
    print(f"✅ Query shape: {query_embedding.shape}")
    print("✅ Embedder working correctly")
    