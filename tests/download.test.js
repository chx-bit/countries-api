import supertest from 'supertest'
import app from '../src/index.js'

describe('Country API V1 Unit Tests', () => {
  describe('GET /v1/download', () => {
    it('should can download video', async () => {
      const res = await supertest(app).get(
        `/v1/download?url=${encodeURIComponent('https://vt.tiktok.com/ZSPwPEwP9/')}&type=tiktok`,
      )
      expect(res.body.errors).toBeUndefined()
      expect(res.body).toBeInstanceOf(Buffer)
      expect(res.status).toBe(200)
    })
  })
})
