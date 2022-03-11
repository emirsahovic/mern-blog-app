import Moment from 'react-moment';
import { FaWindowClose } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../features/post/postSlice';

const PostItem = ({ post }) => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <div className="shadow-xl rounded-lg py-6 px-10 mt-16 bg-gray-200 h-full relative">
            <h1 className="text-2xl font-bold text-center uppercase">{post.title}</h1>
            <img src={post.imageUrl} alt="Post image" className='my-3 w-full' />
            <p className="px-4 my-6 text-gray-800 text-lg">{post.text}</p>
            <p className="text-sky-600 absolute bottom-3 left-4">Author: <span className='text-gray-600'>{post.name}</span></p>
            <p className='text-sky-600 absolute bottom-3 right-4'>Published on: <Moment className='text-gray-600' format='DD/MM/YYYY'>{post.createdAt}</Moment></p>
            {user._id === post.user._id &&
                <button onClick={() => dispatch(deletePost(post._id))} className='text-red-500 absolute top-4 right-3 text-2xl hover:opacity-70'>
                    <FaWindowClose />
                </button>}
        </div>
    )
}

export default PostItem;
