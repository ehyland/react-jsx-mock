import './monkey-patch';
import './jest-expect';
import { mockComponent } from './mock-component';
import { render } from '@testing-library/react';

const TestComponent = (props: Record<string, unknown>) => null;
const mockedComponent = mockComponent(TestComponent);

describe('toBeRenderedWithProps()', () => {
  it('throws an error when props are not a complete match', () => {
    render(
      <>
        <TestComponent message="hello" line={1} />
        <TestComponent message="world" line={2} />
      </>,
    );

    expect(() => expect(mockedComponent).toBeRenderedWithProps({ line: 1 }))
      .toThrowErrorMatchingInlineSnapshot(`
      "expected Mocked.TestComponent to be rendered with exact props
        Expected: {"line": 1}
        Received: 2 instances rendered
          
          - instance: 1 
            props: {"line": 1, "message": "hello"}

          - instance: 2 
            props: {"line": 2, "message": "world"}"
    `);
  });

  it('throws an error when no components are rendered', () => {
    render(
      <>
        <a href="#" />
        <span>hello</span>
      </>,
    );

    expect(() => expect(mockedComponent).toBeRenderedWithProps({ line: 1 }))
      .toThrowErrorMatchingInlineSnapshot(`
      "expected Mocked.TestComponent to be rendered with exact props
        Expected: {"line": 1}
        Received: 0 instances rendered
          "
    `);
  });

  it('passes when component is rendered', () => {
    render(
      <>
        <TestComponent message="hello" line={1} />
        <TestComponent message="world" line={2} />
      </>,
    );

    expect(mockedComponent).toBeRenderedWithProps({
      message: 'hello',
      line: 1,
    });

    expect(mockedComponent).toBeRenderedWithProps({
      message: 'world',
      line: 2,
    });
  });

  it('throws when component is rendered and not clause is used', () => {
    render(
      <>
        <TestComponent message="hello" line={1} />
        <TestComponent message="world" line={2} />
      </>,
    );

    expect(() =>
      expect(mockedComponent).not.toBeRenderedWithProps({
        message: 'hello',
        line: 1,
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      "expected Mocked.TestComponent not to be rendered with exact props
        Expected: {"line": 1, "message": "hello"}
        Received: 2 instances rendered
          
          - instance: 1 
            props: {"line": 1, "message": "hello"}

          - instance: 2 
            props: {"line": 2, "message": "world"}"
    `);

    expect(() =>
      expect(mockedComponent).not.toBeRenderedWithProps({
        message: 'world',
        line: 2,
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      "expected Mocked.TestComponent not to be rendered with exact props
        Expected: {"line": 2, "message": "world"}
        Received: 2 instances rendered
          
          - instance: 1 
            props: {"line": 1, "message": "hello"}

          - instance: 2 
            props: {"line": 2, "message": "world"}"
    `);
  });
});
