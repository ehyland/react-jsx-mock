import ReactJSXDevRuntime from 'react/jsx-dev-runtime';
import { register } from './register';
import { IS_MOCK_JSX } from './constants';

export const Fragment = ReactJSXDevRuntime.Fragment;

export function jsxDEV(...args: Parameters<typeof ReactJSXDevRuntime.jsxDEV>) {
  const [type, ...rest] = args;
  const newType = register.get(type) ?? type;
  return ReactJSXDevRuntime.jsxDEV(newType, ...rest);
}

jsxDEV[IS_MOCK_JSX] = true;
