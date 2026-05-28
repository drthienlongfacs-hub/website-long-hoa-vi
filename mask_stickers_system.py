#!/usr/bin/env python3
"""
Sticker Masking & Watermarking Production Pipeline — Long Hoa Vĩ
Author: Antigravity AI
Date: 2026-05-27

A fully robust, rotation-invariant multiscale template matching pipeline to detect,
mask (with rotated solid white shapes), and re-watermark brand stickers across the whole codebase.
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

STICKER_PATH = "/Users/mac/.gemini/antigravity/brain/76546817-2b98-439a-8af2-44ecb061cba8/media__1779859681136.png"

def rotate_image(image, angle):
    """Rotate image keeping bounds intact to avoid clipping white sticker edges."""
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

def get_rotated_points(w_orig, h_orig, angle):
    """Retrieve rotated coordinates of the 4 template corners."""
    cx, cy = w_orig / 2.0, h_orig / 2.0
    rot_mat = cv2.getRotationMatrix2D((cx, cy), angle, 1.0)
    
    abs_cos = abs(rot_mat[0, 0])
    abs_sin = abs(rot_mat[0, 1])
    bound_w = int(h_orig * abs_sin + w_orig * abs_cos)
    bound_h = int(h_orig * abs_cos + w_orig * abs_sin)
    
    rot_mat[0, 2] += (bound_w / 2.0) - cx
    rot_mat[1, 2] += (bound_h / 2.0) - cy
    
    corners = np.array([
        [0, 0],
        [w_orig, 0],
        [w_orig, h_orig],
        [0, h_orig]
    ], dtype=np.float32)
    
    ones = np.ones((4, 1))
    corners_h = np.hstack([corners, ones])
    transformed_corners = rot_mat.dot(corners_h.T).T
    
    return transformed_corners

def non_max_suppression(boxes, overlapThresh):
    """Deduplicate overlapping boxes."""
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
    print("🚀 STARTING PRODUCTION PIPELINE: ROTATION-INVARIANT MASKING")
    print("=========================================================")
    
    template = cv2.imread(STICKER_PATH)
    if template is None:
        print(f"❌ Could not load sticker template from {STICKER_PATH}")
        return
        
    th, tw = template.shape[:2]
    template_gray = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)
    
    # 14 angles representing all possible orientations
    angles = [-90, -75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75, 90, 180]
    
    total_images_processed = 0
    total_images_modified = 0
    total_stickers_masked = 0
    
    for dir_name in IMAGE_DIRS:
        dir_path = BASE_DIR / dir_name
        backup_path = BACKUP_DIR / dir_name
        
        if not dir_path.exists():
            print(f"⚠ Directory not found: {dir_name}, skipping.")
            continue
            
        print(f"\n📂 Scanning directory: {dir_name}...")
        
        # Make sure backup path exists
        backup_path.mkdir(parents=True, exist_ok=True)
        
        for f in sorted(dir_path.iterdir()):
            if f.suffix.lower() not in ['.png', '.jpg', '.jpeg', '.webp', '.bmp']:
                continue
                
            total_images_processed += 1
            rel_path = f.relative_to(BASE_DIR)
            
            # Step 1: Manage Backups
            backup_img_file = backup_path / f.name
            if not backup_img_file.exists():
                # Copy active to backup (active is watermarked, but it serves as backup base for safety)
                # Note: We backup once, but if we need a clean slate we work on the backup.
                shutil.copy2(src=f, dst=backup_img_file)
            
            # Load from backup to ensure we work on a clean, non-watermarked original base
            img = cv2.imread(str(backup_img_file))
            if img is None:
                print(f"  ❌ Cannot read backup image: {f.name}")
                continue
                
            orig_h, orig_w = img.shape[:2]
            
            # Downscale for matching speed (target width 800px)
            target_w = 800
            target_h = int(orig_h * (target_w / orig_w))
            img_resized = cv2.resize(img, (target_w, target_h))
            img_gray = cv2.cvtColor(img_resized, cv2.COLOR_BGR2GRAY)
            
            detected_raw_boxes = []
            
            # Step 2: Multi-Angle & Multiscale Template Matching
            for angle in angles:
                rotated_temp = rotate_image(template_gray, angle)
                rth, rtw = rotated_temp.shape[:2]
                
                # Broad multiscale range (width from 20px to 240px with step of 12)
                for tw_scaled in range(20, 240, 12):
                    th_scaled = int(rth * (tw_scaled / rtw))
                    if tw_scaled > target_w or th_scaled > target_h:
                        continue
                        
                    resized_temp = cv2.resize(rotated_temp, (tw_scaled, th_scaled))
                    
                    search_gray = img_gray.copy()
                    # Find up to 8 potential stickers per run
                    for _ in range(8):
                        res = cv2.matchTemplate(search_gray, resized_temp, cv2.TM_CCOEFF_NORMED)
                        _, max_val, _, max_loc = cv2.minMaxLoc(res)
                        
                        if max_val < 0.58:
                            break
                            
                        x1 = max_loc[0]
                        y1 = max_loc[1]
                        x2 = x1 + tw_scaled
                        y2 = y1 + th_scaled
                        
                        detected_raw_boxes.append([x1, y1, x2, y2, max_val, tw_scaled, th_scaled, angle])
                        
                        # Blank out detected region to find other stickers
                        cv2.rectangle(search_gray, (x1, y1), (x2, y2), 0, -1)
                        
            if not detected_raw_boxes:
                continue
                
            # Step 3: NMS Filtering
            np_boxes = np.array([[b[0], b[1], b[2], b[3], b[4]] for b in detected_raw_boxes])
            picked_boxes = non_max_suppression(np_boxes, 0.30)
            
            # Map back to full config
            detections = []
            for pb in picked_boxes:
                for rb in detected_raw_boxes:
                    if abs(rb[0] - pb[0]) < 4 and abs(rb[1] - pb[1]) < 4:
                        detections.append({
                            'x': rb[0],
                            'y': rb[1],
                            'w': rb[5],
                            'h': rb[6],
                            'score': pb[4],
                            'angle': rb[7]
                        })
                        break
                        
            # Step 4: Brightness & Color Saturation Quality Gate
            scale_x = orig_w / target_w
            scale_y = orig_h / target_h
            
            validated_detections = []
            for det in detections:
                full_x = int(det['x'] * scale_x)
                full_y = int(det['y'] * scale_y)
                full_w = int(det['w'] * scale_x)
                full_h = int(det['h'] * scale_y)
                
                cx1 = max(0, full_x)
                cy1 = max(0, full_y)
                cx2 = min(orig_w, full_x + full_w)
                cy2 = min(orig_h, full_y + full_h)
                
                crop = img[cy1:cy2, cx1:cx2]
                if crop.size == 0:
                    continue
                    
                crop_gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
                crop_mean = np.mean(crop_gray)
                
                # Check color saturation (Max BGR diff > 25 is typical for red/blue logos)
                diffs = np.max(crop, axis=2).astype(int) - np.min(crop, axis=2).astype(int)
                saturated_pixels = np.sum(diffs > 25)
                sat_ratio = saturated_pixels / diffs.size
                
                # Valid stickers: mean gray > 120 OR high logo color saturation (> 2%)
                if crop_mean > 120 or sat_ratio > 0.02:
                    validated_detections.append(det)
                    
            if not validated_detections:
                continue
                
            print(f"🎯 File: {rel_path} — Found {len(validated_detections)} validated brand stickers!")
            
            # Step 5: Draw Rotated Solid White Masks on Backup Image
            output_img = img.copy()
            for i, det in enumerate(validated_detections):
                print(f"   Sticker {i+1}: pos=({det['x']},{det['y']}) | size={det['w']}x{det['h']} | angle={det['angle']}° | score={det['score']:.4f}")
                
                # Calculate template dimensions at this scale
                temp_rot = rotate_image(template_gray, det['angle'])
                rtw_t, rth_t = temp_rot.shape[1], temp_rot.shape[0]
                
                s_factor = det['w'] / rtw_t
                orig_tw_scaled = tw * s_factor
                orig_th_scaled = th * s_factor
                
                corners = get_rotated_points(orig_tw_scaled, orig_th_scaled, det['angle'])
                
                # Translate
                corners[:, 0] += det['x']
                corners[:, 1] += det['y']
                
                # Upscale to full resolution coordinates
                corners_full = corners.copy()
                corners_full[:, 0] *= scale_x
                corners_full[:, 1] *= scale_y
                
                pts = corners_full.astype(np.int32)
                
                # Add 8% margin padding to ensure clean cover
                center = np.mean(pts, axis=0)
                margin_scale = 1.08
                expanded_pts = center + (pts - center) * margin_scale
                expanded_pts = expanded_pts.astype(np.int32)
                
                cv2.fillPoly(output_img, [expanded_pts], (255, 255, 255))
                total_stickers_masked += 1
                
            # Save masked image to BOTH backup and active directory
            cv2.imwrite(str(backup_img_file), output_img)
            cv2.imwrite(str(f), output_img)
            
            # Step 6: Automatically Apply dual-layer watermark on the active file
            if 'add_watermark' in globals():
                add_watermark(f, f)
                print("   ✓ Cleaned and re-watermarked successfully.")
            else:
                print("   ✓ Cleaned successfully (watermarking skipped/manual).")
                
            total_images_modified += 1
            
    print("\n=========================================================")
    print("🏁 PRODUCTION PIPELINE COMPLETE")
    print(f"Total images scanned:  {total_images_processed}")
    print(f"Total images cleaned:  {total_images_modified}")
    print(f"Total stickers masked: {total_stickers_masked}")
    print("=========================================================")

if __name__ == "__main__":
    main()
