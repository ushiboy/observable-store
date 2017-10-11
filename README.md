# Observable Store

## Example

### Simple Example

```javascript
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

* [counter](./example/counter/): Simple counter application.
* [counter-ext](./example/counter-ext): React counter Application (with Server Side Rendering).

## API

### `createObservableStore<T>(initialState: T): Store<T>`

```javascript
const store = createObservableStore({ users: [], organization: 'mycompany' });
```

### Instance properties

#### `store.state: T`

```javascript
console.log(store.state.users[0]); // -> 'user1'

store.state.users[0] = 'other'; // -> throw Error
```

### Instance methods

#### `store.assign(...sources: any): void`

```javascript
store.assign({ users: ['user1', 'user2', 'user3'] }, { organization: 'newcompany' });
```

#### `store.replace(sources: any): void`

```javascript
store.replace({ users: ['user1', 'user2', 'user3'] });
```

#### `store.observe(o: (state: T) => void): void`

```javascript
const observer = state => {
  console.log(store.state.users);
};
store.observe(observer);
```

#### `store.unobserve(o: (state: T) => void): void`

```javascript
const observer = state => {
  console.log(store.state.users);
};
store.unobserve(observer);
```

## License

MIT
