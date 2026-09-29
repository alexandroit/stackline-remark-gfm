# @stackline/remark-gfm

> remark plugin to support GFM (autolink literals, footnotes, strikethrough, tables, tasklists).

[![npm version](https://img.shields.io/npm/v/@stackline/remark-gfm.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/remark-gfm)
[![license](https://img.shields.io/npm/l/@stackline/remark-gfm.svg?style=flat-square)](https://github.com/alexandroit/stackline-remark-gfm)
[![GitHub repository](https://img.shields.io/badge/GitHub-repository-181717?style=flat-square&logo=github)](https://github.com/alexandroit/stackline-remark-gfm)
[![Docs](https://img.shields.io/badge/docs-alexandro.net-0f766e?style=flat-square)](https://alexandro.net/docs/vanilla/remark-gfm/)
[![Reddit community](https://img.shields.io/badge/community-r%2FStackline-ff4500?style=flat-square&logo=reddit&logoColor=white)](https://www.reddit.com/r/Stackline/)

**[Documentation](https://alexandro.net/docs/vanilla/remark-gfm/)** | **[npm](https://www.npmjs.com/package/@stackline/remark-gfm)** | **[Issues](https://github.com/alexandroit/stackline-remark-gfm/issues)** | **[Repository](https://github.com/alexandroit/stackline-remark-gfm)**

**Current package version:** `1.0.2`

---

## Why this package?

`@stackline/remark-gfm` is the Stackline-maintained distribution of `remark-gfm@3.0.1`. It is an independent continuation of [remark-gfm](https://github.com/remarkjs/remark-gfm); original authors and licenses remain credited below.

## Compatibility

| Item | Value |
| :--- | :--- |
| Package | `@stackline/remark-gfm@1.0.2` |
| API target | `remark-gfm@3.0.1` |
| Supported Node.js | `See supported framework requirements` |
| License | `MIT` |
| Module type | `module` |
| Main entry | `index.js` |
| Types | `index.d.ts` |
| Runtime dependencies | `unified, @types/mdast, mdast-util-gfm, micromark-extension-gfm` |

## Installation

```bash
npm install @stackline/remark-gfm
```

Preserve existing imports and plugin resolution with an npm alias:

```bash
npm install remark-gfm@npm:@stackline/remark-gfm
```

## Usage and API reference

### remark-gfm


**[remark][]** plugin to support [GFM][] (autolink literals, footnotes,
strikethrough, tables, tasklists).

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(remarkGfm[, options])`](#unifieduseremarkgfm-options)
*   [Examples](#examples)
    *   [Example: `singleTilde`](#example-singletilde)
    *   [Example: `stringLength`](#example-stringlength)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([remark][]) plugin to enable the extensions to
markdown that GitHub adds: autolink literals (`www.x.com`), footnotes (`[^1]`),
strikethrough (`~~stuff~~`), tables (`| cell |…`), and tasklists (`* [x]`).
You can use this plugin to add support for parsing and serializing them.
These extensions by GitHub to CommonMark are called [GFM][] (GitHub Flavored
Markdown).

**unified** is a project that transforms content with abstract syntax trees
(ASTs).
**remark** adds support for markdown to unified.
**mdast** is the markdown AST that remark uses.
This is a remark plugin that transforms mdast.

## When should I use this?

This project is useful when you want to support the same features that GitHub
does in files in a repo, Gists, and several other places.
Users frequently believe that some of these extensions, specifically autolink
literals and tables, are part of normal markdown, so using `remark-gfm` will
help match your implementation to their understanding of markdown.
There are several edge cases where GitHub’s implementation works in unexpected
ways or even different than described in their spec, so *writing* in GFM is not
always the best choice.

This plugin does not handle how markdown is turned to HTML.
That’s done by [`remark-rehype`][remark-rehype].
If your content is not in English and uses footnotes, you should configure that
plugin.
When generating HTML, you might also want to enable [`rehype-slug`][rehype-slug]
to add `id`s on headings.

A different plugin, [`remark-frontmatter`][remark-frontmatter], adds support for
frontmatter.
GitHub supports YAML frontmatter for files in repos and Gists but they don’t
treat it as part of GFM.

Another plugin, [`remark-github`][remark-github], adds support for how markdown
works in relation to a certain GitHub repo in comments, issues, PRs, and
releases, by linking references to commits, issues, and users.

Yet another plugin, [`remark-breaks`][remark-breaks], turns soft line endings
(enters) into hard breaks (`<br>`s).
GitHub does this in a few places (comments, issues, PRs, and releases).

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install @stackline/remark-gfm
```

In Deno with [Skypack][]:

```js
import remarkGfm from 'https://cdn.skypack.dev/remark-gfm@3?dts'
```

In browsers with [Skypack][]:

```html
<script type="module">
  import remarkGfm from 'https://cdn.skypack.dev/remark-gfm@3?min'
</script>
```

## Use

Say we have the following file `example.md`:

```markdown
# GFM

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |

## Tasklist

* [ ] to do
* [x] done
```

And our module `example.js` looks as follows:

```js
import {read} from 'to-vfile'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from '@stackline/remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

main()

async function main() {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(await read('example.md'))

  console.log(String(file))
}
```

Now running `node example` yields:

```html
<h1>GFM</h1>
<h2>Autolink literals</h2>
<p><a href="http://www.example.com">www.example.com</a>, <a href="https://example.com">https://example.com</a>, and <a href="mailto:contact@example.com">contact@example.com</a>.</p>
<h2>Footnote</h2>
<p>A note<sup><a href="#user-content-fn-1" id="user-content-fnref-1" data-footnote-ref aria-describedby="footnote-label">1</a></sup></p>
<h2>Strikethrough</h2>
<p><del>one</del> or <del>two</del> tildes.</p>
<h2>Table</h2>
<table>
<thead>
<tr>
<th>a</th>
<th align="left">b</th>
<th align="right">c</th>
<th align="center">d</th>
</tr>
</thead>
</table>
<h2>Tasklist</h2>
<ul class="contains-task-list">
<li class="task-list-item"><input type="checkbox" disabled> to do</li>
<li class="task-list-item"><input type="checkbox" checked disabled> done</li>
</ul>
<section data-footnotes class="footnotes"><h2 id="footnote-label" class="sr-only">Footnotes</h2>
<ol>
<li id="user-content-fn-1">
<p>Big note. <a href="#user-content-fnref-1" data-footnote-backref class="data-footnote-backref" aria-label="Back to content">↩</a></p>
</li>
</ol>
</section>
```

## API

This package exports no identifiers.
The default export is `remarkGfm`.

### `unified().use(remarkGfm[, options])`

Plugin to support [GFM][] (autolink literals, footnotes, strikethrough, tables,
tasklists).

##### `options`

Configuration (optional).

###### `options.singleTilde`

Whether to parse strikethrough with a single tilde (`boolean`, default:
`true`).
Single tildes work on github.com, but are technically prohibited by the GFM
spec.

###### `options.tableCellPadding`

Serialize tables with a space between delimiters (`|`) and cell content
(`boolean`, default: `true`).

###### `options.tablePipeAlign`

Serialize by aligning the delimiters (`|`) between table cells so that they all
align nicely and form a grid (`boolean`, default: `true`).

###### `options.stringLength`

Function to detect the length of table cell content (`Function`, default:
`s => s.length`).
This is used when aligning the delimiters (`|`) between table cells.
Full-width characters and emoji mess up delimiter alignment when viewing the
markdown source.
To fix this, you can pass this function, which receives the cell content and
returns its “visible” size.
Note that what is and isn’t visible depends on where the text is displayed.

## Examples

### Example: `singleTilde`

To turn off support for parsing strikethrough with single tildes, pass
`singleTilde: false`:

```js
// …

const file = await unified()
  .use(remarkParse)
  .use(remarkGfm, {singleTilde: false})
  .use(remarkRehype)
  .use(rehypeStringify)
  .process('~one~ and ~~two~~')

console.log(String(file))
```

Yields:

```html
<p>~one~ and <del>two</del></p>
```

### Example: `stringLength`

It’s possible to align tables based on the visual width of cells.
First, let’s show the problem:

```js
import {remark} from 'remark'
import remarkGfm from '@stackline/remark-gfm'

main()

async function main() {
  const input = `| Alpha | Bravo |
| - | - |
| 中文 | Charlie |
| 👩‍❤️‍👩 | Delta |`

  const file = await remark()
    .use(remarkGfm)
    .process(input)

  console.log(String(file))
}
```

The above code shows how remark can be used to format markdown.
The output is as follows:

```markdown
| Alpha    | Bravo   |
| -------- | ------- |
| 中文       | Charlie |
| 👩‍❤️‍👩 | Delta   |
```

To improve the alignment of these full-width characters and emoji, pass a
`stringLength` function that calculates the visual width of cells.
One such algorithm is [`string-width`][string-width].
It can be used like so:

```diff
@@ -1,5 +1,6 @@
 import {remark} from 'remark'
 import remarkGfm from '@stackline/remark-gfm'
+import stringWidth from 'string-width'

 main()

@@ -10,7 +11,7 @@ async function main() {
 | 👩‍❤️‍👩 | Delta |`

   const file = await remark()
-    .use(remarkGfm)
+    .use(remarkGfm, {stringLength: stringWidth})
     .process(input)

   console.log(String(file))
```

The output of our code with these changes is as follows:

```markdown
| Alpha | Bravo   |
| ----- | ------- |
| 中文  | Charlie |
| 👩‍❤️‍👩    | Delta   |
```

## Types

This package is fully typed with [TypeScript][].
It exports an `Options` type, which specifies the interface of the accepted
options.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

This plugin works with `remark-parse` version 10+ (`remark` version 14+).
The previous version (v2) worked with `remark-parse` version 9 (`remark`
version 13).
Earlier versions of `remark-parse` and `remark` had a `gfm` option that enabled
this functionality, which defaulted to true.

## Security

Use of `remark-gfm` does not involve **[rehype][]** (**[hast][]**) so there are
no openings for [cross-site scripting (XSS)][xss] attacks.

## Related

*   [`remark-github`][remark-github]
    — link references to commits, issues, PRs, and users
*   [`remark-breaks`][remark-breaks]
    — support breaks without needing spaces or escapes (enters to `<br>`)
*   [`remark-frontmatter`][remark-frontmatter]
    — support frontmatter (YAML, TOML, and more)
*   [`remark-directive`](https://github.com/remarkjs/remark-directive)
    — support directives
*   [`remark-math`](https://github.com/remarkjs/remark-math)
    — support math

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]



[build-badge]: https://github.com/remarkjs/remark-gfm/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-gfm/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-gfm.svg

[coverage]: https://codecov.io/github/remarkjs/remark-gfm

[downloads-badge]: https://img.shields.io/npm/dm/remark-gfm.svg

[downloads]: https://www.npmjs.com/package/remark-gfm

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-gfm.svg

[size]: https://bundlephobia.com/result?p=remark-gfm

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[skypack]: https://www.skypack.dev

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[remark]: https://github.com/remarkjs/remark

[unified]: https://github.com/unifiedjs/unified

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[typescript]: https://www.typescriptlang.org

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast

[gfm]: https://github.github.com/gfm/

[remark-frontmatter]: https://github.com/remarkjs/remark-frontmatter

[remark-github]: https://github.com/remarkjs/remark-github

[remark-breaks]: https://github.com/remarkjs/remark-breaks

[remark-rehype]: https://github.com/remarkjs/remark-rehype

[rehype-slug]: https://github.com/rehypejs/rehype-slug

[string-width]: https://github.com/sindresorhus/string-width

## Credits and original authors

- Original project: [remark-gfm](https://github.com/remarkjs/remark-gfm).
- Titus Wormer.
- Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com>.
- Stackline maintenance: [Alexandro Paixao Marques](https://www.linkedin.com/in/aleinfo/) and [Stackline contributors](https://github.com/alexandroit).

Original copyright, license notices and contributor acknowledgements remain part of this distribution. Stackline maintenance does not replace authorship of the original work.

## Community and Links

- [Stackline website](https://alexandro.net/)
- [GitHub projects](https://github.com/alexandroit)
- [npm packages](https://www.npmjs.com/~alex360qc)
- [Reddit community — r/Stackline](https://www.reddit.com/r/Stackline/)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)

Use this repository's issue tracker for reproducible bugs and feature requests. Join r/Stackline for examples, usage questions and release discussions.
