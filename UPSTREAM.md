# Upstream and maintenance review

Independent maintenance of `remark-gfm@3.0.1` as `@stackline/remark-gfm`.

- Source history: https://github.com/remarkjs/remark-gfm/tree/0af02a87e5d512da66fad2462401d7ab78911558
- Original npm integrity: `sha512-lEFDoi2PICJyNrACFOfDD3JlLkuSbOa5Wd8EPt06HUdptv8Gn0bxYTdbU/XXQ3swAPkEaGxxPN9cbnMHvVu1Ig==`.
- Issues checked: 2026-09-29T00:22:04.881958+00:00.
- Original authors, notices and license are retained. Published runtime and declaration file hashes are recorded in `.stackline/upstream.json`; reviewed differences are explicitly listed there.
- Original functional suites run against both source and the extracted final tarball. Type checks and the complete development/runtime audit must pass.

## Issue triage

- https://github.com/remarkjs/remark-gfm/issues/79: The missing position on a bracketed literal autolink also reproduces on the selected 3.0.1 base. It originates in the syntax extension, remains a known limitation, and is not claimed fixed. The original package and this fork are compared on every retained fixture under the same locked dependency graph.
- https://github.com/remarkjs/remark-gfm/issues/78: Custom mcp URL autolinking is a feature request beyond the GFM literal-autolink rules. Existing GFM behavior is preserved.

Historical snapshots were checked against an independently installed exact original npm package before refresh. All fixtures retain differential AST and serialization checks against that original package.

The evidence query fetched the latest 100 open and 30 closed issue/PR entries and removed PRs. This is a bounded review, not a claim of exhaustive issue history or resolution of every issue.

## Release verification

GitHub Actions publishes the reviewed passing-CI tarball. Release completion requires exact source identity, zero open CodeQL alerts, npm provenance and tarball identity, normal and aliased installs, and matching immutable GitHub release assets. Existing versions are never replaced.
