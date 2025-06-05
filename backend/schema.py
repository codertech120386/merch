import json
from pathlib import Path
from datetime import datetime, timezone
from typing import List, Optional
import strawberry
DATA_FILE = Path(__file__).parent / "skus.json"


@strawberry.type
class Note:
    content: str
    created_at: str
    user_role: str


@strawberry.type
class SKU:
    id: str
    name: str
    sales: int
    return_percent: float
    content_score: float
    notes: List[Note]


def read_data() -> List[SKU]:
    with open(DATA_FILE) as f:
        data = json.load(f)
    return [
        SKU(
            id=item['id'],
            name=item['name'],
            sales=item['sales'],
            return_percent=item['return_percent'],
            content_score=item['content_score'],
            notes=[Note(**note) for note in item.get('notes', [])]
        )
        for item in data
    ]


def write_data(skus: List[SKU]):
    with open(DATA_FILE, 'w') as f:
        json.dump([
            {
                "id": sku.id,
                "name": sku.name,
                "sales": sku.sales,
                "return_percent": sku.return_percent,
                "content_score": sku.content_score,
                "notes": [note.__dict__ for note in sku.notes]
            }
            for sku in skus
        ], f, indent=2)


@strawberry.type
class Query:
    @strawberry.field
    def skus(self, search: Optional[str] = None, sortKey: Optional[str] = None, sortOrder: Optional[str] = "asc") -> List[SKU]:
        all_skus = read_data()
        if search:
            return [sku for sku in all_skus if search.lower() in sku.name.lower()]
        # sort logic
        if sortKey:
            reverse = sortOrder == "desc"
            sort_attr = sortKey  # :fire: convert Enum to string attribute
            all_skus.sort(key=lambda sku: getattr(
                sku, sort_attr), reverse=reverse)
        return all_skus

    @strawberry.field
    def sku_by_id(self, sku_id: str) -> Optional[SKU]:
        return next((sku for sku in read_data() if sku.id == sku_id), None)


@strawberry.type
class Mutation:
    @strawberry.mutation
    def add_note(self, new_note: bool, sku_id: str, content: str, user_role: str) -> Optional[SKU]:
        skus = read_data()
        for sku in skus:
            if sku.id == sku_id:
                sku.notes.append([(Note(content="", created_at=datetime.now(
                    timezone.utc).isoformat(), user_role=user_role))])
                break
        write_data(skus)
        return sku


schema = strawberry.Schema(query=Query, mutation=Mutation)
