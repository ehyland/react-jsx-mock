import React, { ComponentProps } from 'react';
import logo from './logo.svg';
import './App.css';

export function Link(props: ComponentProps<'a'>) {
  return (
    <a
      className="App-link"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Link href="https://reactjs.org">Learn React</Link>
      </header>
    </div>
  );
}

export default App;
