/*
    overwrite and fix type of action
*/
function loggerMiddleware() {
    return ({ dispatch, getState }) => next => action => {
        return next({ type: 'hacked' });
    };
}

