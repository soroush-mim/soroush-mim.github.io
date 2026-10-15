---
layout: about
title: About
permalink: /

lead: I work on world models and representation learning, on what an agent should learn to represent from raw observations so it can predict, plan, and keep up when the world changes.
status: looking for a PhD position in world models / representation learning

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
  - cat lab/notes/latest.md
  - open cv.pdf
  - grep -r "world model" papers/
  - python kv_demo.py --stream

interests_width: 18
interests:
  - root: world-models/
    items:
      - name: memory/
        desc: what to keep from a long stream, under a fixed budget
      - name: dynamics/
        desc: predicting what happens next, in latent space
      - name: embodied-ai/
        desc: using learned models for planning and control
  - root: representation-learning/
    items:
      - name: self-supervised/
        desc: learning from raw video and 3D observations
      - name: adaptation/
        desc: staying reliable under distribution shift
      - name: generative/
        desc: diffusion and flow-based models
---
To act well, an agent needs a model of its world: a representation compact enough to carry forward in time, rich enough to predict what happens next, and stable enough to survive a change of scenery. I'm interested in how such **representations** can be learned from raw observations like video, and in the practical questions that decide whether a **world model** is usable at all: what to remember, what to forget, and how to adapt when the data drifts.

My recent work comes at these questions from the representation side. In [**Evict3R**](https://soroush-mim.github.io/projects/evict3r/), I asked what a streaming 3D transformer actually needs to remember. Its key-value cache grows with every frame, and a training-free policy that keeps only the tokens that receive the most attention roughly halves peak memory on 7-Scenes (18.63 GB to 9.39 GB), while accuracy and completeness drop by only 0.003. In **MODE-TTA**, with collaborators at the University of Sydney, we adapt a frozen 3D vision-language model at test time by modelling each class's features as a Gaussian mixture that is updated online as data arrives. My M.Sc. thesis at Amirkabir University of Technology (GPA 4.0/4.0), supervised by [Maryam Amirmazlaghani](https://scholar.google.com/citations?user=gxbTUfEAAAAJ&hl=en), was on adversarial robustness and led to [**MemLoss**](https://arxiv.org/abs/2510.09105).

I'm a research assistant at the Autonomous & Intelligent Systems Lab at AUT, working with Mahdi Javanmardi, and I collaborate remotely with Ali Cheraghian's group at the University of Sydney. I'm based in Tehran and looking for a PhD position in world models and representation learning. If our interests overlap, I'd be glad to hear from you.
