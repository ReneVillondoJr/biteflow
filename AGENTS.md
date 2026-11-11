<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Module Structure

- Use each feature module's `index.tsx` as its composition entry point: it owns the module hook invocation and wires the feature components together.
- Keep route files thin; import the module from `@/modules/<feature>` and render it.
- Do not add a separate `*-page.tsx` composition wrapper when `index.tsx` can serve as the module entry. Keep reusable presentation components, hooks, data, types, and schemas in their respective folders.
