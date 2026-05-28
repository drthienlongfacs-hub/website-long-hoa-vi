#!/usr/bin/env python3
"""
Targeted Brand Logo Remover — Long Hoa Vĩ
Author: Antigravity AI
Date: 2026-05-28

Performs rotation-invariant multiscale template matching for the KAIQIU logo specifically
on all 61 Zalo JPEGs, masking them with white shapes and applying watermarks cleanly.
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
    from watermark_all_images import add_watermark, BASE_DIR, BACKUP_DIR
except ImportError:
    BASE_DIR = Path("/Users/mac/Projects/kaiqiu_web")
    BACKUP_DIR = BASE_DIR / "_backup_original_images"

TEMPLATE_PATH = "/Users/mac/.gemini/antigravity/brain/76546817-2b98-439a-8af2-44ecb061cba8/media__1779859681136.png"

def rotate_image(image, angle):
    image_center = tuple(np.array(image.shape[1::-1]) / 2)
    rot_mat = cv2.getRotationMatrix2D(image_center, angle, 1.0)
    abs_cos = abs(rot_mat[0, 0])
    abs_sin = abs(rot_mat[0, 1])
    bound_w = int(image.shape[0] * abs_sin + image.shape[1] * abs_cos)
    bound_h = int(image.shape[0] * abs_cos + image.shape[1] * abs_sin)
    rot_mat[0, 2] += (bound_w / 2) - image_center[0]
    rot_mat[1, 2] += (bound_h / 2) - image_center[1]
    
    rotated = cv2.warpAffine(image, rot_mat, (bound_w, bound_h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT, borderValue=255)
    return rotated

def main():
    print("=========================================================")
    print("🚀 STARTING TARGETED BRAND LOGO REMOVER PIPELINE")
    print("=========================================================")
    
    template = cv2.imread(TEMPLATE_PATH)
    if template is None:
        print(f"❌ Could not load template from {TEMPLATE_PATH}")
        return
        
    th, tw = template.shape[:2]
    template_gray = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)
    
    dir_path = BASE_DIR / "drill_bit_images"
    backup_path = BACKUP_DIR / "drill_bit_images"
    backup_path.mkdir(parents=True, exist_ok=True)
    
    # 7 angles for search
    angles = [-30, -15, 0, 15, 30]
    scales = [30, 45, 60, 75, 90, 110, 130, 150, 180, 210]
    
    modified_count = 0
    total_masked = 0
    
    for f in sorted(dir_path.iterdir()):
        # Only scan the Zalo images
        if not f.name.startswith("z78708") or f.suffix.lower() not in ['.png', '.jpg', '.jpeg']:
            continue
            
        backup_img_file = backup_path / f.name
        if not backup_img_file.exists():
            shutil.copy2(src=f, dst=backup_img_file)
            
        img = cv2.imread(str(backup_img_file))
        if img is None:
            continue
            
        orig_h, orig_w = img.shape[:2]
        
        # Resize to 800px width for fast template matching
        target_w = 800
        target_h = int(orig_h * (target_w / orig_w))
        img_resized = cv2.resize(img, (target_w, target_h))
        img_gray = cv2.cvtColor(img_resized, cv2.COLOR_BGR2GRAY)
        
        matches = []
        
        for angle in angles:
            rotated_temp = rotate_image(template_gray, angle)
            rth, rtw = rotated_temp.shape[:2]
            
            for tw_scaled in scales:
                th_scaled = int(rth * (tw_scaled / rtw))
                if tw_scaled > target_w or th_scaled > target_h:
                    continue
                    
                resized_temp = cv2.resize(rotated_temp, (tw_scaled, th_scaled))
                
                res = cv2.matchTemplate(img_gray, resized_temp, cv2.TM_CCOEFF_NORMED)
                _, max_val, _, max_loc = cv2.minMaxLoc(res)
                
                # Higher threshold for specific targeted matches
                if max_val > 0.60:
                    matches.append({
                        'x': max_loc[0],
                        'y': max_loc[1],
                        'w': tw_scaled,
                        'h': th_scaled,
                        'score': max_val
                    })
                    
        if not matches:
            continue
            
        # Group overlapping matches
        # Sort matches by score descending
        matches.sort(key=lambda x: x['score'], reverse=True)
        filtered_matches = []
        for m in matches:
            overlap = False
            for fm in filtered_matches:
                # Simple distance check
                dist = np.sqrt((m['x'] - fm['x'])**2 + (m['y'] - fm['y'])**2)
                if dist < 40:
                    overlap = True
                    break
            if not overlap:
                filtered_matches.append(m)
                
        if not filtered_matches:
            continue
            
        print(f"🎯 Image: {f.name} — Found {len(filtered_matches)} targeted brand logos!")
        
        output_img = img.copy()
        scale_x = orig_w / target_w
        scale_y = orig_h / target_h
        
        for i, m in enumerate(filtered_matches):
            fx = int(m['x'] * scale_x)
            fy = int(m['y'] * scale_y)
            fw = int(m['w'] * scale_x)
            fh = int(m['h'] * scale_y)
            
            print(f"   Logo {i+1}: pos=({fx},{fy}) | size={fw}x{fh} | score={m['score']:.4f}")
            
            # Mask with solid white with 15% padding to cover text neatly
            cx1 = max(0, int(fx - fw * 0.15))
            cy1 = max(0, int(fy - fh * 0.15))
            cx2 = min(orig_w, int(fx + fw * 1.15))
            cy2 = min(orig_h, int(fy + fh * 1.15))
            
            cv2.rectangle(output_img, (cx1, cy1), (cx2, cy2), (255, 255, 255), -1)
            total_masked += 1
            
        cv2.imwrite(str(backup_img_file), output_img)
        cv2.imwrite(str(f), output_img)
        
        # Apply watermark
        add_watermark(f, f)
        modified_count += 1
        
    print("\n=========================================================")
    print("🏁 TARGETED LOGO REMOVER COMPLETE")
    print(f"Total images modified: {modified_count}")
    print(f"Total logos masked:    {total_masked}")
    print("=========================================================")

if __name__ == "__main__":
    main()
