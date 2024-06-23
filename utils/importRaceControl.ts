import axios from 'axios';
import { PrismaClient } from '@prisma/client';

interface RaceControl {
  category: string;
  date: string;
  driver_number: number;
  flag: string;
  lap_number: number;
  meeting_key: string;
  message: string;
  scope: string;
  sector: number;
  session_key: string;
}

export async function importRaceControl(prisma: PrismaClient) {
  try {
    const response = await axios.get<RaceControl[]>('https://api.openf1.org/v1/race-control?session_key=latest');
    const data = response.data;

    await prisma.raceControl.createMany({
      data: data.map(raceControl => ({
        category: raceControl.category,
        date: new Date(raceControl.date),
        driver_number: raceControl.driver_number,
        flag: raceControl.flag,
        lap_number: raceControl.lap_number,
        meeting_key: raceControl.meeting_key,
        message: raceControl.message,
        scope: raceControl.scope,
        sector: raceControl.sector,
        session_key: raceControl.session_key
      })),
    });

    console.log('Race control data imported successfully');
  } catch (error) {
    console.error('Error importing race control data:', error);
    throw error;
  }
}
