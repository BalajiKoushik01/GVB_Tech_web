import cv2
import numpy as np
from PIL import Image

def extract_g_logo(input_path, output_path):
    print(f"Loading {input_path}")
    # Read the image
    img = cv2.imread(input_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print("Failed to load image")
        return

    # Convert to HSV to isolate the blue "G" logo
    # The G is a specific shade of blue.
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    # Define range for blue color
    lower_blue = np.array([100, 50, 50])
    upper_blue = np.array([140, 255, 255])
    
    # Threshold the HSV image to get only blue colors
    mask = cv2.inRange(hsv, lower_blue, upper_blue)
    
    # Find contours in the mask
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if not contours:
        print("No blue regions found!")
        return
        
    # The "G" might be broken into multiple blue contours (or just one).
    # We find the bounding box that encompasses all significant blue contours.
    min_x, min_y = float('inf'), float('inf')
    max_x, max_y = 0, 0
    
    valid_contours = []
    # The image is 250px tall, the G is in the top 150px.
    for cnt in contours:
        # Filter out tiny noise
        if cv2.contourArea(cnt) > 50:
            x, y, w, h = cv2.boundingRect(cnt)
            # Only keep contours in the top half of the image to avoid the "GVB TECH" text
            if y < img.shape[0] * 0.6: 
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x + w)
                max_y = max(max_y, y + h)
                valid_contours.append(cnt)
            
    if not valid_contours:
        print("No significant blue contours found.")
        return
        
    print(f"Found blue logo bounding box: ({min_x}, {min_y}) to ({max_x}, {max_y})")
    
    # Crop the original image to this bounding box
    # Add a small padding
    pad = 10
    min_y = max(0, min_y - pad)
    min_x = max(0, min_x - pad)
    max_y = min(img.shape[0], max_y + pad)
    max_x = min(img.shape[1], max_x + pad)
    
    cropped = img[min_y:max_y, min_x:max_x]
    
    # Convert cropped image to RGBA
    if cropped.shape[2] == 3:
        cropped = cv2.cvtColor(cropped, cv2.COLOR_BGR2BGRA)
        
    # Now, to remove the grid lines (which are gray) and the white background
    # within this cropped area, we can make all non-blue pixels transparent,
    # OR we can make all pixels that are "close to white" or "gray" transparent.
    # A cleaner approach: Use the blue mask to define alpha!
    cropped_hsv = cv2.cvtColor(cropped, cv2.COLOR_BGR2HSV)
    cropped_mask = cv2.inRange(cropped_hsv, lower_blue, upper_blue)
    
    # Smooth the mask to avoid jagged edges (anti-aliasing)
    cropped_mask = cv2.GaussianBlur(cropped_mask, (3, 3), 0)
    
    # Set the alpha channel
    cropped[:, :, 3] = cropped_mask
    
    # Save the output
    cv2.imwrite(output_path, cropped)
    print(f"Saved transparent cropped logo to {output_path}")

extract_g_logo("public/GVB_tech_logo.png", "public/logo_icon.png")
