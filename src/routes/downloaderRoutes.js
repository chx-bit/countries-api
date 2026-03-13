import express from 'express'
import stream from 'stream'

const router = express.Router()

router.get('/', async (req, res) => {
  const { url, type } = req.query

  if (!url || !type)
    return res.status(400).json({
      errors: 'provide url and type',
    })

  const response = await fetch(
    `https://basic-tools-light.vercel.app/api/download?url=${encodeURIComponent(url)}&type=tiktok`,
    {
      method: 'GET',
    },
  )

  if (!response.ok)
    return res.status(400).json({
      errors: 'provide valid url',
    })

  res.writeHead(200, {
    'Content-Type':
      response.headers.get('content-type') ?? 'application/octet-stream',
    'Content-Disposition': 'attachment',
  })

  const readable = stream.Readable.fromWeb(response.body)

  return readable.pipe(res)
})

export { router as downloaderRoutes }
