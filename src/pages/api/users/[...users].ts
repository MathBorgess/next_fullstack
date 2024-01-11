// [...users] is kinda name that acts like a wildCard, everytime you call /api/users/whatever it will be redirected to this file

import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
  // <{ id: string }> would be the return type
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    case "POST":
      try {
        const user = await prisma.user.create({
          data: {
            ...req.body,
          },
        });
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
