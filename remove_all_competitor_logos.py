#!/usr/bin/env python3
"""
Systematic Brand Logo & Sticker Remover — Long Hoa Vĩ
Author: Antigravity AI
Date: 2026-05-28

This script performs rotation-invariant multiscale template matching for BOTH
competitor brand logos/stickers:
1. Signboard Logo Template (media__1779938185279.png) - Covers white signboards
2. Yellow Wrap Sticker Template (media__1779859681136.png) - Covers yellow plastic bag print
3. Additional Sticker Template (media__1779937233805.png) - For safety/redundancy

It scans all product image directories, masks detected logos with solid white,
and systematically applies the Long Hoa Vĩ watermark.
"""

import os
import sys
import shutil
import cv2
import math
import numpy as np
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

# ═══ CONFIG ═══
BASE_DIR = Path("/Users/mac/Projects/kaiqiu_web")
BACKUP_DIR = BASE_DIR / "_backup_original_images"

# Watermark Config
WATERMARK_TEXT = "LONG HOA VĨ | 0385 195 501"
OPACITY = 22
FONT_SIZE_RATIO = 0.024
SPACING_RATIO = 5.0
ROTATION = -30
STROKE_OFFSETS = [(-2,0),(2,0),(0,-2),(0,2),(-1,-1),(1,-1),(-1,1),(1,1)]

IMAGE_DIRS = [
    "product_images",
    "drill_bit_images",
    "bua_khoan_dth_images",
    "catalog_ren_ham_lo",
    "catalog_may_khoan",
]

IMAGE_EXTS = {'.png', '.jpg', '.jpeg', '.webp', '.bmp', '.JPG', '.PNG'}

# Template Paths
TEMPLATES = [
    {
        "path": "/Users/mac/.gemini/antigravity-ide/brain/b3daf057-7439-4aef-9ab5-19d8523aec8f/media__1779938185279.png",
        "name": "Signboard Logo",
        "threshold": 0.60,
        "padding": 0.15
    },
    {
        "path": "/Users/mac/.gemini/antigravity/brain/76546817-2b98-439a-8af2-44ecb061cba8/media__1779859681136.png",
        "name": "Yellow Plastic Wrap",
        "threshold": 0.58,
        "padding": 0.10
    },
    {
        "path": "/Users/mac/.gemini/antigravity-ide/brain/b3daf057-7439-4aef-9ab5-19d8523aec8f/media__1779937233805.png",
        "name": "Alternative Sticker",
        "threshold": 0.60,
        "padding": 0.12
    }
]

def get_font(size):
    return ImageFont.load_default()

def add_watermark(image_path, output_path):
    """Add repeating diagonal watermark to an image."""
    try:
        img = Image.open(image_path).convert("RGBA")
    except Exception as e:
        print(f"  ⚠ Skip watermark (cannot open): {image_path.name} — {e}")
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
    
    ext = output_path.suffix.lower()
    if ext in ('.jpg', '.jpeg'):
        result = result.convert("RGB")
        result.save(output_path, "JPEG", quality=92)
    else:
        result.save(output_path, "PNG", optimize=True)
    
    return True

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

def non_max_suppression(boxes, overlapThresh):
    if len(boxes) == 0:
        return []
    if boxes.dtype.kind == "i":
        boxes = boxes.astype("float")
    pick = []
    x1 = boxes[:, 0]
    y1 = boxes[:, 1]
    x2 = boxes[:, 2]
    y2 = boxes[:, 3]
    scores = boxes[:, 4]
    
    area = (x2 - x1 + 1) * (y2 - y1 + 1)
    idxs = np.argsort(scores)
    
    while len(idxs) > 0:
        last = len(idxs) - 1
        i = idxs[last]
        pick.append(i)
        
        xx1 = np.maximum(x1[i], x1[idxs[:last]])
        yy1 = np.maximum(y1[i], y1[idxs[:last]])
        xx2 = np.minimum(x2[i], x2[idxs[:last]])
        yy2 = np.minimum(y2[i], y2[idxs[:last]])
        
        w = np.maximum(0, xx2 - xx1 + 1)
        h = np.maximum(0, yy2 - yy1 + 1)
        
        overlap = (w * h) / area[idxs[:last]]
        idxs = np.delete(idxs, np.concatenate(([last], np.where(overlap > overlapThresh)[0])))
        
    return boxes[pick].astype("float")

