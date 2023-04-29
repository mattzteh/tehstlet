import { Link } from "react-router-dom";

const TestIndexItem = ({ test }) => {
    return (
        <>
        <div className="test-index-item">
            <h1>{test.title}</h1>
            <p>{test.description}</p>
            <Link to={`/tests/${test._id}`}>test link</Link>
        </div>
        </>
    )
}

export default TestIndexItem;