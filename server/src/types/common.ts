export type DocumentResult<T> = {
  _doc: T & { _id: string };
};
