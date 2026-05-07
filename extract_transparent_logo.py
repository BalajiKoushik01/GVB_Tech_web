from PIL import Image
import numpy as np

def make_transparent_logo(input_path, output_icon_path):
    print(f"Processing {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    # Calculate difference from white (255, 255, 255)
    # The closer to white, the more transparent it should be.
    r, g, b, a = data.T
    
    # Identify bright pixels (background)
    # If R, G, B are all > 240, it's basically white.
    white_areas = (r > 230) & (g > 230) & (b > 230)
    
    # Set alpha to 0 for white areas
    data[...][white_areas.T] = (255, 255, 255, 0)
    
    transparent_img = Image.fromarray(data)
    
    # We still need to crop out just the icon from the left side.
    # We will use the same horizontal projection logic as before.
    img_gray = transparent_img.convert('L')
    np_img = np.array(img_gray)
    content = np_img < 240
    
    row_sums = content.sum(axis=1)
    segments = []
    in_segment = False
    start = 0
    
    for i, val in enumerate(row_sums):
        if val > 0 and not in_segment:
            in_segment = True
            start = i
        elif val == 0 and in_segment:
            in_segment = False
            segments.append((start, i))
    
    if in_segment:
        segments.append((start, len(row_sums)))
        
    def crop_content(img, top, bottom):
        cropped = img.crop((0, top, img.width, bottom))
        np_crop = np.array(cropped.convert('L')) < 240
        col_sums = np_crop.sum(axis=0)
        in_seg = False
        start_c = 0
        end_c = img.width
        for i, val in enumerate(col_sums):
            if val > 0 and not in_seg:
                in_seg = True
                start_c = i
            if val > 0:
                end_c = i + 1
        return cropped.crop((start_c, 0, end_c, bottom - top))

    if len(segments) >= 1:
        logo_top, logo_bottom = segments[0]
        logo = crop_content(transparent_img, max(0, logo_top - 5), min(img.height, logo_bottom + 5))
        logo.save(output_icon_path)
        print(f"Successfully saved transparent icon to {output_icon_path}")
    else:
        print("Could not find segments.")

make_transparent_logo('public/GVB_tech_logo.png', 'public/logo_icon.png')
