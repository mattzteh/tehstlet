import jwtFetch from "./jwt";

const RECEIVE_TESTS = 'tests/RECEIVE_TESTS';
const RECEIVE_TEST = 'tests/RECEIVE_TEST';
const CREATE_TEST = 'tests/CREATE_TEST';
const DELETE_TEST = 'tests/DELETE_TEST';

const CREATE_CARD = 'tests/CREATE_CARD';
const DELETE_CARD = 'tests/DELETE_CARD';

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

const createTest = test => ({
    type: CREATE_TEST,
    test
})

const deleteTest = testId => ({
    type: DELETE_TEST,
    testId
})

const createCard = test => ({
    type: CREATE_CARD,
    test
})

const deleteCard = test => ({
    type: DELETE_CARD,
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
        const res = await jwtFetch('/api/tests/');
        const tests = await res.json();
        dispatch(receiveTests(tests));
    } catch (err) {
        const res = await err.json();
        if (res.statusCode === 400) {
            dispatch(receiveTestErrors(res.errors));
        }
    }
}

export const fetchTest = (testId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/tests/${testId}`);
        const test = await res.json();
        dispatch(receiveTest(test));
    } catch (err) {
        const res = await err.json();
        if (res.statusCode === 400) {
            return dispatch(receiveTestErrors(res.errors));
        }
    }
}

export const newTest = (testData) => async dispatch => {
    try {
        const res = await jwtFetch('/api/tests/create', {
            method: 'POST',
            body: JSON.stringify(testData),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const test = await res.json();
        dispatch(createTest(test));
    } catch (err) {
        const res = await err.json();
        if (res.statusCode === 400) {
            return dispatch(receiveTestErrors(res.errors));
        }
    }
}

export const newCard = (testId, cardData) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/tests/${testId}/cards`, {
            method: 'POST',
            body: JSON.stringify(cardData),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const card = await res.json();
        dispatch(createCard(card));
    } catch (err) {
        const res = await err.json();
        if (res.statusCode === 400) {
            return dispatch(receiveTestErrors(res.errors));
        }
    }
}

export const removeCard = (testId, cardId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/tests/${testId}/${cardId}`, {
            method: 'DELETE'
        })
        const card = await res.json();
        dispatch(deleteCard(card));
    } catch (err) {
        const res = await err.json();
        if (res.statusCode === 400) {
            return dispatch(receiveTestErrors(res.errors));
        }
    }
}

export const destroyTest = (testId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/tests/${testId}`, {
            method: 'DELETE'
        })
        dispatch(deleteTest(testId));
    } catch (err) {
        const res = await err.json();
        if (res.statusCode === 400) {
            return dispatch(receiveTestErrors(res.errors));
        }
    }
}

const nullErrors = null;

export const testErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_TEST_ERRORS:
            return action.errors;
        case CREATE_TEST:
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
        case CREATE_TEST:
            newState[action.test._id] = action.test;
            return newState;
        case DELETE_TEST:
            delete newState[action.testId];
            return newState;
        default:
            return state;
    }
}

export default testReducer;