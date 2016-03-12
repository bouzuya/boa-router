import * as pathToRegexp from 'path-to-regexp';

export interface Route {
  path: string;
}

export interface Result<T extends Route> {
  route: T;
  params: { [name: string]: string; };
}

export interface Router<T extends Route> {
  (path: string): Result<T>;
}

interface CompiledRoute<T extends Route> {
  keys: { name: string; }[];
  regexp: RegExp;
  route: T;
}

const compile = <T extends Route>(route: T): CompiledRoute<T> => {
  const keys: any[] = [];
  const regexp = pathToRegexp(route.path, keys);
  return { keys, regexp, route };
};

const match = <T extends Route>(
  compiled: CompiledRoute<T>,
  path: string
): Result<T> => {
  const { keys, regexp, route } = compiled;
  const match = regexp.exec(path);
  if (!match) return null;
  const params: { [name: string]: string; } = {};
  for (var j = 1; j < match.length; j++) {
    params[keys[j - 1].name] = match[j];
  }
  return { route, params };
};

const init = <T extends Route>(routes: T[]): Router<T> => {
  const compiledRoutes: CompiledRoute<T>[] = routes.map(compile);
  return (path: string): Result<T> => {
    for (var i = 0; i < compiledRoutes.length; i++) {
      const compiled = compiledRoutes[i];
      const result = match(compiled, path);
      if (result) return result;
    }
    return null;
  };
};

export { init };
