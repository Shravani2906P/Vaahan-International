from bs4 import BeautifulSoup
import re

from app.db.mongodb import articles_collection


def chunk_article(article):
    base_chunk = {
        "source_type": "article",
        "source_id": str(article["_id"]),
        "title": article["title"],
        "slug": article.get("slug", ""),
        "category": article.get("category", ""),
        "tags": article.get("tags", []),
        "excerpt": article.get("excerpt", "")
    }

    content_html = article.get("content", "")

    if not content_html:
        return [{
            **base_chunk,
            "chunk_id": f"article_{article['_id']}_chunk_0",
            "chunk_text": article.get("excerpt", ""),
            "chunk_index": 0
        }]

    soup = BeautifulSoup(content_html, "html.parser")

    sections = []
    
    # Check if there are any paragraph or heading tags in the content
    has_html_structure = soup.find(["h2", "h3", "p", "ul", "li"]) is not None

    if has_html_structure:
        current_heading = article["title"]
        current_content = []

        for element in soup.find_all(["h2", "h3", "p", "ul", "li"]):
            if element.name in ["h2", "h3"]:
                if current_content:
                    sections.append(
                        f"{current_heading}. {' '.join(current_content)}"
                    )

                current_heading = element.get_text(strip=True)
                current_content = []

            else:
                text = element.get_text(" ", strip=True)

                if len(text) > 20:
                    current_content.append(text)

        if current_content:
            sections.append(
                f"{current_heading}. {' '.join(current_content)}"
            )
    else:
        # Fallback for plain text (e.g., extracted from PDF)
        # Split by double newlines to identify paragraphs
        paragraphs = [p.strip() for p in re.split(r'\n\s*\n', content_html) if p.strip()]
        for p in paragraphs:
            # Clean single newlines inside paragraph to keep it cohesive
            cleaned_p = re.sub(r'\s+', ' ', p).strip()
            if len(cleaned_p) > 20:
                sections.append(cleaned_p)

    chunks = []

    for index, text in enumerate(sections):
        text = re.sub(r"\s+", " ", text).strip()

        if len(text) < 30:
            continue

        chunks.append({
            **base_chunk,
            "chunk_id": f"article_{article['_id']}_chunk_{index}",
            "chunk_text": text,
            "chunk_index": index
        })

    return chunks


def chunk_articles():
    chunks = []

    for article in articles_collection.find():
        chunks.extend(chunk_article(article))

    return chunks


if __name__ == "__main__":
    chunks = chunk_articles()

    print(f"✅ Total chunks created: {len(chunks)}")

    if chunks:
        print("\n--- Sample Chunk ---")
        print(f"chunk_id: {chunks[0]['chunk_id']}")
        print(f"title: {chunks[0]['title']}")
        print(f"chunk_text: {chunks[0]['chunk_text'][:200]}")