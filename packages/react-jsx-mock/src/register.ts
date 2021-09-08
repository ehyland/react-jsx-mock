import { ComponentType } from 'react';

type RegisterKey = ComponentType<any> | string;

const internalRegister = new Map<RegisterKey, ComponentType<any>>();

export const register = {
  set: (key: RegisterKey, mock: ComponentType<any>) =>
    internalRegister.set(key, mock),

  get: (type: RegisterKey) => {
    const byType = internalRegister.get(type);

    if (byType) return byType;

    if (typeof type !== 'string' && type.displayName) {
      return internalRegister.get(type.displayName);
    }

    return undefined;
  },

  delete: (key: RegisterKey) => internalRegister.delete(key),
};
