# Contributing

This repository generates one person's CV. The CV content is not open for
changes, but bug reports and fixes to the generator are welcome.

## Reporting

Open an issue for a broken layout, a wrong character or a generator error. Say
which language and variant, and attach the PDF page or the full error.

## Changing the code

`main` cannot be force-pushed or deleted.

1. Fork the repository and create a branch.
2. Change the generator (`create_cv.js`, `generate_all.sh`), not the content in
   `data/`.
3. Rebuild every variant and check the PDFs:

   ```bash
   npm install
   ./generate_all.sh
   ```

4. Open the pull request and describe what changed and why, with a screenshot of
   an affected page.

By contributing you agree that your generator changes are published under the
[MIT License](LICENSE). The CV content and logos are not covered by it.
