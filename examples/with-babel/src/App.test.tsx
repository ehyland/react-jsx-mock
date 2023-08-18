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

  it('infers prop types from real component', () => {
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
      {
        "props": {
          "children": "Learn React",
          "href": "https://reactjs.org",
        },
      }
    `);
  });

  it('tracks the rendered instances', () => {
    expect(context.Mock.mock.all()).toMatchInlineSnapshot(`
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

describe('error messages', () => {
  let context: ReturnType<typeof setup>;

  const TestComponent = (props: { message: string; importance: number }) =>
    null;

  const setup = () => {
    return {
      MockTestComponent: mockComponent(TestComponent),
      ...render(
        <div>
          <TestComponent message="good morning" importance={1} />
          <TestComponent message="how are you" importance={2} />
          <TestComponent message="please buy stuff" importance={8} />
        </div>,
      ),
    };
  };

  beforeEach(() => {
    context = setup();
  });

  it('toBeRenderedWithPropsMatching renders a useful error message', () => {
    expect(() =>
      expect(context.MockTestComponent).toBeRenderedWithPropsMatching({
        message: 'goodbye',
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      "expected Mocked.TestComponent to be rendered with props containing
        Expected: ObjectContaining {"message": "goodbye"}
        Received: 3 instances with the following props
          
          - instance: 1 
            props: {"importance": 1, "message": "good morning"}

          - instance: 2 
            props: {"importance": 2, "message": "how are you"}

          - instance: 3 
            props: {"importance": 8, "message": "please buy stuff"}"
    `);
  });
});
