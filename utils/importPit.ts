import axios from 'axios';
import { PrismaClient } from '@prisma/client';

interface Pit {
  date: string;
  driver_number: number;
  lap_number: number;
  meeting_key: string;
  pit_duration: number;
  session_key: string;
}

export async function importPit(prisma: PrismaClient) {
  try {
    const response = await axios.get<Pit[]>('https://api.openf1.org/v1/pit?session_key=latest');
    const data = response.data;

    await prisma.pit.createMany({
      data: data.map(pit => ({
        date: new Date(pit.date),
        driver_number: pit.driver_number,
        lap_number: pit.lap_number,
        meeting_key: pit.meeting_key,
        pit_duration: pit.pit_duration,
        session_key: pit.session_key
      })),
    });

    console.log('Pit data imported successfully');
  } catch (error) {
    console.error('Error importing pit data:', error);
    throw error;
  }
}
