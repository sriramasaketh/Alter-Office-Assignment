import axios from 'axios'

const API_BASE_URL = 'https://your-api-url.com'
export const getPosts = async (page = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts?page=${page}`)
    return response.data
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

export const createPost = async postData => {
  try {
    const response = await axios.post(`${API_BASE_URL}/posts`, postData)
    return response.data
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

export const getUserProfile = async userId => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    throw error
  }
}
