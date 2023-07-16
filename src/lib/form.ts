export const formHandler = <T extends string>(e: any, o: Array<T>): { [K in T]: K } => {
  e?.preventDefault();
  return o.reduce((res, key) => {
    res[key] = e?.target[key]?.value;
    return res;
  }, Object.create(null));
}