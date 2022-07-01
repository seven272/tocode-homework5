import axios from 'axios'
export default axios.create({
  baseURL: 'https://vttwitter-4f5ed-default-rtdb.europe-west1.firebasedatabase.app',
  header: {
    'Content-type': 'application/json'
  }
})
