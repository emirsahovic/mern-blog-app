import axios from 'axios';

const API_URL = '/api/posts/';

const getPosts = async () => {
    const res = await axios.get(API_URL);
    return res.data;
}

const getPost = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(API_URL + id, config);
    return res.data;
}

const createPost = async (postData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(API_URL, postData, config);
    return res.data;
}

const deletePost = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.delete(API_URL + id, config);
    return res.data;
}

const postService = {
    getPosts,
    createPost,
    deletePost,
    getPost
}

export default postService;
