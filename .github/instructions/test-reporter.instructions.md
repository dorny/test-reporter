---
applyTo: '**'
---

Instructions:

  - Ensure Node.js 20 is installed and used for all development and CI tasks.
  - Do not update the Node.js runtime to versions newer than 20.
  - Install all dependencies using `npm install`.
  - Use TypeScript for all source code; ensure `tsconfig.json` is present and configured.
  - Use `npm test` to run tests; ensure all tests pass before committing changes.
  - Validate changes by running `npm run all` before submitting pull requests or merging.
  - This project is a GitHub Actions action; ensure compatibility with GitHub Actions workflows.
  - After validating changes, create a new commit with the `dist/` directory included.
  - Document any changes to the action's inputs, outputs, or behavior in the README.
