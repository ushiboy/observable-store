import createObservableStore from '../../src/index.js';

const store = createObservableStore({
  count: 0
});
const state = store.state;

function increment() {
  store.assign({
    count: state.count + 1
  });
}

function decrement() {
  store.assign({
    count: state.count - 1
  });
}


function renderView(state) {
  document.querySelector('#count').textContent = state.count;
}


document.querySelector('#add').addEventListener('click', e => {
  increment();
}, false);

document.querySelector('#sub').addEventListener('click', e => {
  decrement();
}, false);


store.observe(() => {
  renderView(state);
});

// initialize render
renderView(state);
