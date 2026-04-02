---
date: 2026-04-02
type: bug
scope: frontend
slug: category-filter-margin
---

# Bug: Category filter too close to element above

## Symptom
In the `/tienda` page, the `CategoryFilter` component had no top margin, causing it to appear visually attached to the `AffiliateDisclosure` banner above it.

## Root cause
`CategoryFilter.tsx` root `div` only had `mb-10` (bottom margin) but no top margin, leaving no breathing room between it and the preceding element.

## Fix
Added `mt-6` to the root `div` of `CategoryFilter.tsx`.

## Files modified
- `src/components/organisms/CategoryFilter.tsx` — added `mt-6` to root div class
