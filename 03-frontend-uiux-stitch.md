# Phase 3: Stitch MCP Integration & Professional UI Scaffold

## Objective
Initialize the frontend, connect to the Stitch MCP for professional UI/UX tokens, and configure a bespoke, non-white design system.

## Execution Steps
1. **Initialize React App (Windows):**
   Run in PowerShell:
   `npm create vite@latest frontend -- --template react-ts`
   `cd frontend`
   `npm install axios zustand react-router-dom tailwindcss postcss autoprefixer lucide-react @radix-ui/react-dialog @radix-ui/react-tooltip @radix-ui/react-slot clsx tailwind-merge`
   `npx tailwindcss init -p`

2. **Stitch MCP Configuration:**
   - Create `frontend\stitch-mcp.config.json` to define the connection parameters to the Stitch UI/UX design token server.
   - Instruct the MCP client to fetch the professional design system tokens (typography scales, border-radii, elevation shadows, and the vibrant light palette).

3. **Bespoke Tailwind Configuration (Anti-Slop):**
   Modify `frontend\tailwind.config.js` to implement the professional tokens retrieved via Stitch:
   - Override the default color palette to enforce the vibrant light theme. Map standard UI elements (backgrounds, cards, popovers) to `sky-50`, `rose-50`, or `amber-50`. 
   - Ensure `#FFFFFF` is completely removed from the theme configuration.
   - Add custom box-shadows for professional depth (e.g., subtle, multi-layered shadows).
   - Define a custom typography scale using a professional sans-serif font (e.g., Inter or Geist).

4. **Design System Primitives (src/components/common):**
   - Use the Stitch schemas to create `frontend\src\components\common\Card.tsx`, `Button.tsx`, and `Input.tsx`. 
   - Apply `clsx` and `tailwind-merge` for clean utility class composition.
   - Ensure focus rings use `:focus-visible` with an offset for high accessibility, matching a senior UI engineer's standard.

5. **State Management Setup:**
   - Create `frontend\src\store\useJobStore.ts` using Zustand to manage global state for active DSP jobs.
