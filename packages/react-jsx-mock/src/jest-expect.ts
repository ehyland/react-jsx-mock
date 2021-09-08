import { ComponentProps } from 'react';
import { MockedComponent } from './mock-component';

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeRenderedWithProps(props: ComponentProps<T>): R;
      toBeRenderedWithPropsMatching(props: Partial<ComponentProps<T>>): R;
    }
  }
}

expect.extend({
  toBeRenderedWithProps(received: MockedComponent<unknown>, props: unknown) {
    const instances = received.mock.all();

    const pass = instances.some(inst => this.equals(inst.props, props));

    // this.equals()
    if (pass) {
      return {
        message: () =>
          `expected ${received.displayName} not to be rendered with props
          Expected: ${this.utils.printExpected(props)}
          Received: ${this.utils.printReceived(
            instances.map(inst => inst.props)
          )}
          `,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expected ${received.displayName} to be rendered with props
        Expected: ${this.utils.printExpected(props)}
        Received: ${this.utils.printReceived(instances.map(inst => inst.props))}
        `,
        pass: false
      };
    }
  },
  toBeRenderedWithPropsMatching(
    received: MockedComponent<unknown>,
    partialProps: unknown
  ) {
    const instances = received.mock.all();

    const props = expect.objectContaining(partialProps);
    const pass = instances.some(inst => this.equals(inst.props, props));

    // this.equals()
    if (pass) {
      return {
        message: () =>
          `expected ${received.displayName} not to be rendered with props
          Expected: ${this.utils.printExpected(props)}
          Received: ${this.utils.printReceived(
            instances.map(inst => inst.props)
          )}
          `,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expected ${received.displayName} to be rendered with props
        Expected: ${this.utils.printExpected(props)}
        Received: ${this.utils.printReceived(instances.map(inst => inst.props))}
        `,
        pass: false
      };
    }
  }
});
