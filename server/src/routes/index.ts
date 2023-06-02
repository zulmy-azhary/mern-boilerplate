import type { Application, Router } from "express";
import { HealthRouter } from "./health.route";
import { UserRouter } from "./user.route";

const _routes: Array<[string, Router]> = [
  ["/", HealthRouter],
  ["/user", UserRouter]
];

export const routes = (app: Application): void => {
  _routes.map(route => {
    const [url, router] = route;

    return app.use(url, router);
  });
};
