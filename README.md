# ui-essentials

**Lightweight utilities for dashboards: color, layout, formatting, and more.**  
Designed to be small, fast, and easy to integrate into any project.

---

## ✨ Features

- 🎨 **Color utilities**: conversions, luminance, contrast, theme generation
- 🧱 **Layout helpers**: skeleton lines, text truncation, overflow detection
- 📦 **Icon mapping**: consistent emoji/icon per string value
- 🔁 **React hooks**: `usePrevious`, and more coming soon
- 🧩 **Modular design**: import only what you need
- 🪶 **Zero dependencies in core**

---

## 🚀 Installation

```bash
npm install ui-essentials
```

> You can also use:
> ```bash
> yarn add ui-essentials
> ```
> or
> ```bash
> pnpm add ui-essentials
> ```

---

## 📦 Usage

### Color

```ts
import { hexToRgb, rgbToHex, getLuminance } from 'ui-essentials';

const rgb = hexToRgb('#ffcc00');
const hex = rgbToHex({ r: 255, g: 100, b: 50 });
const contrast = getLuminance(rgb!);
```

### UI Helpers

```ts
import { stringToIcon, generateSkeletonLines, truncateMiddle } from 'ui-essentials';

const icon = stringToIcon('Settings'); // e.g. 📦
const lines = generateSkeletonLines(4); // [0, 1, 2, 3]
const text = truncateMiddle('my-long-text', 8); // 'my...xt'
```

### React

```ts
import { usePrevious } from 'ui-essentials/react';

const prevValue = usePrevious(currentValue);
```

---

## 📁 File structure

- `src/color/` → public color utilities and theme generation
- `src/utils/` → internal helpers and shared logic
- `src/react/` → React-specific hooks (e.g. `usePrevious`)

---

## 🧪 Development

```bash
# Start the playground
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

---

## 📜 License

MIT © [victoryil](https://github.com/victoryil)

---

## 💡 Ideas or contributions?

Feel free to open an [issue](https://github.com/victoryil/ui-essentials/issues) or submit a pull request!
