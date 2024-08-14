import ReactJSXRuntime from 'react/jsx-runtime';
import { register } from './register';
import { IS_MOCK_JSX } from './constants';

export const Fragment = ReactJSXRuntime.Fragment;

export function jsx(...args: Parameters<typeof ReactJSXRuntime.jsx>) {
  const [type, ...rest] = args;
  const newType = register.get(type) ?? type;
  return ReactJSXRuntime.jsx(newType, ...rest);
}

jsx[IS_MOCK_JSX] = true;

export function jsxs(...args: Parameters<typeof ReactJSXRuntime.jsxs>) {
  const [type, ...rest] = args;
  const newType = register.get(type) ?? type;
  return ReactJSXRuntime.jsxs(newType, ...rest);
}

jsxs[IS_MOCK_JSX] = true;
