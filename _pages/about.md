---
layout: about
title: About
permalink: /

lead: I'm working toward world models that keep a persistent 3D picture of their surroundings, fit it in a fixed memory budget, and stay reliable when the world changes.
status: looking for a PhD position in world models / 3D vision

profile:
  image: prof_pic.jpg
  alt: Soroush Mahdi sitting on a tree branch

# `ls papers/` in the hero; keys match _bibliography/papers.bib
papers:
  - name: evict3r
    key: mahdi2025evict3rtrainingfreetokeneviction
  - name: mode-tta
    key: dastmalchi2026modetta
  - name: memloss
    key: mahdi2025memlossenhancingadversarialtraining

# commands the last prompt line cycles through
typed:
  - cat notes/latest.md
  - open cv.pdf
  - grep -r "world model" papers/
  - python kv_demo.py --stream

interests:
  root: world-models/
  width: 16
  items:
    - name: 3d-grounding/
      desc: scene geometry recovered from video, not just pixels
    - name: memory/
      desc: persistent scene state under a fixed memory budget
    - name: adaptation/
      desc: staying reliable under distribution shift
    - name: generative/
      desc: diffusion and flow-based models of dynamics
    - name: embodied-ai/
      desc: world models for planning and control

# shown under the demo until the posts exist
planned_notes:
  - title: Why streaming 3D transformers run out of memory
    tag: interactive
  - title: What counts as a world model? From Ha & Schmidhuber to Genie
    tag: paper notes
  - title: DreamerV3, one equation at a time
    tag: interactive
  - title: VGGT and the case for 3D-grounded world models
    tag: paper notes
---
An agent that acts in the world needs an internal model of it: what is where, how things move, and what is likely to happen next. Video and 3D models have become good at short-horizon prediction, but many of them lose the scene once it falls out of their context window, and they get brittle when the input drifts away from the training data. I want to build world models that are **grounded in 3D geometry**, keep a **persistent memory** of the scene within a fixed budget, and **adapt** as conditions change.

My recent work covers two of these pieces. In [**Evict3R**](https://soroush-mim.github.io/projects/evict3r/), I looked at streaming 3D reconstruction transformers, whose key-value cache grows with every frame. A training-free policy that evicts redundant tokens and keeps the informative ones roughly halves peak memory on 7-Scenes (18.63 GB to 9.39 GB), while accuracy and completeness drop by only 0.003. In **MODE-TTA**, with collaborators at the University of Sydney, we adapt 3D vision-language models at test time by modelling each class as a Gaussian mixture that is updated online as data arrives. Before that, my M.Sc. thesis at Amirkabir University of Technology (GPA 4.0/4.0), supervised by [Maryam Amirmazlaghani](https://scholar.google.com/citations?user=gxbTUfEAAAAJ&hl=en), was on adversarial robustness and led to [**MemLoss**](https://arxiv.org/abs/2510.09105).

I'm a research assistant at the Autonomous & Intelligent Systems Lab at AUT, working with Mahdi Javanmardi, and I collaborate remotely with Ali Cheraghian's group at the University of Sydney. I'm based in Tehran and looking for a PhD position in world models, 3D vision, or embodied AI. If our interests overlap, I'd be glad to hear from you.
