import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { newCard, removeCardFromTest, destroyTest } from '../../store/tests';

const Test = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(state => state.session.user);
    const { testId } = useParams();
    const test = useSelector(state => Object.values(state.tests).filter(test => test._id === testId));
    console.log(test);

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(destroyTest(testId));
        navigate(`/profile/${currentUser._id}`)
    }

    const handleAdd = (e) => {
        e.preventDefault();
        dispatch(newCard);
    }
    
    return (
        <>
        <h1>Hello from test</h1>
        <h2>{test.title}</h2>

        <button onClick={handleAdd}>Add Card</button>

        <button onClick={handleDelete}>Delete Test</button>
        </>
    )
}

export default Test;