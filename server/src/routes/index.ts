import type { Application, Router } from "express";
import { UserRouter } from "./user.route";
import { AuthRouter } from "./auth.route";

const _routes: Array<[string, Router]> = [
  ["/auth", AuthRouter],
  ["/user", UserRouter]
];

export const routes = (app: Application): void => {
  _routes.map(route => {
    const [url, router] = route;

    return app.use(url, router);
  });
};
