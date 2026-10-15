---
layout: about
title: About
permalink: /

lead: I work on world models and representation learning, especially on learning representations at several levels of abstraction, so an agent can plan better and further ahead and adapt when the world changes.
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
  - cd ~/lab
  - open cv.pdf
  - grep -r "world model" papers/
  - cat about.md | wc -w

interests_width: 18
interests:
  - root: world-models/
    items:
      - name: abstraction/
        desc: multi-level states for longer, better plans
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
I'm interested in **world models**: learned representations an agent can carry forward in time, use to predict what happens next, and keep reliable when the world changes. I think a good world model has to learn **multiple levels of abstraction**, with fine-grained states for the next few steps and coarser ones for long horizons. That hierarchy is what lets an agent plan better and further ahead, and adapt to a change without relearning everything. Getting there is largely a **representation learning** problem: what to encode at each level, what to remember, and how to adapt when the data drifts.

My recent work covers the last two. [**Evict3R**](https://soroush-mim.github.io/projects/evict3r/) asks what a streaming 3D transformer actually needs to remember; a training-free eviction policy roughly halves its peak memory on 7-Scenes with almost no loss in accuracy. **MODE-TTA** adapts a frozen 3D vision-language model at test time by modelling each class's features as a Gaussian mixture updated online. My M.Sc. at Amirkabir University of Technology (GPA 4.0/4.0) was on adversarial robustness and led to [**MemLoss**](https://arxiv.org/abs/2510.09105).

I'm a research assistant at AUT's Autonomous & Intelligent Systems Lab, working with Mahdi Javanmardi, and I collaborate with Ali Cheraghian's group at the University of Sydney. If our interests overlap, I'd be glad to hear from you.
