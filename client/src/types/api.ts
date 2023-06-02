interface TResponseStatus {
  status: boolean;
  statusCode: number;
}

interface TResponseWithMsg extends TResponseStatus {
  message: string;
}

interface TResponseWithData<TData> extends TResponseStatus {
  data: TData;
}

export type TResponse<Type = string> = Type extends string
  ? TResponseWithMsg
  : Type extends object
  ? TResponseWithData<Type> & Partial<TResponseWithMsg>
  : never;
