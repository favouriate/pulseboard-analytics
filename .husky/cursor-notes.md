      CURSOR CLEAN CODE RULES — FRONTEND / NEXT.JS / TYPESCRIPT/ SHADCNUI / REACT / SUPABASE
# ==========================================================

# ------------------------------
# GENERAL CODE QUALITY
# ------------------------------
- Always prioritize readability, maintainability, and consistency.
- Avoid deeply nested logic. Prefer early returns.
- Break large components, functions, or files into smaller, focused units.
- Enforce DRY (Don’t Repeat Yourself) — NEVER duplicate logic across files.
- Enforce SRP (Single Responsibility Principle) — every file/component/function does ONE thing well.
- Prefer pure functions whenever possible.

# ------------------------------
# NAMING RULES
# ------------------------------
- Variable names must be descriptive and meaningful.
- Avoid abbreviations except universal ones: id, url, api, db.
- React component file names use PascalCase.
- Utility files use camelCase.
- Hooks use the useXyz naming pattern.
- Pages follow Next.js conventions.

# ------------------------------
# REACT / NEXT.JS BEST PRACTICES
# ------------------------------
- Use Server Components (RSC) by default in Next.js 13+.
- Only add "use client" when absolutely necessary (state, effects, event handlers).
- Avoid unnecessary client components.
- Prefer server-side data fetching using async functions in RSC.
- Keep page-level components clean and logic-free; move logic to hooks or utils.
- Use React.memo for UI components that receive stable props.
- Prefer useCallback and useMemo only for expensive or unstable props.
- Avoid inline functions in JSX where unnecessary.

# ------------------------------
# TYPESCRIPT RULES
# ------------------------------
- Types must be explicit — no implicit any.
- Create types/interfaces in a /types folder when reused across the project.
- Avoid excessive any. Use unknown or properly typed generics instead.
- Use zod or similar schema validators for input validation.
- Functions must have typed parameters and return types.

# ------------------------------
# API & DATA LAYER
# ------------------------------
- All fetch requests must be wrapped inside a reusable function (e.g., /lib/api.ts).
- NEVER call fetch directly inside components unless it's RSC fetching.
- Use SWR or React Query for client-side caching when needed.
- Extract business logic into separate modules (services folder).

# ------------------------------
# UI & COMPONENT DESIGN
# ------------------------------
- Components should be reusable and stateless whenever possible.
- Avoid mixing business logic and UI markup.
- Move form logic, data transformations, and heavy logic into hooks.
- Separate UI components from functional components:  
  Example: /components/ui/Button.tsx vs /components/forms/LoginForm.tsx.
- Do not hardcode CSS — use Tailwind or shadcn best practices.

# ------------------------------
# FILE AND FOLDER STRUCTURE
# ------------------------------
- Follow clean architecture:
  /app  
  /components  
  /hooks  
  /lib  
  /types  
  /utils  

- Do not place business logic inside components.
- /app/api/ routes must remain thin and modular.

# ------------------------------
# PERFORMANCE RULES
# ------------------------------
- Avoid unnecessary state.
- Avoid rerenders by using memoization where needed.
- Use dynamic imports for heavy components.
- Optimize lists using keys and memoization.
- Avoid large bundle sizes — encourage code splitting.

# ------------------------------
# SECURITY RULES
# ------------------------------
- Never expose secrets or API keys in frontend.
- Validate and sanitize all user inputs.
- Use environment variables correctly with process.env.
- Remove console.logs before deployment.

# ------------------------------
# COMMIT & DOCUMENTATION RULES
# ------------------------------
- Write clean commits using conventional commit style:
  feat:, fix:, chore:, refactor:, perf:, docs:
- Always include comments for complex logic, but do not over-comment.
- Add minimal documentation when introducing new hooks, APIs, or utilities.

# ------------------------------
# WHAT TO AVOID
# ------------------------------
- No inline fetches in client components.
- No massive 200-line components.
- No prop drilling more than 3 levels.
- No business logic inside JSX.
- No untyped functions.
- No unused variables or imports.
- No long deeply nested conditions (prefer early exits).
- No mixing UI with data logic.

# ------------------------------
# AI BEHAVIOR IN CURSOR
# ------------------------------
- When asked to generate code, follow the rules above.
- When asked to refactor code, make decisions based on readability + scalability.
- Always default to clean architecture and modular design.
- If the user asks for code that violates these rules, politely suggest the correct best-practice version.