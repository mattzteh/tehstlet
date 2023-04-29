import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { destroyTest } from "../../store/tests";

const TestIndexItem = ({ test }) => {

    const dispatch = useDispatch();

    return (
        <>
        <div className="test-index-item">
            <h1>{test.title}</h1>
            <p>{test.description}</p>
            <Link to={`/tests/${test._id}`}>test link</Link>
            <button onClick={() => dispatch(destroyTest(test._id))}>Delete</button>
        </div>
        </>
    )
}

export default TestIndexItem;