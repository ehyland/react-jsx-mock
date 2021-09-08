import { render } from '@testing-library/react';
import App, { Link } from './App';
import { mockComponent } from 'react-jsx-mock';

describe('with default mock implementation', () => {
  let context: ReturnType<typeof setup>;

  const setup = () => {
    return { MockLink: mockComponent(Link), ...render(<App />) };
  };

  beforeEach(() => {
    context = setup();
  });

  it('inferes prop types from real component', () => {
    expect(context.MockLink.mock.first().props.href).toMatchInlineSnapshot(
      `"https://reactjs.org"`,
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
    expect(context.MockLink.mock.first()).toMatchInlineSnapshot(`
      Object {
        "props": Object {
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
            <img
              alt="logo"
              class="App-logo"
              src="logo.svg"
            />
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
      Mock: mockComponent(Link, (props) => <a data-testid="🥦" {...props} />),
      ...render(<App />),
    };
  };

  beforeEach(() => {
    context = setup();
  });

  it('tracks the props passed to the mock', () => {
    expect(context.Mock.mock.first()).toMatchInlineSnapshot(`
      Object {
        "props": Object {
          "children": "Learn React",
          "href": "https://reactjs.org",
        },
      }
    `);
  });

  it('tracks the rendered instances', () => {
    expect(context.Mock.mock.all()).toMatchInlineSnapshot(`
      Array [
        Object {
          "props": Object {
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
            <img
              alt="logo"
              class="App-logo"
              src="logo.svg"
            />
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
