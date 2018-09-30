import axios from 'axios'

class BitService {
  async get(url, config) {
    const response = await axios.get(`https://bit.blockpool.io/wallet/utilities/${url}`, config)

    if (!response.data.success) {
      return Promise.reject(new Error('Error GET ' + url + ' : ' + JSON.stringify(response)))
    }
    return response
  }
}

export default new BitService()
