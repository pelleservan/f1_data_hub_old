import { NextApiRequest, NextApiResponse } from 'next';
import { fetchData } from '../../utils/fetchData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await fetchData(); // Appel de la fonction fetchData pour importer les données
      res.status(200).json({ message: 'Data import successful' });
    } catch (error) {
      console.error('Error importing data:', error);
      res.status(500).json({ error: 'Error importing data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
