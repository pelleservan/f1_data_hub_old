import axios from 'axios';
import { PrismaClient } from '@prisma/client';

interface Location {
  date: string;
  driver_number: number;
  meeting_key: string;
  session_key: string;
  x: number;
  y: number;
  z: number;
}

export async function importLocation(prisma: PrismaClient) {
  try {
    const response = await axios.get<Location[]>('https://api.openf1.org/v1/location?session_key=latest');
    const data = response.data;

    await prisma.location.createMany({
      data: data.map(location => ({
        date: new Date(location.date),
        driver_number: location.driver_number,
        meeting_key: location.meeting_key,
        session_key: location.session_key,
        x: location.x,
        y: location.y,
        z: location.z
      })),
    });

    console.log('Location data imported successfully');
  } catch (error) {
    console.error('Error importing location data:', error);
    throw error;
  }
}
