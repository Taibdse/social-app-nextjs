import axios, { AxiosError } from "axios"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers, body } = req;
  console.log(`${process.env.API_URL}/interview/social`)
  console.log(req.body)
  try {
    const response = await axios.post(
      `${process.env.API_URL}/interview/social`,
      body,
      { headers }
    )
    //  Update headers on requester using headers from Node.js server response
    // Object.entries(returnedHeaders).forEach((keyArr) =>
    //   res.setHeader(keyArr[0], keyArr[1] as string)
    // )
    res.send(response.data)
  } catch (error: any) {
    console.log(error.message)
    // console.log({ error: error })
    // const { response: { status, data } } = error;

    // res.status(status).json(data)
  }
}
