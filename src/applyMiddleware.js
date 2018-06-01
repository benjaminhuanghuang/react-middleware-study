//compose from redux/compose.js
function compose(...funcs) {
    console.info("$$$ compose function ")
    console.dir(funcs)
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

//applyMiddleware from redux/applyMiddleware.js
export const applyMiddleware = function applyMiddleware(...middlewares) {
    //console.info("applyMiddleware")
    return function (createStore) {
        return function (reducer, preloadedState, enhancer) {
            const store = createStore(reducer, preloadedState, enhancer)
            let dispatch = store.dispatch
            let chain = []

            const middlewareAPI = {
                getState: store.getState,
                dispatch: (action) => dispatch(action)
            }

            chain = middlewares.map(middleware => {
                console.info("~~~~~~middleware ")
                console.dir(middleware)
                const middlewareReturn = middleware(middlewareAPI)
                console.info("~~~~~~middlewareReturn ")
                console.dir(middlewareReturn)
                return middlewareReturn
            })
            console.info("~~~chain ")
            console.dir(chain)
            // console.info("~~~store.dispatch ")
            // console.dir( store.dispatch)

            //dispatch = compose(...chain)(store.dispatch)
            let composedFunc = compose(...chain)
            console.info("~~~composedFunc ")
            console.dir(composedFunc)

            dispatch = composedFunc(store.dispatch)
            console.info("~~~new dispatch AFTER compose  i.e composedFunc RETURNED ")
            console.dir(dispatch)

            return {
                ...store,
                dispatch
            }
        }
    }
}