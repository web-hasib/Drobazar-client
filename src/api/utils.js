import axios from 'axios'

// upload image and return image url
export const imageUpload = async imageData => {
  const imageFormData = new FormData()
  imageFormData.append('image', imageData)

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    imageFormData
  )
  // image url response from imgbb
  return data?.data?.display_url
}

// save or update user in db
export const saveUserToDB = async (user) => {
  const { displayName, email, photoURL } = user;

  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
      name: displayName,
      email,
      imageURL: photoURL,
      creationTime:  new Date().toISOString(),
    });
    return res.data;
  } catch (error) {
    console.error('Error saving user:', error);
  }
};