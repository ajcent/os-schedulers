const mergeObjectProto = <T, U>(target: T, source: U): T & U => {
  const merged = Object.create(Object.getPrototypeOf(target));
  Object.assign(merged, target, source);
  return merged as T & U;
};

export default mergeObjectProto;
