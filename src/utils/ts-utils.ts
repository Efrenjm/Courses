export function isObject(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null;
}

export function hasProperty<T extends string>(obj: unknown, prop: T): obj is Record<T, unknown> {
  return isObject(obj) && prop in obj;
}

export function hasStringProperty<T extends string>(obj: unknown, prop: T): obj is Record<T, string> {
  return hasProperty(obj, prop) && typeof obj[prop] === 'string';
}

export function hasNumberProperty<T extends string>(obj: unknown, prop: T): obj is Record<T, number> {
  return hasProperty(obj, prop) && typeof obj[prop] === 'number';
}
