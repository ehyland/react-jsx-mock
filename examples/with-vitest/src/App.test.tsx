import { render } from '@testing-library/react';
import App, { Link } from './App';
import { mockComponent } from 'react-jsx-mock';
import { describe, it, beforeEach, expect } from 'vitest';

describe('with default mock implementation', () => {
  let context: ReturnType<typeof setup>;

  const setup = () => {
    return { MockLink: mockComponent(Link), ...render(<App />) };
  };

  beforeEach(() => {
    context = setup();
  });

  it('infers prop types from real component', () => {
    expect(context.MockLink.mock.get().props.href).toMatchInlineSnapshot(
      '"https://reactjs.org"',
    );
  });

  it('adds jest expect toBeRenderedWithProps', () => {
    expect(context.MockLink).toBeRenderedWithProps({
      children: 'Learn React',
      href: 'https://reactjs.org',
    });
  });

  it('adds jest expect toBeRenderedWithPropsMatching', () => {
    expect(context.MockLink).toBeRenderedWithPropsMatching({
      href: 'https://reactjs.org',
    });
  });

  it('tracks the props passed to the mock', () => {
    expect(context.MockLink.mock.get()).toMatchInlineSnapshot(`
      {
        "props": {
          "children": "Learn React",
          "href": "https://reactjs.org",
        },
      }
    `);
  });

  it('renders tree without mocked component', () => {
    expect(context.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="App"
        >
          <header
            class="App-header"
          >
            <p>
              Edit 
              <code>
                src/App.tsx
              </code>
               and save to reload.
            </p>
          </header>
        </div>
      </div>
    `);
  });
});

describe('with custom mock implementation', () => {
  let context: ReturnType<typeof setup>;

  const setup = () => {
    return {
      MockLink: mockComponent(Link, (props) => (
        <a data-testid="🥦" {...props} />
      )),
      ...render(<App />),
    };
  };

  beforeEach(() => {
    context = setup();
  });

  it('tracks the props passed to the mock', () => {
    expect(context.MockLink.mock.get()).toMatchInlineSnapshot(`
      {
        "props": {
          "children": "Learn React",
          "href": "https://reactjs.org",
        },
      }
    `);
  });

  it('tracks the rendered instances', () => {
    expect(context.MockLink.mock.all()).toMatchInlineSnapshot(`
      [
        {
          "props": {
            "children": "Learn React",
            "href": "https://reactjs.org",
          },
        },
      ]
    `);
  });

  it('renders the tree with the mocked link', () => {
    expect(context.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="App"
        >
          <header
            class="App-header"
          >
            <p>
              Edit 
              <code>
                src/App.tsx
              </code>
               and save to reload.
            </p>
            <a
              data-testid="🥦"
              href="https://reactjs.org"
            >
              Learn React
            </a>
          </header>
        </div>
      </div>
    `);
  });
});
