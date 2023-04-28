import jwtFetch from "./jwt";

const RECEIVE_TESTS = 'tests/RECEIVE_TESTS';
const RECEIVE_TEST = 'tests/RECEIVE_TEST';
const RECEIVE_NEW_TEST = 'tests/RECEIVE_NEW_TEST';
const DELETE_TEST = 'tests/DELETE_TEST';

const RECEIVE_TEST_ERRORS = 'tests/RECEIVE_TEST_ERRORS';
const CLEAR_TEST_ERRORS = 'tests/CLEAR_TEST_ERRORS';

const receiveTests = tests => ({
    type: RECEIVE_TESTS,
    tests
})

const receiveTest = test => ({
    type: RECEIVE_TEST,
    test
})

const receiveNewTest = test => ({
    type: RECEIVE_NEW_TEST,
    test
})

const deleteTest = test => ({
    type: DELETE_TEST,
    test
})

const receiveTestErrors = errors => ({
    type: RECEIVE_TEST_ERRORS,
    errors
})

const clearTestErrors = errors => ({
    type: CLEAR_TEST_ERRORS,
    errors
})

export const fetchTests = () => async dispatch => {
    try {
        const res = await jwtFetch('/api/tests');
        const tests = await res.json();
        dispatch(receiveTests(tests));
    } catch (err) {
        const resBody = await err;
        if (resBody.statusCode === 400) {
            dispatch(receiveErorrs(resBody.errors));
        }
    }
}

export const fetchTest = (testId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/tests/${testId}`);
        const test = await res.json();
        dispatch(receiveTest(test));
    } catch (err) {
        const resBody = await err;
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const createTest = (testData) => async dispatch => {
    try {
        const res = await jwtFetch('/api/tests/create', {
            method: 'POST',
            body: JSON.stringify(testData),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
    } catch (err) {
        const resBody = await err;
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const destroyTest = (testId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/tests/${testId}`, {
            method: 'DELETE'
        })
        const test = await res.json();
        dispatch(deleteTest(test));
    } catch (err) {
        const resBody = await err;
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
}

const nullErrors = null;

export const testErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_TEST_ERRORS:
            return action.errors;
        case RECEIVE_NEW_TEST:
        case CLEAR_TEST_ERRORS:
            return nullErrors;
        default:
            return state;
    }
}

const testReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = { ...state }

    switch (action.type) {
        case RECEIVE_TEST:
            const test = action.test;
            return { ...newState, [test.id]: test };
        case RECEIVE_TESTS:
            return { ...newState, ...action.tests };
        case RECEIVE_NEW_TEST:
            newState[action.test._id] = action.test;
            return newState;
        case DELETE_TEST:
            delete newState[action.test];
            return newState;
        default:
            return state;
    }
}

export default testReducer;