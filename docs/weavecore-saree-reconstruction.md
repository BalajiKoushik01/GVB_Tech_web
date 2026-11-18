# Saree photo reconstruction

## Output contract

Given a photo of a draped saree, produce an editable artwork project with separate body, border and pallu panels. Mark zari as a material overlay within any panel. Keep source visibility, repeat-supported repairs, proposed guesses and unresolved cells separate. Let the designer choose which panels and approved repairs to export. An indexed BMP carries color-area artwork. Loom-specific conversion needs factory weave assignments and an accepted controller profile.

## Model selection and geometry

| Stage | Candidate | WeaveCore design |
| --- | --- | --- |
| Isolate the saree | Meta SAM 3 concept prompts. SAM 2.1 interactive refinement baseline. | Propose the draped saree, blouse, skin/hair, jewelry and background masks. When a whole-person mask overlaps the saree, use body landmarks and specific exposed-body masks for exclusion. Subtracting a person silhouette would remove the garment. Allow positive and negative clicks. |
| Find panels and zari | Saree-specific segmentation model trained on approved annotations | Predict architectural labels for body, border and pallu, and an independent material label for zari. Add an unknown class for occlusion, ambiguous ornament and unresolved boundaries. Border continuity and pallu orientation can inform proposals but do not prove labels. |
| Flatten fabric | Local perspective transforms, followed by a regularized piecewise mesh where correspondences support it | Fit a two-vector repeat lattice from visible motif matches, including staggered repeats. Keep folds and inaccessible regions masked. A single global homography cannot flatten a draped saree. |
| Recover cut-off motifs | Same-panel registered repeats and measured symmetries | Copy aligned observations with a shared palette only where multiple copies agree. Lock known cells. Keep a provenance mask per output cell and flag alignment uncertainty separately. |
| Offer guesses | Compare structure-guided patch filling and LaMa with the same test masks | Use the existing palette and repeat layout as constraints. Store generated fills separately. Ask the designer to accept or edit them before export. An unseen asymmetric motif may have several plausible completions. |

SAM 3 is a candidate for initial mask proposals. Its checkpoints require granted access and its model license needs review before commercial distribution. SAM 2.1 provides a promptable correction baseline. DeepFashion2's published taxonomy has no saree, pallu, border or zari classes. Benchmark models on actual sarees before choosing the production default.

Use the existing browser editor for indexed edits and approval. Run heavy model inference in a separate, bounded worker behind an opt-in photo upload workflow. Keep a manual local path. Strip image metadata, validate decoded dimensions and file type, restrict artifact access, set retention and job limits, and avoid accepting arbitrary remote URLs. Test the upload and artifact boundaries before enabling server processing.

## Prototype and trial workflow

`src/lib/weavecore/reconstruct-repeat.ts` accepts already aligned copies from the same panel and palette. It leaves directly observed indices untouched. A missing cell needs at least two supporting observations and 75% agreement. Index zero remains a valid color. The separate source mask distinguishes an unresolved cell from a confirmed zero. This threshold is a starting hypothesis for testing. The trial branch exposes this through Mark an obstruction after a four-corner fabric crop. The repeat detector ignores masked samples, and the editor refuses to create a complete design if any missing cells remain unresolved. The prototype uses a planar crop and axis-aligned detected repeats. Automatic garment masks and mesh alignment are separate stages.

## Acceptance

- Collect permissioned photo and flat-CAD pairs spanning drapes, backgrounds, jewelry, narrow borders, zari glare, staggered repeats, and missing corners. Hold out complete saree designs, including all their photographs, for final testing.
- Measure saree and person leakage, per-part IoU, narrow-border boundary F1, and zari precision/recall separately. Compare against the current manual crop and reviewer annotations.
- Mask complete motif fragments in reference artwork to measure exact palette-index recovery, false fills and unresolved coverage. Compare consensus repair against best-copy, symmetry and inpainting baselines.
- Measure repeat-vector error, seam consistency, and designer correction time. Require zero edits to locked observed cells in every test.
- Verify the indexed BMP against software readback and the factory's accepted artwork. Measure end-to-end latency and asset retention before public release.

