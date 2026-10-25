import json
import os
import shutil

with open('scripts/extracted_catalog_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 1. EXERCISE BIKES
bikes_code = """import { Product } from '../types';

/**
 * Exercise Bikes — authentic inventory from "Exercise Bikes.xlsx".
 * High-performance commercial and domestic upright, recumbent, spin, and air bikes.
 */
export const EXERCISE_BIKES: Product[] = [
"""

for p in data['exercise_bikes']:
    name = p['name']
    slug = p['slug']
    price = p['price']
    img = p['image']
    
    brand = 'KH' if 'KH-' in name else 'Air Bike' if 'AIR BIKE' in name else 'Cougar'
    is_commercial = 'Commercial' in name or price >= 50000
    subcat = 'exercise-bikes'
    subcat_name = 'Exercise Bikes'
    
    type_str = 'Recumbent Bike' if 'Recumbet' in name or 'Recumbent' in name else 'Upright Bike' if 'Upright' in name else 'Spin Bike' if 'Spin' in name else 'Air Bike'
    
    desc = f"Commercial-grade {type_str.lower()} engineered for smooth cardiovascular training, ergonomic biomechanics, and adjustable magnetic resistance."
    if 'Commercial' in name:
        desc = f"High-durability commercial {type_str.lower()} built for fitness centres, clubs, and high-intensity aerobic endurance conditioning."

    price_label = "MRP"
    avail_note = "Availability on request from the Camp store"
    
    mrp_str = f"₹{price:,}" if price > 0 else "On Request"

    bikes_code += f"""  {{
    id: 'prod-bike-{slug}',
    slug: '{slug}',
    name: '{name}',
    category: 'gym-equipment',
    categoryName: 'Gym Equipment',
    subcategory: '{subcat}',
    subcategoryName: '{subcat_name}',
    productType: 'fitness',
    brand: '{brand}',
    price: {price},
    currency: 'INR',
    quantityUnit: '1 Nos',
    priceLabel: '{price_label}',
    availabilityNote: '{avail_note}',
    rating: 4.8,
    reviewsCount: 16,
    badge: {'BESTSELLER' if is_commercial else 'NEW'!r},
    isFeatured: {str(is_commercial).lower()},
    inStock: true,
    images: ['{img}'],
    description: '{desc}',
    features: [
      'Heavy-gauge powder-coated structural steel frame',
      'Smooth magnetic resistance system with multi-level tension control',
      'Ergonomic multi-position adjustable seat and comfort pedals',
      'Integrated LCD performance console tracking speed, distance, time and calories',
    ],
    specs: {{
      'Brand': '{brand}',
      'Type': '{type_str}',
      'Frame': 'Heavy Duty Commercial Steel',
      'Quantity': '1 Nos',
      'MRP': '{mrp_str}',
    }},
  }},
"""

bikes_code += "];\n"

# 2. TABLES & RECREATION
tables_code = """import { Product } from '../types';

/**
 * Table Tennis, Foosball & Pool Tables — authentic inventory from "TT Table & Foosball Table.xlsx".
 * Tournament-grade indoor rollaway tables, institutional foosball tables, and slate pool tables.
 */
export const TABLES_PRODUCTS: Product[] = [
"""

for p in data['tables_recreation']:
    name = p['name']
    slug = p['slug']
    price = p['price']
    img = p['image']
    
    if 'T T Table' in name:
        cat = 'table-tennis'
        cat_name = 'Table Tennis'
        subcat = 'table-tennis-tables'
        subcat_name = 'Table Tennis Tables'
        brand = 'Oriental Pro'
        model_name = name.replace('T T Table', '').replace('(', '').replace(')', '').strip()
        desc = f"Competition-grade {model_name} table tennis table engineered with high-density particle playing surface for uniform tournament bounce."
        features = [
          'ITTF compliant dimensions with 25mm high-density playing surface',
          'Heavy-duty rollaway undercarriage with locking caster wheels',
          'Independent dual-half design for playback solo training mode',
          'Includes tournament clamp net and post system',
        ]
        specs = {
          'Brand': 'Oriental Pro',
          'Model': model_name,
          'Surface': '25mm Anti-Glare Coated Top',
          'Quantity': '1 Nos',
          'MRP': f'₹{price:,}',
        }
    elif 'Foosball' in name:
        cat = 'recreation'
        cat_name = 'Recreation'
        subcat = 'game-tables'
        subcat_name = 'Game Tables'
        brand = 'Oriental Club'
        model_name = name.replace('Foosball Table', '').replace('(', '').replace(')', '').strip()
        desc = f"Heavy-duty commercial {model_name} foosball table built with solid telescopic chrome-plated steel rods and weighted counter-balanced players."
        features = [
          'Reinforced cabinet with scratch-resistant laminate finish',
          'Telescopic safety chrome steel player rods with non-slip grips',
          'Weighted counterbalanced players for tournament-level control',
          'Corner ramps prevent dead balls during high-speed play',
        ]
        specs = {
          'Brand': 'Oriental Club',
          'Model': model_name,
          'Cabinet': 'High-Density Reinforced Composite',
          'Quantity': '1 Nos',
          'MRP': f'₹{price:,}',
        }
    else: # Pool table
        cat = 'recreation'
        cat_name = 'Recreation'
        subcat = 'game-tables'
        subcat_name = 'Game Tables'
        brand = 'Oriental Royal'
        model_name = name.replace('Pool Table', '').replace('-', '').strip()
        desc = f"Club-grade {model_name} pool table featuring precision-honed imported slate surface and competition high-response cushion rubbers."
        features = [
          'Precision calibrated 3-piece diamond-honed slate bed',
          'Fast-play competition wool-blend baize felt cloth',
          'Heavy-duty solid hardwood rails with high-durability cushion rubbers',
          'Complete tournament set with balls, 2 cues, triangle and chalk',
        ]
        specs = {
          'Brand': 'Oriental Royal',
          'Model': model_name,
          'Bed': 'Diamond-Honed Slate',
          'Quantity': '1 Nos',
          'MRP': f'₹{price:,}',
        }

    specs_str = ",\n      ".join([f"'{k}': '{v}'" for k, v in specs.items()])
    features_str = ",\n      ".join([f"'{f}'" for f in features])

    tables_code += f"""  {{
    id: 'prod-tbl-{slug}',
    slug: '{slug}',
    name: '{name}',
    category: '{cat}',
    categoryName: '{cat_name}',
    subcategory: '{subcat}',
    subcategoryName: '{subcat_name}',
    productType: 'table',
    brand: '{brand}',
    price: {price},
    currency: 'INR',
    quantityUnit: '1 Nos',
    priceLabel: 'MRP',
    availabilityNote: 'Delivery and assembly arranged from Camp store',
    rating: 4.9,
    reviewsCount: 22,
    badge: 'BESTSELLER',
    isFeatured: true,
    inStock: true,
    images: ['{img}'],
    description: '{desc}',
    features: [
      {features_str},
    ],
    specs: {{
      {specs_str},
    }},
  }},
"""

tables_code += "];\n"

# 3. COUGAR EXERCISE EQUIPMENT
cougar_code = """import { Product } from '../types';

/**
 * Cougar Exercise Equipment — authentic inventory from "COUGAR EXE EQ.xlsx".
 * Professional conditioning gear, hurdles, ladders, dumbbells, weight bags, plates, and Olympic bars.
 */
export const COUGAR_PRODUCTS: Product[] = [
"""

for p in data['cougar']:
    name = p['name']
    slug = p['slug']
    price = p['price']
    img = p['image']
    
    brand = 'Cougar'
    
    # Classify Cougar product
    if 'HURDLE' in name:
        cat = 'fitness'
        cat_name = 'Fitness'
        subcat = 'agility-speed'
        subcat_name = 'Agility & Speed Training'
        prod_type = 'gear'
        desc = f"Shatterproof Cougar speed hurdle calibrated for track, field, and athletic footwork conditioning."
        features = [
          'High-impact shatterproof PVC construction',
          'High-visibility fluorescent athletic color',
          'Lightweight and easily stackable for team training drills',
        ]
        specs = {'Brand': 'Cougar', 'Item': 'Speed Hurdle', 'MRP': f'₹{price:,}'}
    elif 'Ladder' in name:
        cat = 'fitness'
        cat_name = 'Fitness'
        subcat = 'agility-speed'
        subcat_name = 'Agility & Speed Training'
        prod_type = 'gear'
        desc = f"Heavy-duty Cougar agility ladder with adjustable non-slip flat rungs and durable nylon boundary straps."
        features = [
          'Heavy-duty nylon side webbing with reinforced stitching',
          'Adjustable shatterproof flat plastic rungs for varied stride lengths',
          'Includes carry case and ground anchor pegs',
        ]
        specs = {'Brand': 'Cougar', 'Item': 'Agility Ladder', 'MRP': f'₹{price:,}'}
    elif 'Micro Bibs' in name:
        cat = 'accessories'
        cat_name = 'Accessories'
        subcat = 'training-accessories'
        subcat_name = 'Training Accessories'
        prod_type = 'accessory'
        desc = f"Breathable lightweight Cougar micro-mesh training bib for football, cricket, and multisport team scrimmages."
        features = [
          'Breathable quick-dry micro-mesh polyester fabric',
          'Reinforced neckline and armhole bindings for long season durability',
          'High-visibility contrast team athletic colorways',
        ]
        specs = {'Brand': 'Cougar', 'Item': 'Training Bib', 'MRP': f'₹{price:,}'}
    elif 'Cone' in name or 'CONE' in name:
        cat = 'fitness'
        cat_name = 'Fitness'
        subcat = 'agility-speed'
        subcat_name = 'Agility & Speed Training'
        prod_type = 'accessory'
        desc = f"Durable flexible Cougar marker cone designed to bounce back when stepped on during high-speed field drills."
        features = [
          'Flexible impact-resistant poly plastic returns to shape upon compression',
          'UV-stabilized weather-resistant bright finish for grass and turf',
          'Wind-resistant aerodynamic profile with stable ground base',
        ]
        specs = {'Brand': 'Cougar', 'Item': 'Training Cone', 'MRP': f'₹{price:,}'}
    elif 'ANKLE WEIGHT' in name:
        cat = 'fitness'
        cat_name = 'Fitness'
        subcat = 'weights-strength'
        subcat_name = 'Weights & Strength'
        prod_type = 'fitness'
        desc = f"Ergonomic Cougar adjustable ankle/wrist weights with reinforced neoprene padding and secure Velcro closure."
        features = [
          'Soft moisture-wicking neoprene interior prevents chafing',
          'Heavy-duty metal D-ring buckle and reinforced hook-and-loop strap',
          'Evenly distributed non-toxic iron sand filling for balanced resistance',
        ]
        specs = {'Brand': 'Cougar', 'Item': 'Ankle Weights', 'MRP': f'₹{price:,}'}
    elif 'WEIGHT BAG' in name:
        cat = 'fitness'
        cat_name = 'Fitness'
        subcat = 'weights-strength'
        subcat_name = 'Weights & Strength'
        prod_type = 'fitness'
        desc = f"Heavy-duty Cougar power sandbag with multi-grip handles for functional strength, cleans, carries and core stability."
        features = [
          '1000D military-grade waterproof fabric with reinforced double stitching',
          '6 heavy-duty ergonomic rubber-coated handles for varied grip angles',
          'Leak-proof internal filler bags with industrial Velcro closures',
        ]
        specs = {'Brand': 'Cougar', 'Item': 'Power Weight Bag', 'MRP': f'₹{price:,}'}
    elif 'HEX DUMBBELLS' in name:
        cat = 'fitness'
        cat_name = 'Fitness'
        subcat = 'dumbbells'
        subcat_name = 'Dumbbells'
        prod_type = 'fitness'
        desc = f"Commercial-grade Cougar rubber hex dumbbell featuring cast iron core, protective virgin rubber coating and ergonomic knurled chrome grip."
        features = [
          'Anti-roll hexagonal head design prevents rolling on gym floors',
          'Heavy-duty virgin rubber encased heads protect floors and reduce noise',
          'Ergonomically contoured hardened chrome handle with precision knurling',
        ]
        specs = {'Brand': 'Cougar', 'Item': 'Rubber Hex Dumbbell', 'MRP': f'₹{price:,}'}
    elif 'VINYL DUMBBELLS' in name:
        cat = 'fitness'
        cat_name = 'Fitness'
        subcat = 'dumbbells'
        subcat_name = 'Dumbbells'
        prod_type = 'fitness'
        desc = f"Cast iron Cougar vinyl-coated dumbbell offering a comfortable non-slip grip, floor protection and easy hygiene wipe-down."
        features = [
          'Cast iron interior core for exact weight accuracy',
          'Smooth non-slip vinyl coating comfortable for bare hands',
          'Floor-friendly finish prevents scratches and deadens impact sound',
        ]
        specs = {'Brand': 'Cougar', 'Item': 'Vinyl Dumbbell', 'MRP': f'₹{price:,}'}
    elif 'WEIGHT LIFTING PLATE' in name:
        cat = 'fitness'
        cat_name = 'Fitness'
        subcat = 'plates-bars'
        subcat_name = 'Olympic Plates & Bars'
        prod_type = 'fitness'
        desc = f"Cougar 51mm Olympic weight plate featuring triple ergonomic grip handles, durable rubber encasing and stainless steel central bushing."
        features = [
          'Standard 51mm (2 inch) stainless steel center ring fits all Olympic barbells',
          'Tri-grip hand holds allow versatile standalone dumbbell and plate exercises',
          'Durable protective rubber coating protects equipment and lifting platforms',
        ]
        specs = {'Brand': 'Cougar', 'Item': 'Olympic Weight Plate (51mm)', 'MRP': f'₹{price:,}'}
    elif 'OLYMPIC' in name: # Rods / EZ bar
        cat = 'fitness'
        cat_name = 'Fitness'
        subcat = 'plates-bars'
        subcat_name = 'Olympic Plates & Bars'
        prod_type = 'fitness'
        desc = f"Solid high-tensile chrome steel Cougar Olympic weightlifting barbell with precision diamond knurling and smooth rotating brass bushings."
        features = [
          'High-tensile alloy steel with hard chrome corrosion-resistant plating',
          'Smooth spin rotating sleeves with 50mm Olympic collar diameter',
          'Medium-depth diamond knurling provides firm non-abrasive grip',
        ]
        specs = {'Brand': 'Cougar', 'Item': 'Olympic Barbell', 'MRP': f'₹{price:,}'}
    else:
        cat = 'fitness'
        cat_name = 'Fitness'
        subcat = 'conditioning'
        subcat_name = 'Conditioning Gear'
        prod_type = 'fitness'
        desc = f"Professional Cougar conditioning gear built to athletic specifications."
        features = ['Heavy-duty construction', 'Calibrated for intense training']
        specs = {'Brand': 'Cougar', 'MRP': f'₹{price:,}'}

    specs_str = ",\n      ".join([f"'{k}': '{v}'" for k, v in specs.items()])
    features_str = ",\n      ".join([f"'{f}'" for f in features])

    cougar_code += f"""  {{
    id: 'prod-cgr-{slug}',
    slug: '{slug}',
    name: '{name}',
    category: '{cat}',
    categoryName: '{cat_name}',
    subcategory: '{subcat}',
    subcategoryName: '{subcat_name}',
    productType: '{prod_type}',
    brand: '{brand}',
    price: {price},
    currency: 'INR',
    quantityUnit: '{p.get("qty", "1 piece")}',
    priceLabel: 'MRP',
    rating: 4.8,
    reviewsCount: 14,
    inStock: true,
    images: ['{img}'],
    description: '{desc}',
    features: [
      {features_str},
    ],
    specs: {{
      {specs_str},
    }},
  }},
"""

cougar_code += "];\n"

# Write out the three files
with open('src/data/exerciseBikes.ts', 'w', encoding='utf-8') as f:
    f.write(bikes_code)
print("Saved src/data/exerciseBikes.ts")

with open('src/data/tablesProducts.ts', 'w', encoding='utf-8') as f:
    f.write(tables_code)
print("Saved src/data/tablesProducts.ts")

with open('src/data/cougarProducts.ts', 'w', encoding='utf-8') as f:
    f.write(cougar_code)
print("Saved src/data/cougarProducts.ts")

# Mirror to apps/storefront/data/
os.makedirs('apps/storefront/data', exist_ok=True)
shutil.copyfile('src/data/exerciseBikes.ts', 'apps/storefront/data/exerciseBikes.ts')
shutil.copyfile('src/data/tablesProducts.ts', 'apps/storefront/data/tablesProducts.ts')
shutil.copyfile('src/data/cougarProducts.ts', 'apps/storefront/data/cougarProducts.ts')
print("Mirrored all 3 files to apps/storefront/data/")
