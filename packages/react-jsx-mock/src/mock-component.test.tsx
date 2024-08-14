import './monkey-patch';
import './jest-expect';
import { mockComponent } from './mock-component';
import { render, screen } from '@testing-library/react';

describe('without mocking', () => {
  it('renders the component', () => {
    const TestChild = () => {
      return <div>Test child content</div>;
    };
    const TestComponent = () => {
      return <TestChild />;
    };
    const { container } = render(<TestComponent />);

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div>Test child content</div>"`,
    );
  });
});

describe('mocked without content', () => {
  it('renders nothing', () => {
    const TestChild = () => {
      return <div>Test child content</div>;
    };
    const TestComponent = () => {
      return <TestChild />;
    };
    mockComponent(TestChild);
    const { container } = render(<TestComponent />);

    expect(container.innerHTML).toMatchInlineSnapshot(`""`);
  });

  it('tracks when the component is rendered', () => {
    const TestChild = (props: { id: string }) => {
      return <div>Test child content</div>;
    };
    const TestComponent = () => {
      return (
        <>
          <TestChild id="child 1" />
          <TestChild id="child 2" />
        </>
      );
    };
    const mock = mockComponent(TestChild);
    const context = render(<TestComponent />);

    expect(mock.mock.all()).toEqual([
      { props: { id: 'child 1' } },
      { props: { id: 'child 2' } },
    ]);

    context.unmount();

    expect(mock.mock.all()).toEqual([]);
  });
});

describe('mocked with replacement content', () => {
  it('renders the mock content', () => {
    const TestChild = () => {
      return <div>Test child content</div>;
    };
    const TestComponent = () => {
      return <TestChild />;
    };
    mockComponent(TestChild, () => <p>This is the mock content</p>);
    const { container } = render(<TestComponent />);

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<p>This is the mock content</p>"`,
    );
  });

  it('calls the replacement with the original props', () => {
    type TestChildProps = { id: string };
    const TestChild = (props: TestChildProps) => {
      return <div id={props.id}>Test child content</div>;
    };
    const TestComponent = () => {
      return <TestChild id="123" />;
    };
    mockComponent(TestChild, ({ id }) => <p>The id was "{id}"</p>);
    const { container } = render(<TestComponent />);

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<p>The id was "123"</p>"`,
    );
  });
});

describe('mock.replace()', () => {
  it('mock content can be replaced', () => {
    const TestChild = () => {
      return <div>Test child content</div>;
    };
    const TestComponent = () => {
      return <TestChild />;
    };
    const component = mockComponent(TestChild, () => (
      <p>This is the initial mock content</p>
    ));
    const { container, rerender } = render(<TestComponent />);

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<p>This is the initial mock content</p>"`,
    );

    component.mock.replace(() => <p>This is the updated mock content</p>);

    rerender(<TestComponent />);

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<p>This is the updated mock content</p>"`,
    );
  });
});
