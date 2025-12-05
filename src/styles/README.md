# Design System Tokens

This document describes the three-layer token architecture used in Pulseboard Analytics, following best practices for scalable design systems.

## Token Architecture

Our design system uses a **three-layer token architecture**:

1. **Foundation Tokens** → Raw values (colors, spacing, typography)
2. **Semantic Tokens** → Meaning-based tokens (bg-surface, text-default)
3. **Component Tokens** → Component-specific tokens (button-primary-bg, card-border)

This layered approach ensures consistency, maintainability, and easy theming.

---

## 1. Foundation Tokens

Foundation tokens are the raw, unprocessed values that form the base of our design system.

### Brand Colors

```css
--color-brand-900: #1b3c53;        /* Primary brand color (dark teal) */
--color-brand-800: #2a4d66;        /* Brand hover state */
--color-brand-700: #3a5e79;        /* Brand light variant */
--color-surface-cream: #faf3e1;    /* Primary surface color */
--color-surface-light: #fcf6d9;    /* Light surface variant */
--color-surface-warm: #f5e6d3;     /* Warm surface variant */
```

### Neutral Colors

```css
--color-neutral-50 through --color-neutral-900
```

A full grayscale palette from lightest to darkest.

### Spacing Scale

Based on an 8px base unit:

```css
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
```

### Typography Scale

```css
/* Font Sizes */
--font-size-xs: 0.75rem;     /* 12px */
--font-size-sm: 0.875rem;    /* 14px */
--font-size-base: 1rem;      /* 16px */
--font-size-lg: 1.125rem;    /* 18px */
--font-size-xl: 1.25rem;     /* 20px */
--font-size-2xl: 1.5rem;     /* 24px */
--font-size-3xl: 1.875rem;   /* 30px */
--font-size-4xl: 2.25rem;    /* 36px */

/* Font Weights */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Line Heights */
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

---

## 2. Semantic Tokens

Semantic tokens map foundation tokens to meaningful, context-aware names. They describe **what** the token is used for, not **where**.

### Backgrounds

```css
--bg-app: var(--color-brand-900);              /* Main app background */
--bg-surface: var(--color-surface-cream);      /* Default surface */
--bg-surface-elevated: #ffffff;                 /* Elevated surfaces (cards, modals) */
--bg-surface-light: var(--color-surface-light); /* Light surface variant */
```

### Text Colors

```css
--text-default: var(--color-brand-900);    /* Primary text */
--text-muted: var(--color-neutral-600);    /* Secondary/muted text */
--text-subtle: var(--color-neutral-500);   /* Subtle text (hints, labels) */
--text-on-dark: #f9fafb;                   /* Text on dark backgrounds */
--text-on-brand: var(--color-surface-cream); /* Text on brand color */
```

### Borders

```css
--border-subtle: #e2d8b8;              /* Subtle borders (dividers) */
--border-strong: var(--color-brand-900); /* Strong borders (focus states) */
--border-neutral: var(--color-neutral-200); /* Neutral borders */
```

**Usage Example:**

```tsx
<div className="bg-[var(--bg-surface)] text-[var(--text-default)] border-[var(--border-subtle)]">
  Content
</div>
```

---

## 3. Component Tokens

Component tokens are specific to individual components and use semantic tokens as their base.

### Button Tokens

```css
--button-primary-bg: var(--color-brand-900);
--button-primary-text: var(--color-surface-cream);
--button-primary-hover: var(--color-brand-800);
```

### Card Tokens

```css
--card-bg: var(--bg-surface-elevated);
--card-border: var(--border-subtle);
--card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
```

### Input Tokens

```css
--input-bg: var(--bg-surface-elevated);
--input-border: var(--border-subtle);
--input-border-focus: var(--color-brand-900);
```

**Usage Example:**

```tsx
<button 
  className="bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] hover:bg-[var(--button-primary-hover)]"
>
  Click me
