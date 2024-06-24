import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { fetchData } from '../../../utils/fetchData';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await fetchData(prisma);
    res.status(200).json({ message: 'Data import successful' });
  } catch (error) {
    console.error('Error during data import:', error);
    res.status(500).json({ message: 'Failed to import data' });
  } finally {
    await prisma.$disconnect();
  }
}


