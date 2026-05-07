from PIL import Image, ImageChops
import numpy as np

img = Image.open('public/GVB_tech_logo.png')
# Convert to grayscale and then inverted binary to find dark pixels (assuming logo is dark on light background)
# Actually the image has a white/light-gray background and blue/black text.
img_gray = img.convert('L')
np_img = np.array(img_gray)
# Threshold: anything below 240 is considered "content"
content = np_img < 240

# Horizontal projection
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

print(f"Found segments: {segments}")

def crop_content(img, top, bottom):
    cropped = img.crop((0, top, img.width, bottom))
    # Now crop horizontally
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

if len(segments) >= 2:
    # First segment is logo, rest is text
    # Let's combine all text segments
    logo_top, logo_bottom = segments[0]
    logo = crop_content(img, max(0, logo_top - 5), min(img.height, logo_bottom + 5))
    logo.save('public/logo_icon.png')
    
    text_top = segments[1][0]
    text_bottom = segments[-1][1]
    text = crop_content(img, max(0, text_top - 5), min(img.height, text_bottom + 5))
    text.save('public/logo_text.png')
    print("Cropped successfully into public/logo_icon.png and public/logo_text.png")
else:
    print("Could not find distinct segments. Need to adjust threshold or logic.")
