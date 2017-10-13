# Observable Store

The observable-store notify when own state changed.

## Example

### Simple Example

```javascript
import createObservableStore from '@ushiboy/observable-store';

const store = createObservableStore({
  count: 0
});

const state = store.state;

const observer1 = () => {
  console.log(`change: count:${state.count}`);
};
const observer2 = () => {
  console.log(`(observer 2) change: count:${state.count}`);
};

store.observe(observer1);
store.observe(observer2);

console.log(`count: ${state.count}`); // count: 0;

store.assign({
  count: state.count + 1
});
console.log(`count: ${state.count}`); // count: 1;

try {
  state.count = state.count + 1;  // throw Error
} catch (e) {
  console.log(`${e}`); // Error: Should use assign
}
console.log(`count: ${state.count}`); // count: 1;

store.unobserve(observer2);

store.assign({
  count: state.count + 1
});
console.log(`count: ${state.count}`); // count: 2;
```

### Example Application

* [counter](https://github.com/ushiboy/observable-store/tree/master/example/counter): Simple counter application.
* [counter-ext](https://github.com/ushiboy/observable-store/tree/master/example/counter-ext): React counter application (with server side rendering).

## API

### `createObservableStore<T>(initialState: T): Store<T>`

Creates an instance of observable store.

```javascript
const store = createObservableStore({ users: [], organization: 'mycompany' });
```

### Instance properties

#### `store.state: T`

Provides its own state.

```javascript
console.log(store.state.organization); // -> 'mycompany'

store.state.organization = 'other'; // -> throw Error
```

### Instance methods

#### `store.assign(...sources: any): void`

Updates its own state. Notify when the state changes.

```javascript
store.assign({ users: ['user1', 'user2', 'user3'] }, { organization: 'newcompany' });
```

#### `store.replace(sources: any): void`

Force updates its own state and notify.

```javascript
store.replace({ users: ['user1', 'user2', 'user3'] });
```

#### `store.observe(o: (state: T) => void): void`

Register an observer.

```javascript
const observer = state => {
  console.log(store.state.users);
};
store.observe(observer);
```

#### `store.unobserve(o: (state: T) => void): void`

Unregister an observer.

```javascript
const observer = state => {
  console.log(store.state.users);
};
store.unobserve(observer);
```

## License

MIT