</button>
```

---

## Usage Guidelines

### 1. Prefer Semantic Tokens

Always use semantic tokens in components rather than foundation tokens directly:

✅ **Good:**
```tsx
<div className="bg-[var(--bg-surface)] text-[var(--text-default)]">
```

❌ **Avoid:**
```tsx
<div className="bg-[var(--color-surface-cream)] text-[var(--color-brand-900)]">
```

### 2. Use Component Tokens for Component-Specific Styling

When styling a specific component, use component tokens:

✅ **Good:**
```tsx
<Card className="bg-[var(--card-bg)] border-[var(--card-border)]">
```

### 3. Combine with Tailwind Utilities

You can combine tokens with Tailwind's utility classes:

```tsx
<div className="p-4 bg-[var(--bg-surface)] rounded-lg border border-[var(--border-subtle)]">
  Content
</div>
```

### 4. Responsive Usage

Use Tailwind's responsive prefixes with tokens:

```tsx
<div className="p-4 md:p-6 lg:p-8 bg-[var(--bg-surface)]">
  Responsive padding with token background
</div>
```

---

## Dark Mode

Dark mode automatically adjusts semantic and component tokens. Foundation tokens remain the same, but semantic mappings change:

```css
.dark {
  --bg-app: #020617;
  --bg-surface: #020617;
  --bg-surface-elevated: #1e293b;
  --text-default: #f9fafb;
  --text-muted: #9ca3af;
  /* ... */
}
```

Components using semantic tokens will automatically adapt to dark mode without code changes.

---

## Examples

### Building a Button

```tsx
// Using component tokens
<button className="bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] px-4 py-2 rounded-md">
  Primary Button
</button>

// Using semantic tokens (more flexible)
<button className="bg-[var(--color-brand-900)] text-[var(--text-on-brand)] px-4 py-2 rounded-md hover:bg-[var(--color-brand-800)]">
  Custom Button
</button>
```

### Building a Card

```tsx
<div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-6 shadow-[var(--card-shadow)]">
  <h2 className="text-[var(--text-default)] text-xl font-semibold">Card Title</h2>
  <p className="text-[var(--text-muted)] mt-2">Card content</p>
</div>
```

### Building an Input

```tsx
<input 
  className="bg-[var(--input-bg)] border border-[var(--input-border)] rounded-md px-3 py-2 focus:border-[var(--input-border-focus)] focus:outline-none"
  type="text"
/>
```

---

## Token Naming Conventions

- **Foundation tokens**: `--color-*`, `--spacing-*`, `--font-size-*`, `--font-weight-*`
- **Semantic tokens**: `--bg-*`, `--text-*`, `--border-*`
- **Component tokens**: `--button-*`, `--card-*`, `--input-*`

---

## Best Practices

### 1. Always Use Semantic Tokens First

Semantic tokens provide meaning and context. They make your code more maintainable and themeable.

### 2. Avoid Hardcoded Colors

Never use hardcoded hex values directly in components. Always use tokens:

❌ **Bad:**
```tsx
<div className="bg-#1B3C53 text-white">
```

✅ **Good:**
```tsx
<div className="bg-[var(--bg-app)] text-[var(--text-on-dark)]">
```

### 3. Use Component Tokens for Reusable Components

When building reusable components, use component tokens for consistency:

```tsx
<Button className="bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]">
```

### 4. Combine with Tailwind Utilities

Tokens work seamlessly with Tailwind's utility classes:

```tsx
<div className="p-4 md:p-6 bg-[var(--bg-surface)] rounded-lg shadow-md">
```

## Token Maintenance

### Adding New Tokens

1. **Foundation Token**: Add to `src/app/globals.css` under the appropriate section
2. **Semantic Token**: Map foundation token to semantic meaning
3. **Component Token**: Create if needed for specific components
4. **Documentation**: Update this README with examples

### Updating Existing Tokens

- Changes to foundation tokens affect all semantic and component tokens
- Test thoroughly after changing foundation tokens
- Update dark mode overrides if needed

## Future Enhancements

- [ ] TypeScript typings for token values
- [ ] Token documentation generator
- [ ] Visual token reference in Storybook
- [ ] Automated token validation in CI/CD
- [ ] Token usage analytics

