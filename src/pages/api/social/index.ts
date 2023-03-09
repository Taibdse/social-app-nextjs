import { NextApiRequest, NextApiResponse } from "next";

const genId = () => Math.random().toString().slice(2, 10);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;
  switch (method) {
    case 'POST': {
      const newSocial = { id: genId(), ...body };
      res.status(200).send(newSocial);
    }
  }
}