## Primary sources

- [Meta SAM 3 research](https://ai.meta.com/research/publications/sam-3-segment-anything-with-concepts/) and [checkpoint and license information](https://github.com/facebookresearch/sam3)
- [Meta SAM 2.1 repository](https://github.com/facebookresearch/sam2)
- [DeepFashion2 paper](https://openaccess.thecvf.com/content_CVPR_2019/papers/Ge_DeepFashion2_A_Versatile_Benchmark_for_Detection_Pose_Estimation_Segmentation_and_CVPR_2019_paper.pdf)
- [Near-regular texture analysis and manipulation](https://publications.ri.cmu.edu/near-regular-texture-analysis-and-manipulation)
- [LaMa inpainting repository and paper](https://github.com/advimman/lama)

## Repeat-first workflow

Use a single repeat unit as the editable master for each repeating panel. Mark a crop with complete copies, then let the detector estimate the periods or enter the known copy count for each axis. Check the preview before building the panel. Target panel columns and rows repeat the unit at its original dot size and crop partial copies at the edges. Save the single-unit project before building the panel if you want to use it again.

Choose a separate repeat for the body and border when their motifs differ. Extract a unique pallu scene as a panel. Straight repeat detection assumes an approximately planar patch. Staggered and mirrored layouts are explicit output choices in the editor.

## Assemble panels

Keep an editable project for each body, border or pallu artwork. Add the selected panel or import project files in **Assemble saree panels**, set their order and choose the join direction. A vertical join requires matching widths; a horizontal join requires matching heights. Tile or crop artwork before assembly when dimensions differ. The output keeps named region boundaries and indexed artwork. The editor builds the combined palette from used slots and preserves distinct indices within each palette. Identical palette tables with matching slot names share a mapping. Review exported indices against factory assignments.

## Automatic photo analysis trial

The optional **Analyze saree photo** action sends a browser-resized JPEG to Gemini. It proposes visible saree polygons, body/border/pallu polygons, and a separate zari overlay. It also proposes a quadrilateral for each visible fabric patch. The app validates the geometry against the proposed masks, runs the existing repeat extraction locally, and can offer a flat patch when no repeat is detected. These are model proposals. A sampled containment test checks the model's own outlines and cannot prove that they exclude the person or recover the original design.

To enable the provider path in a controlled environment, configure a dedicated `WEAVECORE_VISION_API_KEY`, use the default `gemini-3.8-flash` or select another validated image-capable model, set provider quotas and route rate limits, and set `WEAVECORE_VISION_ENABLED=true`. The endpoint only accepts bounded, inline JPEG data and does not cache images or responses. Photos are sent to Google only when the user invokes the optional action. Manual extraction remains local.

The pipeline still needs live model validation on permissioned full photos with annotated parts. Drafts currently reflect visible fabric, not hallucinated or confirmed hidden artwork.

For a no-cost trial, create a key in a Google AI Studio project without billing linked and store it as the sensitive Vercel preview variable `WEAVECORE_VISION_API_KEY`. Leave billing disabled and start with a private preview. A rate-limit response leaves manual extraction available. Quotas and eligibility are defined by Google, and free-tier image inputs may be used to improve its products. Use non-confidential photos you have permission to share.

### Run photo analysis without an API key

Install [Ollama](https://ollama.com/download) on the computer running WeaveCore. With the project dependencies installed, run `npm run weavecore:local` and open [the local WeaveCore editor](http://127.0.0.1:3000/tools/weavecore). The launcher checks Ollama, downloads Qwen3-VL 4B on the first run if needed, and starts the editor with local photo analysis enabled. The model uses the computer's CPU or GPU and needs a few gigabytes of local storage.

The local site uses no API key or paid inference service. It processes photos on the same computer and binds the site to loopback. The public Vercel site cannot connect to Ollama running on your computer. Use the local site for this configuration.
