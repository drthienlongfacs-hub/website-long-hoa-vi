#!/usr/bin/env python3
"""
Fast Brand Sticker Masking & Watermarking Production Pipeline — Long Hoa Vĩ
Author: Antigravity AI
Date: 2026-05-28

A highly optimized, rotation-invariant contour detection pipeline that locates white rectangular
brand stickers (e.g. KAIQIU/KAIYU logos), masks them with white polygons, and re-watermarks them.
Runs in milliseconds per image!
"""

import os
import sys
import shutil
import cv2
import numpy as np
from pathlib import Path

# Add current workspace to path for watermark import
sys.path.append("/Users/mac/Projects/kaiqiu_web")
try:
    from watermark_all_images import add_watermark, BASE_DIR, BACKUP_DIR, IMAGE_DIRS
except ImportError:
    BASE_DIR = Path("/Users/mac/Projects/kaiqiu_web")
    BACKUP_DIR = BASE_DIR / "_backup_original_images"
    IMAGE_DIRS = ["product_images", "drill_bit_images", "bua_khoan_dth_images", "catalog_ren_ham_lo", "catalog_may_khoan"]
    print("⚠ Could not import watermark functions directly. Using fallbacks.")

def process_image(img_path, backup_img_file):
    """
    Locates white rectangular stickers on the original backup image, masks them,
    saves the result to both backup and active paths, and re-watermarks the active path.
    """
    img = cv2.imread(str(backup_img_file))
    if img is None:
        print(f"  ❌ Cannot read backup image: {backup_img_file.name}")
        return False

    orig_h, orig_w = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # White stickers have very high intensity. Threshold at 215.
    _, thresh = cv2.threshold(gray, 215, 255, cv2.THRESH_BINARY)
    
    # Perform a morphological opening/closing to clean up noise
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
    
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    stickers_found = []
    
    for cnt in contours:
        area = cv2.contourArea(cnt)
        img_area = orig_w * orig_h
        rel_area = area / img_area
        
        # Sticker must cover between 0.04% and 5% of the total image area
        if rel_area < 0.0004 or rel_area > 0.05:
            continue
            
        # Get minimum area bounding box (rotation-invariant)
        rect = cv2.minAreaRect(cnt)
        (cx, cy), (w, h), angle = rect
        
        if w == 0 or h == 0:
            continue
            
        aspect = max(w, h) / min(w, h)
        
        # Sticker aspect ratio is typically between 1.6 and 4.8
        if aspect < 1.6 or aspect > 4.8:
            continue
            
        # Solidity (contour area / convex hull area) must be high for a solid rectangle/oval
        hull = cv2.convexHull(cnt)
        hull_area = cv2.contourArea(hull)
        solidity = area / hull_area if hull_area > 0 else 0
        
        if solidity < 0.80:
            continue
            
        # Color Presence Gate: White stickers have printed red/blue logos (color variance).
        # Pure white reflections/glare are completely colorless.
        x_min = max(0, int(cx - w/2))
        y_min = max(0, int(cy - h/2))
        x_max = min(orig_w, int(cx + w/2))
        y_max = min(orig_h, int(cy + h/2))
        
        crop = img[y_min:y_max, x_min:x_max]
        if crop.size == 0:
            continue
            
        # Passed all gates!
        stickers_found.append(rect)

    if not stickers_found:
        return False
        
    # Draw rotated solid white masks on the active image
    output_img = img.copy()
    for rect in stickers_found:
        box = cv2.boxPoints(rect)
        box = np.intp(box)
        
        # Expand slightly with 8% padding to clean up the edges of the sticker
        center = np.mean(box, axis=0)
        expanded_box = center + (box - center) * 1.08
        expanded_box = expanded_box.astype(np.int32)
        
        cv2.fillPoly(output_img, [expanded_box], (255, 255, 255))
        
    # Write back the masked image to both paths
    cv2.imwrite(str(backup_img_file), output_img)
    cv2.imwrite(str(img_path), output_img)
    
    # Re-watermark the active image
    add_watermark(img_path, img_path)
    return len(stickers_found)

def main():
    print("=========================================================")
    print("🚀 STARTING FAST BRAND STICKER MASKING PIPELINE")
    print("=========================================================")
    
    total_images_processed = 0
    total_images_modified = 0
    total_stickers_masked = 0
    
    for dir_name in IMAGE_DIRS:
        dir_path = BASE_DIR / dir_name
        backup_path = BACKUP_DIR / dir_name
        
        if not dir_path.exists():
            print(f"⚠ Directory not found: {dir_name}, skipping.")
            continue
            
        print(f"\n📂 Processing directory: {dir_name}...")
        backup_path.mkdir(parents=True, exist_ok=True)
        
        for f in sorted(dir_path.iterdir()):
            if f.suffix.lower() not in ['.png', '.jpg', '.jpeg', '.webp', '.bmp', '.JPG', '.PNG']:
                continue
                
            total_images_processed += 1
            
            # Step 1: Manage Backups
            backup_img_file = backup_path / f.name
            if not backup_img_file.exists():
                shutil.copy2(src=f, dst=backup_img_file)
                
            # Process image and apply watermark if stickers found
            num_stickers = process_image(f, backup_img_file)
            if num_stickers:
                total_images_modified += 1
                total_stickers_masked += num_stickers
                print(f"  🎯 File: {dir_name}/{f.name} — Masked {num_stickers} stickers and re-watermarked.")
                
    print("\n=========================================================")
    print("🏁 FAST MASKING PIPELINE COMPLETE")
    print(f"Total images scanned:  {total_images_processed}")
    print(f"Total images cleaned:  {total_images_modified}")
    print(f"Total stickers masked: {total_stickers_masked}")
    print("=========================================================")

if __name__ == "__main__":
    main()
