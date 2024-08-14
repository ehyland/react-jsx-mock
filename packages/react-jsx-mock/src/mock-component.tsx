import { ComponentType, FC, useEffect, useState } from 'react';

import { register as mockComponentRegister } from './register';

export type RenderMeta<T> = { props: T };
export type RenderRegister<T> = Map<number, RenderMeta<T>>;
export type MockedComponent<T> = ComponentType<T> & {
  mock: {
    replace: (component: ComponentType<T>) => void;
    /**
     * Returns the rendered component info.
     * Throws an error if component isn't rendered exactly once
     */
    get: () => RenderMeta<T>;

    /**
     * Returns all rendered components info
     */
    all: () => RenderMeta<T>[];
  };
};

export function mockComponent<T extends {}>(
  type: ComponentType<T>,
  mock?: ComponentType<T>,
): MockedComponent<T> {
  let idSequence = 0;
  const generateId = () => idSequence++;
  let MockContent: ComponentType<T> = mock ?? (() => null);

  /** Tracks the currently rendered instances */
  const renderRegister: RenderRegister<T> = new Map();

  const MockComponent: FC<T> = (props) => {
    const [id] = useState(generateId);

    // Add / remove from register on mount / unmount
    useEffect(() => {
      renderRegister.set(id, { props });

      return () => {
        renderRegister.delete(id);
      };
    }, []);

    // Update rendered props on render
    useEffect(() => {
      Object.assign(renderRegister.get(id)!, { props });
    });

    return <MockContent {...props} />;
  };

  mockComponentRegister.set(type, MockComponent);

  return Object.assign(MockComponent, {
    mock: mockUtils({
      renderRegister,
      replace: (component) => (MockContent = component),
    }),
    displayName: `Mocked.${type.displayName ?? type.name ?? 'Component'}`,
  });
}

function mockUtils<T>(args: {
  renderRegister: RenderRegister<T>;
  replace: (component: ComponentType<T>) => void;
}): MockedComponent<T>['mock'] {
  return {
    replace: args.replace,
    get: () => {
      const renders = Array.from(args.renderRegister.values());
      if (renders.length !== 1) {
        throw new Error(
          `Attempted to get rendered props on component that is currently rendered ${renders.length} times`,
        );
      }

      return renders[0];
    },
    all: () => Array.from(args.renderRegister.values()),
  };
}

export function unmockComponent<T>(type: ComponentType<T>) {
  mockComponentRegister.delete(type);
}
