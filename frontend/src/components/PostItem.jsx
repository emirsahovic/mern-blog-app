import Moment from 'react-moment';

const PostItem = ({ post }) => {
    return (
        <div className="shadow-xl rounded-lg p-6 mt-16 bg-gray-100">
            <h1 className="text-xl font-bold text-center uppercase">{post.title}</h1>
            <p className="px-4 my-6 text-gray-800 text-lg">{post.text}</p>
            <div className='flex justify-between'>
                <p className="text-sky-600">Author: <span className='text-gray-600'>{post.name}</span></p>
                <p className='text-sky-600'>Published on: <Moment className='text-gray-600' format='DD/MM/YYYY'>{post.createdAt}</Moment></p>
            </div>
        </div>
    )
}

export default PostItem;