# Bug: Product category type error in mapper

**Date**: 2026-04-02
**Scope**: Frontend only
**File**: `src/infrastructure/api/mappers.ts`

## Problem

TypeScript build error at line 244:

```
Type 'string' is not assignable to type 'ProductCategory'.
```

`ApiProductResponse.category` was typed as `string`, but `Product.category` expects `ProductCategory` (a string literal union). The `mapProduct()` function assigned one to the other without validation.

## Root cause

The `category` field in the API response mapper was missing the same validation pattern already used for `tier` (via `validateTier()`) and `provider` (via `validateProvider()`).

## Fix

- Added `validateCategory()` function with `VALID_CATEGORIES` set and `"accessories"` as safe fallback
- Consistent with existing `validateTier()` and `validateProvider()` pattern
- Imported `ProductCategory` type

## Verification

- No remaining `ProductCategory` type errors in the codebase
- No other unsafe string-to-union assignments found in mappers
