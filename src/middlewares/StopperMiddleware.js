
/*
    if the call to next is missing the flow to the next middleware (and later the reducers) stops.
*/
function stopperMiddleware() {
    return ({ dispatch, getState }) => next => action => {
        console.log('You shall not pass!');
    };
}