def main():
    print("=========================================================")
    print("🚀 STARTING MULTI-TEMPLATE BRAND LOGO & STICKER REMOVER")
    print("=========================================================")
    
    loaded_templates = []
    for t_cfg in TEMPLATES:
        t_img = cv2.imread(t_cfg["path"])
        if t_img is None:
            print(f"⚠ Could not load template: {t_cfg['name']} from {t_cfg['path']}")
            continue
        th, tw = t_img.shape[:2]
        t_gray = cv2.cvtColor(t_img, cv2.COLOR_BGR2GRAY)
        t_cfg["gray"] = t_gray
        t_cfg["h"] = th
        t_cfg["w"] = tw
        loaded_templates.append(t_cfg)
        print(f"✓ Loaded template: {t_cfg['name']} ({tw}x{th})")
        
    if not loaded_templates:
        print("❌ No templates loaded. Exiting.")
        return
        
    angles = [-90, -60, -45, -30, -15, 0, 15, 30, 45, 60, 90, 180]
    scales = [25, 40, 55, 70, 85, 100, 120, 140, 160, 185, 210, 240]
    
    total_images_scanned = 0
    total_images_modified = 0
    total_logos_masked = 0
    
    for dir_name in IMAGE_DIRS:
        dir_path = BASE_DIR / dir_name
        backup_path = BACKUP_DIR / dir_name
        
        if not dir_path.exists():
            print(f"⚠ Directory not found: {dir_name}, skipping.")
            continue
            
        print(f"\n📂 Scanning directory: {dir_name}...")
        backup_path.mkdir(parents=True, exist_ok=True)
        
        for f in sorted(dir_path.iterdir()):
            if f.suffix.lower() not in IMAGE_EXTS or f.name.startswith('.'):
                continue
                
            total_images_scanned += 1
            rel_path = f.relative_to(BASE_DIR)
            
            # Use original from backup as base if it exists, to avoid compounding masks/watermarks
            backup_img_file = backup_path / f.name
            if not backup_img_file.exists():
                shutil.copy2(src=f, dst=backup_img_file)
                
            img = cv2.imread(str(backup_img_file))
            if img is None:
                continue
                
            orig_h, orig_w = img.shape[:2]
            
            # Downscale for matching speed (target width 800px)
            target_w = 800
            target_h = int(orig_h * (target_w / orig_w))
            img_resized = cv2.resize(img, (target_w, target_h))
            img_gray = cv2.cvtColor(img_resized, cv2.COLOR_BGR2GRAY)
            
            detected_raw_boxes = []
            
            for t_cfg in loaded_templates:
                t_gray = t_cfg["gray"]
                t_h, t_w = t_cfg["h"], t_cfg["w"]
                threshold = t_cfg["threshold"]
                padding = t_cfg["padding"]
                
                for angle in angles:
                    rotated_temp = rotate_image(t_gray, angle)
                    rth, rtw = rotated_temp.shape[:2]
                    
                    for tw_scaled in scales:
                        th_scaled = int(rth * (tw_scaled / rtw))
                        if tw_scaled > target_w or th_scaled > target_h:
                            continue
                            
                        resized_temp = cv2.resize(rotated_temp, (tw_scaled, th_scaled))
                        
                        # Find up to 4 matches of this specific template at this scale/angle
                        search_gray = img_gray.copy()
                        for _ in range(4):
                            res = cv2.matchTemplate(search_gray, resized_temp, cv2.TM_CCOEFF_NORMED)
                            _, max_val, _, max_loc = cv2.minMaxLoc(res)
                            
                            if max_val < threshold:
                                break
                                
                            x1 = max_loc[0]
                            y1 = max_loc[1]
                            x2 = x1 + tw_scaled
                            y2 = y1 + th_scaled
                            
                            detected_raw_boxes.append([x1, y1, x2, y2, max_val, padding])
                            
                            # Blank out detected region to find others
                            cv2.rectangle(search_gray, (x1, y1), (x2, y2), 0, -1)
                            
            if not detected_raw_boxes:
                # Proactively apply watermark anyway for systematic coverage
                add_watermark(backup_img_file, f)
                continue
                
            # Filter matches using Non-Max Suppression
            np_boxes = np.array([[b[0], b[1], b[2], b[3], b[4]] for b in detected_raw_boxes])
            picked_boxes = non_max_suppression(np_boxes, 0.30)
            
            # Map back to full config
            final_detections = []
            for pb in picked_boxes:
                for rb in detected_raw_boxes:
                    if abs(rb[0] - pb[0]) < 4 and abs(rb[1] - pb[1]) < 4:
                        final_detections.append({
                            'x1': rb[0],
                            'y1': rb[1],
                            'x2': rb[2],
                            'y2': rb[3],
                            'score': pb[4],
                            'padding': rb[5]
                        })
                        break
                        
            if not final_detections:
                add_watermark(backup_img_file, f)
                continue
                
            print(f"🎯 File: {rel_path} — Found {len(final_detections)} competitor brand logos!")
            
            output_img = img.copy()
            scale_x = orig_w / target_w
            scale_y = orig_h / target_h
            
            for i, det in enumerate(final_detections):
                # Scale coordinates to original high-res image
                fx1 = int(det['x1'] * scale_x)
                fy1 = int(det['y1'] * scale_y)
                fx2 = int(det['x2'] * scale_x)
                fy2 = int(det['y2'] * scale_y)
                
                fw = fx2 - fx1
                fh = fy2 - fy1
                pad = det['padding']
                
                print(f"   Logo {i+1}: pos=({fx1},{fy1}) | size={fw}x{fh} | score={det['score']:.4f}")
                
                # Apply solid white rectangle mask with padding
                cx1 = max(0, int(fx1 - fw * pad))
                cy1 = max(0, int(fy1 - fh * pad))
                cx2 = min(orig_w, int(fx2 + fw * pad))
                cy2 = min(orig_h, int(fy2 + fh * pad))
                
                cv2.rectangle(output_img, (cx1, cy1), (cx2, cy2), (255, 255, 255), -1)
                total_logos_masked += 1
                
            # Save masked image
            cv2.imwrite(str(backup_img_file), output_img)
            cv2.imwrite(str(f), output_img)
            
            # Apply watermark on masked image
            add_watermark(f, f)
            print("   ✓ Cleaned and re-watermarked successfully.")
            total_images_modified += 1
            
    print("\n=========================================================")
    print("🏁 SYSTEMATIC LOGO REMOVER SUMMARY")
    print(f"Total images scanned:  {total_images_scanned}")
    print(f"Total images cleaned:  {total_images_modified}")
    print(f"Total logos masked:    {total_logos_masked}")
    print(f"Backup folder:         {BACKUP_DIR}")
    print("=========================================================")

if __name__ == "__main__":
    main()
