---
layout: evict3r
title: Evict3R
description: Training-Free Token Eviction for Memory-Bounded Streaming Visual Geometry Transformers
img: /assets/evict3r/method.png
importance: 1
category: Research
---
<!-- The page itself is rendered by _layouts/evict3r.html; this text is only a summary for listings. -->

Evict3R is a training-free, inference-time token eviction policy for streaming visual geometry transformers such as StreamVGGT. Their key-value cache grows with every frame; Evict3R bounds it by discarding redundant tokens and keeping the most informative ones.

On 7-Scenes with long sequences it reduces peak memory from 18.63 GB to 9.39 GB, while accuracy and completeness drop by only 0.003. Under strict memory budgets, eviction allows denser frame sampling, which improves reconstruction accuracy over the baseline. Experiments cover video depth estimation (Sintel, KITTI), 3D reconstruction (7-Scenes, NRGBD) and camera pose estimation (Sintel, TUM-dynamics).
