import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../features/post/postSlice";

const Dashboard = () => {
    const { posts, isLoading, isSuccess, isError, msg } = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [])

    return (
        <div>
            {posts.map(post => (
                <h1>{post.text}</h1>
            ))}
        </div>
    )
}

export default Dashboard;
