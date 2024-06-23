import axios from 'axios';
import { PrismaClient } from '@prisma/client';

interface Position {
  date: string;
  driver_number: number;
  meeting_key: string;
  position: number;
  session_key: string;
  x: number;
  y: number;
  z: number;
}

export async function importPosition(prisma: PrismaClient) {
  try {
    const response = await axios.get<Position[]>('https://api.openf1.org/v1/position?session_key=latest');
    const data = response.data;

    await prisma.position.createMany({
      data: data.map(position => ({
        date: new Date(position.date),
        driver_number: position.driver_number,
        meeting_key: position.meeting_key,
        position: position.position,
        session_key: position.session_key,
        x: position.x,
        y: position.y,
        z: position.z
      })),
    });

    console.log('Position data imported successfully');
  } catch (error) {
    console.error('Error importing position data:', error);
    throw error;
  }
}
