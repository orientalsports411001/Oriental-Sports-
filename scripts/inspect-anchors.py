import zipfile
import xml.etree.ElementTree as ET

files = [
    'Exercise Bikes.xlsx',
    'TT Table & Foosball Table.xlsx',
    'COUGAR EXE EQ.xlsx'
]

for filename in files:
    print('====================================================')
    print('FILE:', filename)
    with zipfile.ZipFile(filename, 'r') as z:
        # Read drawing rels
        rels_xml = z.read('xl/drawings/_rels/drawing1.xml.rels').decode('utf-8')
        rels_root = ET.fromstring(rels_xml)
        rid_to_target = {}
        for r in rels_root:
            rid = r.attrib.get('Id')
            target = r.attrib.get('Target')
            rid_to_target[rid] = target

        # Read drawing xml
        draw_xml = z.read('xl/drawings/drawing1.xml').decode('utf-8')
        draw_root = ET.fromstring(draw_xml)
        
        # Namespace
        ns = {
            'xdr': 'http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing',
            'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
            'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
        }
        
        anchors = []
        # Find twoCellAnchor or oneCellAnchor
        for anchor in draw_root.findall('.//xdr:twoCellAnchor', ns) + draw_root.findall('.//xdr:oneCellAnchor', ns):
            from_el = anchor.find('xdr:from', ns)
            row = int(from_el.find('xdr:row', ns).text) if from_el is not None else -1
            col = int(from_el.find('xdr:col', ns).text) if from_el is not None else -1
            
            blip = anchor.find('.//a:blip', ns)
            if blip is not None:
                embed_id = blip.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                target = rid_to_target.get(embed_id, '')
                anchors.append({'row': row + 1, 'col': col + 1, 'embed_id': embed_id, 'target': target})

        anchors.sort(key=lambda x: x['row'])
        print(f'Total image anchors: {len(anchors)}')
        for a in anchors:
            print(f"Row {a['row']:3d}, Col {a['col']:2d} -> {a['target']}")
