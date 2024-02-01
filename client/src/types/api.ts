const responseStatus = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  408: "Request Timeout",
  410: "Gone",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable"
} as const;

type ResponseCode = keyof typeof responseStatus;

export type ResponseError = {
  success: false;
  error: {
    code: ResponseCode;
    message: string;
  };
};

export type ResponseSuccess = {
  success: true;
  code: ResponseCode;
  message: string;
};

export type ResponseSuccessWithPayload<T> = {
  success: true;
  code: ResponseCode;
  message?: string;
  data: T;
};

export type Response<T = boolean> = T extends object ? ResponseSuccessWithPayload<T> : ResponseSuccess;
