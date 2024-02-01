// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AppRouteImport } from './routes/app/route'
import { Route as AuthRouteImport } from './routes/_auth/route'
import { Route as AppIndexImport } from './routes/app/index'
import { Route as AuthIndexImport } from './routes/_auth/index'
import { Route as AuthRegisterImport } from './routes/_auth/register'

// Create/Update Routes

const AppRouteRoute = AppRouteImport.update({
  path: '/app',
  getParentRoute: () => rootRoute,
} as any)

const AuthRouteRoute = AuthRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AppIndexRoute = AppIndexImport.update({
  path: '/',
  getParentRoute: () => AppRouteRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  path: '/',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  path: '/register',
  getParentRoute: () => AuthRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/app': {
      preLoaderRoute: typeof AppRouteImport
      parentRoute: typeof rootRoute
    }
    '/_auth/register': {
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/': {
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof AuthRouteImport
    }
    '/app/': {
      preLoaderRoute: typeof AppIndexImport
      parentRoute: typeof AppRouteImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthRouteRoute.addChildren([AuthRegisterRoute, AuthIndexRoute]),
  AppRouteRoute.addChildren([AppIndexRoute]),
])