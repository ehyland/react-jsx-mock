import type { ComponentProps, ComponentType } from 'react';
import type { MockedComponent } from './mock-component';

declare global {
  namespace jest {
    interface Matchers<R, T extends ComponentType> {
      toBeRenderedWithProps(props: ComponentProps<T>): R;
      toBeRenderedWithPropsMatching(props: Partial<ComponentProps<T>>): R;
    }
  }
}

expect.extend({
  toBeRenderedWithProps(received: MockedComponent<unknown>, props: unknown) {
    const instances = received.mock.all();

    const pass = instances.some((inst) => this.equals(inst.props, props));

    const message = (didPass: boolean) => () =>
      `expected ${received.displayName} ${
        didPass ? 'not ' : ''
      }to be rendered with exact props
  Expected: ${this.utils.printExpected(props)}
  Received: ${instances.length} instances rendered
    ${instances
      .map(
        (inst, index) => `
    - instance: ${index + 1} 
      props: ${this.utils.printReceived(inst.props)}`,
      )
      .join('\n')}`;

    if (pass) {
      return {
        message: message(true),
        pass: true,
      };
    } else {
      return {
        message: message(false),
        pass: false,
      };
    }
  },
  toBeRenderedWithPropsMatching(
    received: MockedComponent<unknown>,
    partialProps: unknown,
  ) {
    const instances = received.mock.all();

    const props = expect.objectContaining(partialProps);
    const pass = instances.some((inst) => this.equals(inst.props, props));

    const message = (didPass: boolean) => () =>
      `expected ${received.displayName} ${
        didPass ? 'not ' : ''
      }to be rendered with props containing
  Expected: ${this.utils.printExpected(props)}
  Received: ${instances.length} instances rendered
    ${instances
      .map(
        (inst, index) => `
    - instance: ${index + 1} 
      props: ${this.utils.printReceived(inst.props)}`,
      )
      .join('\n')}`;

    if (pass) {
      return {
        message: message(true),
        pass: true,
      };
    } else {
      return {
        message: message(false),
        pass: false,
      };
    }
  },
});
