"""
update-materials.py: 扫描 materials 目录，自动更新各分类 JSON 配置

功能：
  1. 扫描每个子文件夹中的图片文件
  2. 读取已有 JSON，保留手动填入的属性
  3. 自动发现新增材质和实物图
  4. 按规范格式写入 JSON
"""

import json
import os
import re
from collections import defaultdict

MATERIALS_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "public", "images", "materials"
)

THUMBNAIL_EXTS = {".png"}
PHOTO_PATTERN = re.compile(r"^(.+)-(\d+)\.")


def scan_category(category_path: str) -> dict:
    """扫描分类目录，发现材质和图片"""
    materials: dict[str, dict] = defaultdict(lambda: {
        "name": {"zh": "", "en": ""},
        "sizes": [8, 10, 12, 14],
        "sizeUnit": "mm",
        "thumbnail": "",
        "texture": "",
        "photos": [],
        "properties": {"origin": "", "energy": ""},
        "pricing": {"basePrice": 0, "pricePerMm": 0, "currency": "CNY"},
        "care": [],
    })

    files = os.listdir(category_path)
    thumbnails = []
    photos_map: dict[str, list[str]] = defaultdict(list)

    for f in files:
        if not os.path.isfile(os.path.join(category_path, f)):
            continue
        ext = os.path.splitext(f)[1].lower()

        if ext in THUMBNAIL_EXTS:
            if PHOTO_PATTERN.match(f):
                photos_map[PHOTO_PATTERN.match(f).group(1)].append(f)
            else:
                thumbnails.append(f)
        elif m := PHOTO_PATTERN.match(f):
            base = m.group(1)
            photos_map[base].append(f)

    # 将 png 作为缩略图建立材质条目
    for thumb in sorted(thumbnails):
        base = os.path.splitext(thumb)[0]
        mat = materials[base]
        mat["thumbnail"] = thumb
        mat["photos"] = [
            {
                "path": p,
                "description": {"zh": f"{base} 实物图", "en": f"{base} Photo"}
            }
            for p in sorted(photos_map.get(base, []))
        ]

    return dict(materials)


def load_existing_json(json_path: str):
    """读取已有 JSON"""
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return None


def merge_materials(existing, scanned: dict, category_name: str) -> dict:
    """合并已有 JSON 与扫描结果，保留手动数据"""
    existing_materials = existing.get("materials", {}) if existing else {}

    for mat_id, scanned_mat in scanned.items():
        existing_mat = existing_materials.get(mat_id, {})
        scanned_mat["name"]["zh"] = existing_mat.get("name", {}).get("zh", "")
        scanned_mat["name"]["en"] = existing_mat.get("name", {}).get("en", "")
        scanned_mat["sizes"] = existing_mat.get("sizes", scanned_mat["sizes"])
        scanned_mat["texture"] = existing_mat.get("texture", f"{category_name}.jpg")

        if existing_props := existing_mat.get("properties"):
            scanned_mat["properties"]["origin"] = existing_props.get("origin", "")
            scanned_mat["properties"]["energy"] = existing_props.get("energy", "")

        if existing_pricing := existing_mat.get("pricing"):
            scanned_mat["pricing"]["basePrice"] = existing_pricing.get("basePrice", 0)
            scanned_mat["pricing"]["pricePerMm"] = existing_pricing.get("pricePerMm", 0)

        if existing_care := existing_mat.get("care"):
            scanned_mat["care"] = existing_care

        existing_materials[mat_id] = scanned_mat

    # 清理孤儿材质（缩略图文件已删除但 JSON 中残留）
    scanned_thumbnails = {m["thumbnail"] for m in scanned.values() if m["thumbnail"]}
    if existing:
        for mat_id in list(existing_materials.keys()):
            existing_mat = existing_materials[mat_id]
            if existing_mat.get("thumbnail") and existing_mat["thumbnail"] not in scanned_thumbnails:
                del existing_materials[mat_id]

    return {
        "category": category_name,
        "label": (existing or {}).get("label", {"zh": "", "en": ""}),
        "materials": existing_materials,
    }


def update_json(category_path: str, category_name: str):
    """更新单个分类的 JSON"""
    json_path = os.path.join(category_path, f"{category_name}.json")
    existing = load_existing_json(json_path)
    scanned = scan_category(category_path)
    merged = merge_materials(existing, scanned, category_name)

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)

    scanned_ids = list(scanned.keys())
    existing_ids = list(existing.get("materials", {}).keys()) if existing else []
    new_ids = [i for i in scanned_ids if i not in existing_ids]

    print(f"  [{category_name}]")
    print(f"    材质: {len(merged['materials'])} 个")
    if new_ids:
        print(f"    新增: {', '.join(new_ids)}")
    print(f"    已写入: {json_path}")


def main():
    print(f"扫描目录: {MATERIALS_DIR}\n")

    if not os.path.exists(MATERIALS_DIR):
        print(f"❌ 目录不存在: {MATERIALS_DIR}")
        return

    categories = sorted([
        d for d in os.listdir(MATERIALS_DIR)
        if os.path.isdir(os.path.join(MATERIALS_DIR, d))
    ])

    if not categories:
        print("⚠️  未找到分类子目录")
        return

    for category in categories:
        category_path = os.path.join(MATERIALS_DIR, category)
        update_json(category_path, category)

    print(f"\n✅ 完成! 共更新 {len(categories)} 个分类")


if __name__ == "__main__":
    main()
