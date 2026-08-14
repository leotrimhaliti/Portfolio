# leotrim.info

Personal portfolio of Leotrim Haliti — full-stack developer from Kosovo.

**Live:** [leotrim.info](https://leotrim.info)

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack, React 19)
- **Styling:** Tailwind CSS, Radix UI primitives, `next-themes` for dark mode
- **Content:** MDX blog posts rendered with `next-mdx-remote` + `sugar-high` syntax highlighting
- **Data:** Projects, career, and education live in typed JSON (`src/data/*.json`), validated at build time with Zod schemas (`src/lib/schemas.ts`)
- **Chatbot:** Custom streaming `useChat` hook (`src/hooks/useChat.ts`) talking to a Groq-backed route handler (`src/app/api/chat/route.ts`) — no heavy AI SDK dependency
- **Contact form:** Server action + Resend (`src/lib/actions.ts`)
- **Extras:** WebGL hover-distortion avatar (`hover-effect`) with a graceful non-WebGL fallback

## Architecture notes

- All portfolio content is data-driven: adding a project or job means editing a JSON file, not JSX. Zod parses the JSON at render time, so malformed data fails the build instead of shipping broken UI.
- Blog posts are `.mdx` files in `content/`, statically generated via `generateStaticParams`.
- The chat endpoint streams plain-text chunks over a `ReadableStream`; the client hook appends deltas to the last assistant message. ~100 lines total, replacing what used to be a multi-package AI SDK dependency tree.
- SEO: JSON-LD `Person` schema on the homepage, full Open Graph/Twitter metadata, Google site verification.

## Development

```bash
npm install
cp .env.example .env.local   # add RESEND_API_KEY and GROQ_API_KEY
npm run dev
```

| Script           | Purpose                        |
| ---------------- | ------------------------------ |
| `npm run dev`    | Dev server                     |
| `npm run build`  | Production build               |
| `npm run lint`   | ESLint 9 (flat config)         |
| `npm run format` | Prettier + Tailwind plugin     |

## Environment variables

| Variable         | Used for                       |
| ---------------- | ------------------------------ |
| `RESEND_API_KEY` | Contact form email delivery    |
| `GROQ_API_KEY`   | Portfolio chatbot (Llama 3.1)  |

Both are optional for local development — the site renders fine without them; only the contact form and chatbot need keys.
