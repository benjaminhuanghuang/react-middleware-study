function loggerMiddleware() {
    return ({ dispatch, getState }) => next => action => {
        console.log(action);
        return next(action);
    };
}

