import axios from 'axios';
import { PrismaClient } from '@prisma/client';

interface CarData {
  brake: number;
  date: string;
  driver_number: number;
  drs: boolean;
  meeting_key: string;
  n_gear: number;
  rpm: number;
  session_key: string;
  speed: number;
  throttle: number;
}

export async function importCarData(prisma: PrismaClient) {
  try {
    const response = await axios.get<CarData[]>('https://api.openf1.org/v1/car-data?session_key=latest');
    const data = response.data;

    await prisma.carData.createMany({
      data: data.map(carData => ({
        brake: carData.brake,
        date: new Date(carData.date),
        driver_number: carData.driver_number,
        drs: carData.drs,
        meeting_key: carData.meeting_key,
        n_gear: carData.n_gear,
        rpm: carData.rpm,
        session_key: carData.session_key,
        speed: carData.speed,
        throttle: carData.throttle
      })),
    });

    console.log('Car data imported successfully');
  } catch (error) {
    console.error('Error importing car data:', error);
    throw error;
  }
}
