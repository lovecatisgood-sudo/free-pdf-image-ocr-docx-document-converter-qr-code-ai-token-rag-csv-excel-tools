# Open-Source Launch Checklist

## Repository files

- [x] MIT `LICENSE`
- [x] English `README.md`
- [x] Thai `README.th.md`
- [x] Complete English feature inventory
- [x] Thai feature overview
- [x] Verified English and Thai live-demo directory
- [x] Contribution guides
- [x] Code of Conduct
- [x] Security policy
- [x] Support guides
- [x] Attribution guide and trademark clarification
- [x] Third-party notices
- [x] Changelog, roadmap, authors, and citation metadata
- [x] Issue forms, pull-request template, CI, and Dependabot configuration

## Before creating the GitHub repository

- [ ] Review all included logos, fonts, images, OCR data, and other assets for redistribution rights.
- [ ] Confirm `contact@djai.academy` is the correct public security and conduct contact.
- [ ] Confirm the copyright name in `LICENSE` is exactly the legal/publishing identity you want.
- [ ] Open the Google share link in a signed-out browser and confirm its destination.
- [ ] Review `THIRD_PARTY_NOTICES.md`; obtain legal advice if license compatibility is material to the business.
- [ ] Review the two documented implementation limitations in `FEATURES.md` concerning QR preview frames and PDF metadata dates.

## Create and configure GitHub

- [ ] Create the public function-first repository without auto-generating another README or license.
- [ ] Push the contents of this folder to `main`.
- [ ] Apply description, website, topics, labels, and settings from `REPOSITORY_SETUP.md`.
- [ ] Enable Discussions and private vulnerability reporting.
- [ ] Confirm GitHub recognizes the MIT License.
- [ ] Wait for the first CI run and resolve any environment-specific failures.
- [ ] Add branch protection after CI has a successful required check.
- [ ] Upload a 1280 × 640 social preview.
- [ ] Pin the repository on the `lovecatisgood-sudo` profile.

## Release

- [ ] Create the `v1.0.0` release using the prepared notes in `REPOSITORY_SETUP.md`.
- [ ] Add screenshots or a short demo to the README or release.
- [ ] Open several scoped `good first issue` items from `ROADMAP.md`.
- [ ] Test cloning and setup in a clean directory.
- [ ] Test one Thai and one English route from every application build.

## Website and discovery

- [ ] Link the repository from the DJAI Academy tools landing pages.
- [ ] Add an open-source portfolio entry to the Siamese Cat Dev bio page.
- [ ] Link each repository demo entry to its exact live tool URL.
- [ ] Add a short, relevant open-source/community story to the cafe site if appropriate.
- [ ] Submit or re-check DJAI tool pages in Google Search Console.
- [ ] Keep Google Business Profile details, photos, hours, and contact information accurate.

## After launch

- [ ] Review issues, discussions, dependency alerts, and failed CI regularly.
- [ ] Publish changes through tagged releases and maintain `CHANGELOG.md`.
- [ ] Keep Thai and English documentation synchronized.
- [ ] Measure useful adoption: clones, stars, contributors, live-tool referrals, and Search Console queries.
- [ ] Ask for genuine feedback and reviews without incentives.
