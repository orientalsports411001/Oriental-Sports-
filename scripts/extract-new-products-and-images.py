import os
import zipfile
import re
import json
import xml.etree.ElementTree as ET
import openpyxl
from PIL import Image

def slugify(text):
    text = text.lower()
    text = re.sub(r'["\']', '', text)
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def extract_workbook(filename, target_dir_rel):
    print(f"\n==========================================")
    print(f"PROCESSING: {filename}")
    pub_dir = os.path.join('public', target_dir_rel)
    storefront_dir = os.path.join('apps', 'storefront', 'public', target_dir_rel)
    os.makedirs(pub_dir, exist_ok=True)
    os.makedirs(storefront_dir, exist_ok=True)

    # 1. Parse drawing anchors from zip
    with zipfile.ZipFile(filename, 'r') as z:
        # Drawing rels
        rels_xml = z.read('xl/drawings/_rels/drawing1.xml.rels').decode('utf-8')
        rels_root = ET.fromstring(rels_xml)
        rid_to_target = {}
        for r in rels_root:
            rid_to_target[r.attrib.get('Id')] = r.attrib.get('Target')

        # Drawing XML
        draw_xml = z.read('xl/drawings/drawing1.xml').decode('utf-8')
        draw_root = ET.fromstring(draw_xml)
        ns = {
            'xdr': 'http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing',
            'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
        }

        row_to_media = {}
        for anchor in draw_root.findall('.//xdr:twoCellAnchor', ns) + draw_root.findall('.//xdr:oneCellAnchor', ns):
            from_el = anchor.find('xdr:from', ns)
            row = int(from_el.find('xdr:row', ns).text) + 1 if from_el is not None else -1
            blip = anchor.find('.//a:blip', ns)
            if blip is not None:
                embed_id = blip.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                target = rid_to_target.get(embed_id, '')
                # Target is like '../media/image1.jpeg' -> 'xl/media/image1.jpeg'
                clean_media = target.replace('../', 'xl/')
                row_to_media[row] = clean_media

    # 2. Parse product rows with openpyxl
    wb = openpyxl.load_workbook(filename, data_only=True)
    sheet = wb['Bikes']
    products = []
    
    # Sort anchor rows
    anchor_rows = sorted(row_to_media.keys())

    for r in range(8, sheet.max_row + 1):
        name = sheet.cell(r, 2).value
        if not name:
            continue
        name = str(name).strip()
        sr = sheet.cell(r, 1).value
        qty = sheet.cell(r, 4).value or '1 piece'
        price = sheet.cell(r, 7).value
        try:
            price_num = int(float(str(price).replace(',', '').strip())) if price else 0
        except:
            price_num = 0

        # Find closest anchor row <= r (or closest anchor row)
        # In these sheets, anchor row is usually r or r-1 or within 2 rows
        matched_media = row_to_media.get(r)
        if not matched_media:
            # find closest anchor <= r
            candidates = [ar for ar in anchor_rows if ar <= r + 2]
            if candidates:
                closest_ar = min(candidates, key=lambda ar: abs(ar - r))
                matched_media = row_to_media[closest_ar]
            elif anchor_rows:
                matched_media = row_to_media[anchor_rows[0]]

        slug = slugify(name)
        
        # Save image with slug-based filename
        ext = os.path.splitext(matched_media)[1].lower() if matched_media else '.jpeg'
        if not ext:
            ext = '.jpeg'
        img_filename = f"{slug}{ext}"
        pub_img_path = os.path.join(pub_dir, img_filename)
        storefront_img_path = os.path.join(storefront_dir, img_filename)

        if matched_media:
            with zipfile.ZipFile(filename, 'r') as z:
                img_data = z.read(matched_media)
                with open(pub_img_path, 'wb') as f:
                    f.write(img_data)
                with open(storefront_img_path, 'wb') as f:
                    f.write(img_data)

        # Web accessible path
        web_img_path = f"/{target_dir_rel}/{img_filename}".replace('\\', '/')

        products.append({
            'row': r,
            'name': name,
            'slug': slug,
            'price': price_num,
            'qty': str(qty).strip(),
            'sourceMedia': matched_media,
            'image': web_img_path
        })

    print(f"Extracted {len(products)} products and saved images to {pub_dir}")
    return products

bikes = extract_workbook('Exercise Bikes.xlsx', 'images/products/exercise-bikes')
tables = extract_workbook('TT Table & Foosball Table.xlsx', 'images/products/tables-recreation')
cougar = extract_workbook('COUGAR EXE EQ.xlsx', 'images/products/cougar')

all_extracted = {
    'exercise_bikes': bikes,
    'tables_recreation': tables,
    'cougar': cougar
}

with open('scripts/extracted_catalog_data.json', 'w', encoding='utf-8') as f:
    json.dump(all_extracted, f, indent=2)

print("\nSaved scripts/extracted_catalog_data.json successfully!")
