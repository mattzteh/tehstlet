import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTests, createTest } from "../../store/tests";

const TestsIndex = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    const errors = useSelector(state => state.errors.test);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        dispatch(fetchTests);
    }, [])

    const update = (field) => {
        return (e) => {
            switch (field) {
                case 'title':
                    setTitle(e.currentTarget.value);
                    break;
                case 'description':
                    setDescription(e.currentTarget.value);
                    break;
                default:
                    throw Error('Unknown field in test form.');
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const test = {
            creator: user,
            title,
            description
        }
        dispatch(createTest(test));
    }


    return (
        <>
        <div className="test">
            <form className="test-form" onSubmit={handleSubmit}>

                <div className='errors'>{errors?.title}</div>
                <label>
                    <span>Title</span>
                    <input
                    type='text'
                    value={title}
                    onChange={update('title')}
                    placeholder="Title"
                    />
                </label>

                <div className='errors'>{errors?.description}</div>
                <label>
                    <span>Description</span>
                    <input
                    type='text'
                    value={description}
                    onChange={update('description')}
                    placeholder="Description (optional)."
                    />
                </label>

                <input
                type='submit'
                value='Create Test'
                disabled={ !title }
                />

            </form>
        </div>
        </>
    )
}

export default TestsIndex;