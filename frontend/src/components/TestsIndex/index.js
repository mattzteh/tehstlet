import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTests, newTest } from "../../store/tests";

const TestsIndex = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    const errors = useSelector(state => state.errors.test);

    // only show tests that are 'public'
    const tests = useSelector(state => Object.values(state.tests).filter(test => test.onlyMe === false));

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [onlyMe, setOnlyMe] = useState(false);

    useEffect(() => {
        dispatch(fetchTests);
    }, [tests])

    const update = (field) => {
        return (e) => {
            switch (field) {
                case 'title':
                    setTitle(e.currentTarget.value);
                    break;
                case 'description':
                    setDescription(e.currentTarget.value);
                    break;
                case 'onlyMe':
                    setOnlyMe(!onlyMe);
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
            description,
            onlyMe
        }
        dispatch(newTest(test));
        navigate(`/profile/${user._id}`)
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

                <label>
                    <span>Private?</span>
                    <input
                    type='checkbox'
                    value={onlyMe}
                    onChange={update('onlyMe')}
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