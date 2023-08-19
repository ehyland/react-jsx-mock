import React, { ComponentProps } from 'react';

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
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Link href="https://reactjs.org">Learn React</Link>
      </header>
    </div>
  );
}

export default App;
