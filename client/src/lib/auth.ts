export const auth: Auth = {
  status: "logout",
  email: undefined,
  login: (email: string) => {
    auth.status = "login";
    auth.email = email;
  },
  logout: () => {
    auth.status = "logout";
    auth.email = undefined;
  }
};

export type Auth = {
  login: (email: string) => void;
  logout: () => void;
  status: "logout" | "login";
  email?: string;
};
