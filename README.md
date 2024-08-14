# React JSX Mock <!-- omit from toc -->

Mock components at the JSX level

- Easily mock compoents by passing the real component
- Custom jest matches
- Types are infered from the real implementation

## Table of contents <!-- omit from toc -->

- [Setup (with vite / vitest)](#setup-with-vite--vitest)
- [Setup (with babel)](#setup-with-babel)
- [API](#api)
- [Inspiration](#inspiration)

## Setup (with vite / vitest)

See [examples/with-vitest](examples/with-vitest) for an example

Add `jsxImportSource` option to react vite plugin

```tsx
// vite.config.ts

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: process.env.VITEST ? 'react-jsx-mock' : 'react',
    }),
  ],
  test: {
    setupFiles: 'src/testSetup.ts',
    environment: 'happy-dom',
    globals: true,
  },
});
```

Add matchers

```tsx
// src/setupTests.ts

// Add custom jest matchers
import 'react-jsx-mock/jest-expect';
```

## Setup (with babel)

See [examples/with-babel](examples/with-babel) for an example

```tsx
// src/setupTests.ts

// Patch JSX functions
import 'react-jsx-mock/monkey-patch';

// Add custom jest matchers
import 'react-jsx-mock/jest-expect';
```

## API

```tsx
// src/components/Header.test.tsx

import { mockComponent } from 'react-jsx-mock';

// mock a component, use the default mock implementation "(props) => null"
const MockMenu = mockComponent(Menu);

// mock a component, providing a mock implementation
const MockMenu = mockComponent(Menu, (props) => (
  <div id={props.id} data-testid="mocked-menu" />
));

// assert the mock is rendered with a complete set of expected props
expect(MockMenu).toBeRenderedWithProps(expectedProps);

// assert the mock is rendered with a partial set of props
expect(MockMenu).toBeRenderedWithPropsMatching({ items: expectedItems });

// access currently rendered props (throws if not rendered once)
expect(MockMenu.mock.get().props.href).toBe('https://reactjs.org');

// access all currently rendered props directly
expect(MockMenu.mock.all().map(({ props }) => props.id)).toEqual([
  'a',
  'b',
  'c',
]);
```

## Inspiration

`react-jsx-mock` is inspired by [`react-remock`](https://github.com/theKashey/react-remock) with the addition of

- Mocked component render tracking
- Jest assertion helpers
- React 17 `react/jsx-dev-runtime` support
