import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../features/post/postSlice";
import Spinner from "../components/Spinner";
import PostItem from "../components/PostItem";

const Dashboard = () => {
    const { posts, isLoading } = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="grid px-28 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mx-auto container justify-center items-center gap-6">
            {posts.map(post => (
                <PostItem key={post._id} post={post} />
            ))}
        </div>
    )
}

export default Dashboard;
