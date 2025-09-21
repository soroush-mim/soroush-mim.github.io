# Evict3R Project Assets

This directory contains the assets for the Evict3R project page.

## Required Files

To complete the Evict3R project page, you need to add the following files:

### Videos
- `teaser_video_v3_compressed_short.mp4` - Main teaser video
- `layers/L00.mp4` to `layers/L23.mp4` - Layer-specific token eviction videos (24 videos total)
  - L00.mp4 corresponds to Layer 1
  - L01.mp4 corresponds to Layer 2
  - ...
  - L23.mp4 corresponds to Layer 24

### Images
- `method.png` - Method/Architecture diagram
- `results_table.png` - Results comparison table image

## Directory Structure

```
assets/evict3r/
├── layers/
│   ├── L00.mp4  # Layer 1 token eviction video
│   ├── L01.mp4  # Layer 2 token eviction video
│   ├── ...
│   └── L23.mp4  # Layer 24 token eviction video
├── method.png
├── results_table.png
└── teaser_video_v3_compressed_short.mp4
```

## Instructions

1. Replace this README with your actual assets
2. Ensure all file paths match the references in the HTML template
3. Optimize images and videos for web delivery
4. Test the layer selection functionality works correctly with your videos
