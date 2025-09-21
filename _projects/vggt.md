---
layout: vggt
title: Evict3R - Training-Free Token Eviction for Memory-Bounded Streaming Visual Transformers
description: A training-free, inference-time token eviction policy that bounds memory by discarding redundant tokens while keeping the most informative ones.
img: /assets/vggt/method.png
importance: 1
category: Research
---

Modern streaming visual transformers like StreamVGGT enable real-time 3D perception by caching tokens across frames, but their memory usage grows unbounded with sequence length. Evict3R solves this scalability bottleneck with a simple, training-free token eviction policy that operates entirely at inference time. Our method discards redundant tokens while preserving the most informative ones, bounding memory growth without retraining or architectural changes. This makes long-horizon 3D reconstruction, depth estimation, and camera pose inference practical on a single GPU — with almost no loss in accuracy.

## Key Features

- **Memory-Bounded Streaming**: Introduces per-layer key–value cache budgets to cap memory growth.  
- **Attention-Guided Eviction**: Retains critical geometry tokens using normalized cumulative attention scores.  
- **Plug-and-Play Design**: Requires no retraining or model modification — fully compatible with existing StreamVGGT checkpoints.  
- **Scalable Long Sequences**: Reduces GPU memory by up to **50%** while maintaining reconstruction accuracy.  
- **Versatile Benchmarks**: Validated across 3D reconstruction, video depth estimation, and camera pose estimation datasets.  
- **Better Under Constraints**: Under strict memory budgets, enables denser frame sampling that can even improve accuracy compared to the baseline.  


<!-- ## Awards

🏆 **CVPR 2025 Best Paper Award** -->

## Resources

- [Paper](https://arxiv.org/abs/2503.11651)
- [Code](https://github.com/facebookresearch/vggt)
<!-- - [Demo](https://huggingface.co/spaces/facebook/vggt)
- [Slides](https://docs.google.com/presentation/d/1JVuPnuZx6RgAy-U5Ezobg73XpBi7FrOh/edit?usp=sharing&ouid=107115712143490405606&rtpof=true&sd=true) -->

The interactive 3D visualizations and comparisons above demonstrate VGGT's capabilities in reconstructing complex scenes from in-the-wild photos and videos.
