export type Study = {
  slug:string; title:string; category:"Industrial systems"|"Textile design"|"Applied research"|"Media tools";
  status:string; summary:string; context:string; approach:string[];
  technicalWork:string[]; constraints:string[]; repository:string; stack:string[];
};
export const studies:Study[]=[
{
 slug:"rangeready",title:"RangeReady",category:"Industrial systems",status:"Engineering prototype",
 summary:"An RF test workbench connecting instrument control, configuration, monitoring and reporting.",
 context:"RF test work is easier to repeat when instrument settings, acquisition and results follow a documented sequence. The repository explores that workflow rather than relying on a collection of manual instrument operations.",
 approach:["Electron desktop wrapper with a React frontend and a Python/FastAPI backend.","Instrument drivers and plugins for SCPI-based devices, with discovery and status services.","Configuration, testing and reporting modules organised around test sessions."],
 technicalWork:["backend/drivers/ contains instrument adapters and driver manifests.","backend/services/ contains discovery, status polling and other workflow services.","The frontend and Electron wrapper are configured in separate package manifests."],
 constraints:["The README and bundled libraries describe an offline-oriented deployment, but hardware compatibility depends on the specific instrument and drivers.","No independent hardware qualification, timing benchmark or universal instrument support is established by this portfolio entry."],
 repository:"https://github.com/BalajiKoushik01/rangeready",stack:["Electron","React","FastAPI","SCPI","Python"]
},
{
 slug:"radarsim",title:"RadarSim",category:"Industrial systems",status:"Simulation and validation work",
 summary:"A C++ radar signal-processing simulator with command-line tools, tests and a Qt interface.",
 context:"Radar signal-processing ideas need controlled simulation before measurements are interpreted. This project brings waveform generation, target effects, matched filtering and detection into an inspectable C++ pipeline.",
 approach:["Qt-independent DSP components under core/include/radar.","Command-line programs for pulse, CPI, Monte Carlo and AWG-related workflows.","Optional Qt/OpenGL displays and GoogleTest modules configured through CMake."],
 technicalWork:["Waveforms, propagation effects, FFT processing and CA-CFAR modules are represented in source.","Monte Carlo validation commands and tests are included.","Export paths cover data and supporting metadata."],
 constraints:["Simulation assumptions—such as stop-and-hop CPI Doppler and simplified phase-noise handling—are documented in the repository.","Published validation figures in the README have not been independently reproduced for this website."],
 repository:"https://github.com/BalajiKoushik01/radarism",stack:["C++20","CMake","FFTW","Qt","Radar DSP"]
},
{
 slug:"sjdas",title:"SJDAS",category:"Textile design",status:"Work in progress",
 summary:"A jacquard-design workspace exploring pattern editing, textile checks and export workflows.",
 context:"Textile designers work across image preparation, motif editing, colour separation and loom-related file constraints. The repository groups these activities into a desktop-oriented design environment with supporting services.",
 approach:["PyQt6 desktop launcher and a substantial sj_das application package.","FastAPI routes for image analysis, export and design-related operations.","Tests and documentation for drafting, transformations and integration work."],
 technicalWork:["launcher.py starts the desktop application and initialises editor services.","backend/routers/ groups analysis, factory, export and related endpoints.","tests/ and docs/ contain checks, specifications and design notes."],
 constraints:["The presence of export code does not establish compatibility with every jacquard controller or a particular factory.","AI modules and cloud functions may require optional models, credentials and infrastructure.","Production reliability and full test coverage should not be inferred from version labels or promotional text."],
 repository:"https://github.com/BalajiKoushik01/SJDAS",stack:["Python","PyQt6","FastAPI","OpenCV","Textiles"]
},
{
 slug:"weavecore",title:"WeaveCore / Screenshot to Design",category:"Textile design",status:"Experimental application",
 summary:"A web-based textile-pattern extraction workflow with computer-vision processing and editable frontend tools.",
 context:"Recreating a textile pattern from an image involves geometry, colour and repetition, not only cropping. This prototype separates extraction services from a browser-based editing interface.",
 approach:["FastAPI application with versioned image-processing endpoints.","React/Vite frontend with Fabric-based editing dependencies.","Image-processing modules for segmentation, restoration, vectorisation and export experiments."],
 technicalWork:["API routes implement image upload and asynchronous job/status handling.","The repository contains workflow specifications and a textile motif asset library.","The container build assembles the frontend and Python service."],
 constraints:["Output quality depends on image quality, alignment and the source pattern; an exact reconstruction is not guaranteed.","The repository's development CORS and exception-handling settings need hardening before any public deployment.","Loom-controller conversion and factory qualification are not demonstrated by this entry."],
 repository:"https://github.com/BalajiKoushik01/screenshot_to_design",stack:["React","Vite","Fabric.js","FastAPI","OpenCV"]
},
{
 slug:"cervisense",title:"CerviSense-AI",category:"Applied research",status:"Research code — not for diagnosis",
 summary:"A research pipeline for cervical-image representation learning, fine-tuning and model evaluation.",
 context:"Medical-image research needs repeatable training and careful measurement. This repository assembles encoders, self-supervised components, training scripts and evaluation utilities.",
 approach:["MoCo-style self-supervised training code and model components.","Configuration-driven fine-tuning and evaluation scripts.","Utilities for datasets, augmentation, reporting and visualisation."],
 technicalWork:["training/train_ssl.py configures training and checkpointing.","evaluation/evaluate.py calculates metrics from a test dataset and checkpoint.","Dataset loading and preprocessing are separate modules."],
 constraints:["No regulatory clearance or clinical validation has been established here.","Training data, labels and external checkpoints must be checked for quality, access rights and suitability.","A model prediction must not be used to diagnose or triage patients based on this research repository."],
 repository:"https://github.com/BalajiKoushik01/cervisense-ai",stack:["PyTorch","Python","Computer vision","Medical-image research"]
},
{
 slug:"apex",title:"Project Apex",category:"Applied research",status:"Quantitative research prototype",
 summary:"A forecasting and analytics prototype combining time-series feature engineering, an API and a web interface.",
 context:"Forecasting work is most useful when its assumptions, backtests and uncertainty are exposed. This repository explores alternative analytical techniques in one prototype rather than presenting a trading product.",
 approach:["Python/FastAPI backend with data ingestion and mathematical feature modules.","Next.js frontend for a chart-led interaction.","Container configuration for the backend and frontend."],
 technicalWork:["The backend includes technical indicators and statistical transformations.","Model and risk modules cover forecasting and retrospective evaluation experiments.","The frontend provides a separate interface for exploring the results."],
 constraints:["The backend currently disables HTTPS certificate verification in some requests; that requires remediation before a public production deployment.","Historical fit and backtests do not establish future forecast accuracy or financial returns.","For education and research, not investment advice."],
 repository:"https://github.com/BalajiKoushik01/stock_predictor",stack:["Python","FastAPI","Next.js","Time-series analysis"]
},
{
 slug:"video-studio",title:"Video Generation Studio",category:"Media tools",status:"Experimental tooling",
 summary:"An orchestration experiment for scriptwriting, footage selection, narration and video assembly.",
 context:"Producing a short video requires assets, editorial decisions and repeatable steps. This codebase brings several processing stages under one Python-driven workflow.",
 approach:["Agent modules for script development, footage selection, editing and sound.","Configuration for local and hosted model providers.","GUI and command-line entry points plus optional ComfyUI workflows."],
 technicalWork:["studio.py coordinates specialist modules.","config.py centralises provider and asset settings.","Run scripts, agents and requirement files document the intended local workflow."],
 constraints:["External APIs, model weights and FFmpeg may be required; outcomes depend on the configured providers.","The current configuration includes machine-specific paths and requires adaptation to another computer.","This is a workflow experiment, not a guaranteed one-prompt commercial production service."],
 repository:"https://github.com/BalajiKoushik01/video_generation_model",stack:["Python","FFmpeg","LLM APIs","Video tools"]
}
];
export const categories=["All","Industrial systems","Textile design","Applied research","Media tools"] as const;
