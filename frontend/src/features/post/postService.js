import axios from 'axios';

const API_URL = '/api/posts/';

const getPosts = async (userData) => {
    const res = await axios.get(API_URL);

    return res.data;
}

const postService = {
    getPosts
}

export default postService;
