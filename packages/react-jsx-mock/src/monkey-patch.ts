const React = require('react');
const jsxDevRuntime = require('react/jsx-dev-runtime');
const jsxRuntime = require('react/jsx-runtime');

import { register } from './register';

const createElement = React.createElement;

React.createElement = (type: any, ...rest: any[]) => {
  const newType = register.get(type) ?? type;
  return createElement(newType, ...rest);
};

Object.assign(React.createElement, { __react_jsx_mock__: true });

const jsxDEV = jsxDevRuntime.jsxDEV;

jsxDevRuntime.jsxDEV = (type: any, ...rest: any[]) => {
  const newType = register.get(type) ?? type;
  return jsxDEV(newType, ...rest);
};

Object.assign(jsxDevRuntime.jsxDEV, { __react_jsx_mock__: true });

const jsx = jsxRuntime.jsx;

jsxRuntime.jsx = (type: any, ...rest: any[]) => {
  const newType = register.get(type) ?? type;
  return jsx(newType, ...rest);
};

Object.assign(jsxRuntime.jsx, { __react_jsx_mock__: true });

export default undefined;
