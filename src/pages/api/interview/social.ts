// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }

import httpProxy from 'http-proxy'
const API_URL = process.env.API_URL // The actual URL of your API
const proxy = httpProxy.createProxyServer()

export const config = {
  api: {
    bodyParser: false
  }
}
export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log('request')
  console.log('request1')
  return new Promise((resolve, reject) => {
    proxy.web(req, res, { target: API_URL, changeOrigin: true, path }, (err: any, data: any) => {
      console.log({ err, data });
      console.log(123)
      if (err) {
        return reject(err)
      }
      resolve('1')
    })
  })
}
