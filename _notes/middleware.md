## Using middleware
```
const store = createStore(
  Reducer,
  applyMiddleware(thunk, myCustomMiddleware),
);
```
actions flow through thunk first, then through myCustomMiddleware and then get processed by the reducers.

