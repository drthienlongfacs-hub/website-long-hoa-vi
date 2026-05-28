#!/usr/bin/env python3
import cv2
import numpy as np
from pathlib import Path

def main():
    img_path = Path("/Users/mac/Projects/kaiqiu_web/tmp/original_zalo_images/z7870838233753_454e613ba4738f1e27a527bdd25d15f8.jpg")
    if not img_path.exists():
        print("❌ Image not found!")
        return
        
    img = cv2.imread(str(img_path))
    h, w = img.shape[:2]
    
    # We will crop the signboard logo directly from the known unmasked coordinates!
    # In z7870838233753 (a 996452 bytes image), the signboard is in the center-left.
    # Let's crop the exact area containing the KAIQIU logo from the signboard:
    # Based on the signboard dimensions, let's crop x=[10, 320], y=[140, 240] in relative space!
    # Wait, let's do a robust contour detection for the white board first.
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 220, 255, cv2.THRESH_BINARY)
    
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    signboard_box = None
    for cnt in contours:
        x, y, cw, ch = cv2.boundingRect(cnt)
        aspect_ratio = cw / float(ch)
        # Signboard card aspect ratio is approx 2.0 to 3.0, and area is large
        if aspect_ratio > 1.8 and aspect_ratio < 3.2 and cw > 300 and cw < 900:
            signboard_box = (x, y, cw, ch)
            break
            
    if signboard_box is not None:
        x, y, cw, ch = signboard_box
        print(f"✓ Detected signboard box: pos=({x},{y}) size={cw}x{ch}")
        
        # Crop the logo area (top-left of the signboard card, approx top 35% height and left 45% width)
        lx = x + int(cw * 0.02)
        ly = y + int(ch * 0.04)
        lw = int(cw * 0.40)
        lh = int(ch * 0.35)
        
        logo_crop = img[ly:ly+lh, lx:lx+lw]
        cv2.imwrite("/Users/mac/Projects/kaiqiu_web/tmp/signboard_template.png", logo_crop)
        print("✓ Successfully extracted signboard logo template to tmp/signboard_template.png!")
    else:
        # Fallback crop with hardcoded coordinates if contour detection fails
        # In a 1080x1440 image, the signboard is around y=[400, 750], x=[10, 480]
        # The logo is around y=[420, 520], x=[20, 220]
        # Let's crop using proportional coordinates
        lx = int(w * 0.02)
        ly = int(h * 0.30)
        lw = int(w * 0.22)
        lh = int(h * 0.08)
        logo_crop = img[ly:ly+lh, lx:lx+lw]
        cv2.imwrite("/Users/mac/Projects/kaiqiu_web/tmp/signboard_template.png", logo_crop)
        print("✓ Used fallback proportional crop to extract signboard logo template to tmp/signboard_template.png!")

if __name__ == "__main__":
    main()
