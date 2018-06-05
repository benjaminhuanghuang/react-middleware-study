## Why ReduxThunk
Ref: https://blog.nojaf.com/2015/12/06/redux-thunk/
The main reason why we can't use async is due to the way a reducer function works. 
The concept of a reducer is that it takes the current state and an action and it returns the next state. 
It's a pure function that does not modify the current state.
```
    function myReducer(previousState, someAction){  
        var nextState = {
            foo:previousState.foo,
            bar:someAction.bar
        };
    }
```
If would we want to do some async stuff we would have to wait until a Promise is resolved and then return the next state. 
We could just return the previous state and dispatch a new action once our Promise is resolved.
```
function myReducer(previousState, someAction){  
    someAsyncMethod(someAction.bar)
        .then(function(result){
            myStore.dispatch({type:"SOME_TYPE", bar:result});
        });
    return previousState;
}
```