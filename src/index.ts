import * as pathToRegexp from 'path-to-regexp';

export interface Route {
  path: string;
  [x: string]: any;
}

export interface MatchedRoute {
  route: Route;
  params: { [name: string]: string; };
}

export interface Router {
  (path: string): MatchedRoute; // MatchedRoute?
}

interface CompiledRoute {
  keys: { name: string; }[];
  regexp: RegExp;
  route: Route;
}

const compile = (route: Route): CompiledRoute => {
  const keys: any[] = [];
  const regexp = pathToRegexp(route.path, keys);
  return { keys, regexp, route };
};

const match = (
  compiled: CompiledRoute,
  path: string
): MatchedRoute => {
  const { keys, regexp, route } = compiled;
  const match = regexp.exec(path);
  if (!match) return null;
  const params: { [name: string]: string; } = {};
  for (var j = 1; j < match.length; j++) {
    params[keys[j - 1].name] = match[j];
  }
  return { route, params };
};

const init = (routes: Route[]): Router => {
  const compiledRoutes: CompiledRoute[] = routes.map(compile);
  return (path: string): MatchedRoute => {
    for (var i = 0; i < compiledRoutes.length; i++) {
      const compiled = compiledRoutes[i];
      const result = match(compiled, path);
      if (result) return result;
    }
    return null;
  };
};

export { init };
