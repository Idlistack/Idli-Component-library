# Changelog

## 0.2.0

### Accessibility

- Contrast: `muted-foreground` is now ink-600 in the light theme (6.7:1 on `surface-muted`; was 4.2:1), and `subtle-foreground` is sand-600 (6.5:1 on white; was 4.48:1). Both pass WCAG AA everywhere they are used.
- `Field` names a `RadioGroup` with `aria-labelledby`, marks button-based controls (Select, Checkbox, Switch) required with `aria-required` instead of an invalid `required` attribute, keeps the label linked when a control sets its own `id`, and announces errors politely.
- `Alert` is no longer a live region by default, so alerts present on page load aren't read out. Pass `live` for alerts that appear in response to something.
- `Navbar`'s phone menu closes on Escape and returns focus to the menu button.

### Changed

- `Button` defaults to `type="button"`, so it no longer submits a surrounding form by accident. Pass `type="submit"` where you want that.
- `Button asChild` with `disabled` or `loading` now sets `aria-disabled`, removes the link from the tab order and blocks the click.

### Added

- `useFieldControl(props, kind)` for custom controls inside `Field`.
- `Tooltip` accepts `open`, `defaultOpen` and `onOpenChange`.
- `CardTitle` takes `as` (`h2`–`h4`); `AppCard`, `StackCard` and `PricingCard` take `headingLevel`.
- `require("@idlistack/ui")` works (exports gain a `default` condition), and `./package.json` is exported.

### Fixed

- Source maps for `dist/index.js` were one line off after the `"use client"` directive was added.
- `npm pack`/`npm publish` now builds the package first, so a stale or missing `dist` can't be published.

## 0.1.0

First release.
