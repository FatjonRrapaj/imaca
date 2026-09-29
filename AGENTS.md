<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep IMACA as a single scrolling plain HTML page (`index.html`) with in-page anchors, because the requested navigation must not create additional pages. The only exceptions are the legal pages `privacy.html` and `terms.html`, which the user explicitly requested; they share the homepage header, footer and `styles.css`.
- Keep IMACA dependency-free (plain HTML, CSS and JavaScript, no React, Bun or build step), because the site was deliberately converted away from a framework stack.
- Keep IMACA's visual tokens and reusable layout rules in `styles.css`, because the supplied references define a consistent dark-green and gold visual language.
