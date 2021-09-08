const React = require('react');
const jsxDevRuntime = require('react/jsx-dev-runtime');

import { register } from './register';

const createElement = React.createElement;

React.createElement = (type: any, ...rest: any[]) => {
  const newType = register.get(type) ?? type;
  return createElement(newType, ...rest);
};

const jsxDEV = jsxDevRuntime.jsxDEV;

jsxDevRuntime.jsxDEV = (type: any, ...rest: any[]) => {
  const newType = register.get(type) ?? type;
  return jsxDEV(newType, ...rest);
};

export default undefined;
