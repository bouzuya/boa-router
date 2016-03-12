import test from 'ava';
import { init, Result, Route, Router } from '../src/';

test(t => {
  const router1: Router = init([]);
  t.ok(router1('/') === null);
});

test(t => {
  const route1: Route = { path: '/' };
  const router1: Router = init([route1]);
  const actual = router1('/');
  const expected: Result = { route: route1, params: {} };
  t.same(actual, expected);
});

test(t => {
  const route1 = { path: '/', name: 'root' }; // user data
  const router1 = init([route1]);
  const actual = router1('/');
  const expected: Result = { route: route1, params: {} }; // user data
  t.same(actual, expected);
});

test(t => {
  const route1 = { path: '/users' };
  const router1 = init([route1]);
  const actual = router1('/users');
  const expected: Result = { route: route1, params: {} };
  t.same(actual, expected);
});

test(t => {
  const route1 = { path: '/users' };
  const router1 = init([route1]);
  const actual = router1('/users/'); // with slash
  const expected: Result = { route: route1, params: {} };
  t.same(actual, expected);
});

test(t => {
  const route1 = { path: '/users/:id' };
  const router1 = init([route1]);
  const actual = router1('/users/bouzuya');
  const expected: Result = { route: route1, params: { id: 'bouzuya' } };
  t.same(actual, expected);
});

test(t => {
  const route1 = { path: '*' };
  const router1 = init([route1]);
  const actual = router1('/users/bouzuya');
  const expected: Result = { route: route1, params: { 0: '/users/bouzuya' } };
  t.same(actual.params, expected.params);
});

test(t => {
  const route1 = { path: '/users/:id' };
  const route2 = { path: '/users' };
  const router1 = init([route1, route2]);
  const actual = router1('/users/bouzuya');
  const expected: Result = { route: route1, params: { id: 'bouzuya' } };
  t.same(actual, expected);
});

test(t => {
  const route1 = { path: '/users' };
  const route2 = { path: '/users/:id' };
  const router1 = init([route1, route2]);
  const actual = router1('/users/bouzuya');
  const expected: Result = { route: route2, params: { id: 'bouzuya' } };
  t.same(actual, expected);
});

test(t => {
  const route1 = { path: '/users/:name' };
  const route2 = { path: '/users/:id' };
  const router1 = init([route1, route2]);
  const actual = router1('/users/bouzuya');
  const expected: Result = { route: route1, params: { name: 'bouzuya' } };
  t.same(actual, expected);
});

test(t => {
  const route1 = { path: '/users' };
  const route2 = { path: '*' };
  const router1 = init([route1, route2]);
  const actual = router1('/users/bouzuya');
  const expected: Result = { route: route2, params: { 0: '/users/bouzuya' } };
  t.same(actual, expected);
});
