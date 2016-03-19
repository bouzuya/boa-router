# boa-router

A routing library for [bouzuya/b-o-a][].

## Installation

```
$ npm install boa-router
```

## Usage

```typescript
import { init } from 'boa-router';
const routes = [
  { path: '/users' },
  { path: '/users/:id' }
];
const router = init(routes);
const matched = router('/users/123');
// { route: { path: '/users/:id' }, params: { id: '123' } }

const notMatched = router('/items');
// null
```

## Badges

[![Circle CI][badge-image-url]][badge-url]

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][email]&gt; ([http://bouzuya.net][url])

[user]: https://github.com/bouzuya
[email]: mailto:m@bouzuya.net
[url]: http://bouzuya.net
[bouzuya/b-o-a]: https://github.com/bouzuya/b-o-a
[badge-image-url]: https://circleci.com/gh/bouzuya/boa-router.svg?style=svg
[badge-url]: https://circleci.com/gh/bouzuya/boa-router
