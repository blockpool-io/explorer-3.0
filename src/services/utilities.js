import BitService from '@/services/bit'

class UtilitiesService {
  async supportedcoins(descendant = 'bpl') {
    const response = await BitService.get('supportedcoins', {
      params: {
        descendant
      }
    })
    return response.data.coins
  }
}

export default new UtilitiesService()
