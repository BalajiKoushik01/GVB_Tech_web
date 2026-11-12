# Portfolio evidence and editorial policy

This document records the source basis for GVB Tech's **selected technical work** section. The website is a collection of prototypes and research notes; it should not turn personal, academic or experimental repositories into invented company client engagements.

| Project | Public repository | Source-backed observations | Qualification |
| --- | --- | --- | --- |
| RangeReady | [rangeready](https://github.com/BalajiKoushik01/rangeready) | Electron/React frontend, FastAPI backend, SCPI driver modules and reporting services | Hardware integrations need instrument-specific qualification. The README's guaranteed timing/reliability language is not accepted as independently demonstrated. |
| RadarSim | [radarism](https://github.com/BalajiKoushik01/radarism) | C++ DSP headers, CMake, command-line programs, Qt GUI code and tests | Simulation assumptions and results require independent reproduction before performance claims. |
| SJDAS | [SJDAS](https://github.com/BalajiKoushik01/SJDAS) | PyQt6 launcher and designer modules, FastAPI endpoints, tests and design documentation | Do not claim universal loom compatibility or 100% production readiness. |
| WeaveCore | [screenshot_to_design](https://github.com/BalajiKoushik01/screenshot_to_design) | FastAPI, React/Vite/Fabric frontend, image-processing modules and output endpoints | Image-to-design fidelity remains dependent on source quality; production hardening is still necessary. |
| CerviSense-AI | [cervisense-ai](https://github.com/BalajiKoushik01/cervisense-ai) | Training, checkpointing, dataset and evaluation code for cervical-image research | Research only, not a diagnostic system or evidence of clinical approval. |
| Project Apex | [stock_predictor](https://github.com/BalajiKoushik01/stock_predictor) | FastAPI, Next.js, forecast and risk modules | Educational research; TLS certificate verification is disabled in parts of the backend and must be fixed before deployment. |
| Video Generation Studio | [video_generation_model](https://github.com/BalajiKoushik01/video_generation_model) | Python orchestration, editing, narration and media-provider modules | Local paths and external-provider dependencies need configuration; no guarantee of end-to-end output. |

## Rules for writing project notes

- State the **problem** and describe which files or components address it.
- Use terms such as *prototype*, *simulation*, *experiment* and *research* when supported by the source.
- Prefer direct file names and technical constraints to adjectives such as *world-class*, *revolutionary*, *enterprise-grade* or *production-ready*.
- Do not claim deployed clients, measured savings, regulated approval, 100% test coverage or specific performance figures without independent records and permission to publish them.
- Cite limitations as readily as strengths.
- Revisit links and project descriptions when repositories change.

## Current validation scope

Portfolio notes were prepared by reviewing available GitHub source and documentation. Their inclusion does **not** mean the repository was compiled, tested against hardware, deployed or medically validated during this site review. Actual test results belong in the project repository with reproducible commands and logs.
