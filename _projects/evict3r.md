---
layout: evict3r
title: Evict3R
description: Training-Free Token Eviction for Memory-Bounded Streaming Visual Geometry Transformers
img: /assets/evict3r/method.png
importance: 1
category: Research
thumb: /assets/evict3r/layers/L00.gif
chip: arXiv
meta: 2509.17650 · cs.CV
blurb: bounds the KV cache of streaming 3D transformers without retraining; peak memory 18.63 GB → 9.39 GB on 7-Scenes
paper: https://arxiv.org/abs/2509.17650
code: https://github.com/soroush-mim/evict3r
authors:
  - name: Soroush Mahdi
    url: https://soroush-mim.github.io/
    aff: 1
  - name: Fardin Ayar
    url: https://www.linkedin.com/in/fardin-ayar-279b44134/
    aff: 1
  - name: Ehsan Javanmardi
    url: https://tlab.hongo.wide.ad.jp/People/ehsan-javanmardi/
    aff: 2
  - name: Manabu Tsukada
    url: https://tlab.hongo.wide.ad.jp/People/manabu-tsukada/
    aff: 2
  - name: Mahdi Javanmardi
    url: https://scholar.google.com/citations?user=6Za8HuYAAAAJ&hl=en
    aff: 1
affiliations:
  - Autonomous and Intelligent Systems Lab, Amirkabir University of Technology (Tehran Polytechnic)
  - Tsukada Laboratory, The University of Tokyo
---
<!-- The page itself is rendered by _layouts/evict3r.html; this text is only a summary for listings. -->

Evict3R is a training-free, inference-time token eviction policy for streaming visual geometry transformers such as StreamVGGT. Their key-value cache grows with every frame; Evict3R bounds it by discarding redundant tokens and keeping the most informative ones.

On 7-Scenes with long sequences it reduces peak memory from 18.63 GB to 9.39 GB, while accuracy and completeness drop by only 0.003. Under strict memory budgets, eviction allows denser frame sampling, which improves reconstruction accuracy over the baseline. Experiments cover video depth estimation (Sintel, KITTI), 3D reconstruction (7-Scenes, NRGBD) and camera pose estimation (Sintel, TUM-dynamics).
