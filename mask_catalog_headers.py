#!/usr/bin/env python3
"""
Catalog Headers Masking & Watermarking Script — Long Hoa Vĩ
Author: Antigravity AI
Date: 2026-05-28

This script systematically removes the orange KAIQIU headers and competitor text
from all 51 catalog page images inside the product_images directory.
It replaces the logo with a solid white rectangle and re-applies the watermark.
"""

import os
import sys
import shutil
import cv2
import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = Path("/Users/mac/Projects/kaiqiu_web")
BACKUP_DIR = BASE_DIR / "_backup_original_images"

# Watermark config
WATERMARK_TEXT = "LONG HOA VĨ | 0385 195 501"
OPACITY = 22
FONT_SIZE_RATIO = 0.024
SPACING_RATIO = 5.0
ROTATION = -30
STROKE_OFFSETS = [(-2,0),(2,0),(0,-2),(0,2),(-1,-1),(1,-1),(-1,1),(1,1)]

def get_font(size):
    return ImageFont.load_default()

def add_watermark(image_path, output_path):
    try:
        img = Image.open(image_path).convert("RGBA")
    except Exception as e:
        print(f"  ⚠ Skip watermark: {image_path.name} — {e}")
        return False
    
    w, h = img.size
    diagonal = math.sqrt(w**2 + h**2)
    font_size = max(16, int(diagonal * FONT_SIZE_RATIO))
    font = get_font(font_size)
    
    overlay_size = int(diagonal * 1.5)
    overlay = Image.new("RGBA", (overlay_size, overlay_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    try:
        bbox = draw.textbbox((0, 0), WATERMARK_TEXT, font=font)
        text_w = bbox[2] - bbox[0]
        text_h = bbox[3] - bbox[1]
    except:
        text_w = len(WATERMARK_TEXT) * font_size * 0.6
        text_h = font_size
    
    spacing_y = int(text_h * SPACING_RATIO)
    spacing_x = int(text_w * 2.2)
    
    y = 0
    row = 0
    while y < overlay_size:
        x = -text_w + (row % 2) * (spacing_x // 2)
        while x < overlay_size:
            for dx, dy in STROKE_OFFSETS:
                draw.text((x+dx, y+dy), WATERMARK_TEXT, fill=(0, 0, 0, OPACITY//2), font=font)
            draw.text((x, y), WATERMARK_TEXT, fill=(128, 128, 128, OPACITY), font=font)
            x += spacing_x
        y += spacing_y
        row += 1
    
    overlay = overlay.rotate(ROTATION, expand=False, resample=Image.BICUBIC)
    ox, oy = overlay.size
    left = (ox - w) // 2
    top = (oy - h) // 2
    overlay = overlay.crop((left, top, left + w, top + h))
    
    result = Image.alpha_composite(img, overlay)
    
    result = result.convert("RGB")
    result.save(output_path, "JPEG", quality=92)
    return True

def main():
    src_dir = BASE_DIR / "product_images"
    tmp_masked_dir = BASE_DIR / "tmp" / "masked_product_images"
    tmp_backup_dir = BASE_DIR / "tmp" / "backup_product_images"
    
    if not src_dir.exists():
        print(f"❌ product_images directory not found: {src_dir}")
        return
        
    tmp_masked_dir.mkdir(parents=True, exist_ok=True)
    tmp_backup_dir.mkdir(parents=True, exist_ok=True)
    
    files = sorted([f for f in src_dir.iterdir() if f.suffix.lower() == '.png'])
    print(f"📂 Found {len(files)} catalog images to process.")
    
    success_count = 0
    
    for f in files:
        # Load from original active file as base (since backup might not exist yet)
        img = cv2.imread(str(f))
        if img is None:
            print(f"  ❌ Cannot read: {f.name}")
            continue
            
        h, w = img.shape[:2]
        
        # Calculate proportional coordinates for KAIQIU headers
        left_w = int(w * 0.15)  # 680px for w=4536
        right_w_start = int(w * 0.81)  # 3674px for w=4536
        header_h = int(h * 0.09)  # 152px for h=1693
        
        # Mask left header with solid white
        cv2.rectangle(img, (0, 0), (left_w, header_h), (255, 255, 255), -1)
        
        # Mask right header with solid white
        cv2.rectangle(img, (right_w_start, 0), (w, header_h), (255, 255, 255), -1)
        
        # Save clean un-watermarked image to tmp backup
        tmp_backup_file = tmp_backup_dir / f.name
        cv2.imwrite(str(tmp_backup_file), img)
        
        # Save clean un-watermarked image to tmp masked
        tmp_masked_file = tmp_masked_dir / f.name
        cv2.imwrite(str(tmp_masked_file), img)
        
        # Apply Long Hoa Vĩ watermark to tmp masked file
        add_watermark(tmp_masked_file, tmp_masked_file)
        
        success_count += 1
        if success_count % 5 == 0 or success_count == 1:
            print(f"  ✓ [{success_count}/{len(files)}] Masked & watermarked {f.name} in tmp/")
            
    # Write a zsh copy script to do the file overwriting using standard cp
    copy_script_path = BASE_DIR / "tmp" / "copy_images.sh"
    with open(copy_script_path, "w", encoding="utf-8") as sh:
        sh.write("#!/bin/zsh\n")
        sh.write("mkdir -p _backup_original_images/product_images\n")
        sh.write("cp -f tmp/backup_product_images/*.png _backup_original_images/product_images/\n")
        sh.write("cp -f tmp/masked_product_images/*.png product_images/\n")
        sh.write("echo '✓ Overwrote catalog images successfully via cp shell script!'\n")
        
    print(f"\n🎉 Successfully processed {success_count} catalog images in tmp/.")
    print(f"👉 Zsh copy script created at: {copy_script_path}")

if __name__ == "__main__":
    main()
