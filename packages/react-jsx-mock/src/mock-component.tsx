import { ComponentType, FC, useEffect, useState } from 'react';

import { register as mockComponentRegister } from './register';

export type RenderMeta<T> = { props: T };
export type RenderRegister<T> = Map<number, RenderMeta<T>>;
export type MockedComponent<T> = ComponentType<T> & {
  mock: {
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

  /** Tracks the currently rendered instances */
  const renderRegister: RenderRegister<T> = new Map();

  const MockChild: ComponentType<T> = mock ?? (() => null);

  const MockWrapper: FC<T> = (props) => {
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

    return <MockChild {...props} />;
  };

  mockComponentRegister.set(type, MockWrapper);

  return Object.assign(MockWrapper, {
    mock: mockUtils(renderRegister),
    displayName: `Mocked.${type.displayName ?? type.name ?? 'Component'}`,
  });
}

function mockUtils<T>(
  renderRegister: RenderRegister<T>,
): MockedComponent<T>['mock'] {
  return {
    get: () => {
      const renders = Array.from(renderRegister.values());
      if (renders.length !== 1) {
        throw new Error(
          `Attempted to get rendered props on component that is currently rendered ${renders.length} times`,
        );
      }

      return renders[0];
    },
    all: () => Array.from(renderRegister.values()),
  };
}

export function unmockComponent<T>(type: ComponentType<T>) {
  mockComponentRegister.delete(type);
}
