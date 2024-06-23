import axios from 'axios';
import { PrismaClient } from '@prisma/client';

interface Stint {
  compound: string;
  driver_number: number;
  lap_end: number;
  lap_start: number;
  meeting_key: string;
  session_key: string;
  stint_number: number;
  tyre_age_at_start: number;
}

export async function importStints(prisma: PrismaClient) {
  try {
    const response = await axios.get<Stint[]>('https://api.openf1.org/v1/stints?session_key=latest');
    const data = response.data;

    await prisma.stints.createMany({
      data: data.map(stint => ({
        compound: stint.compound,
        driver_number: stint.driver_number,
        lap_end: stint.lap_end,
        lap_start: stint.lap_start,
        meeting_key: stint.meeting_key,
        session_key: stint.session_key,
        stint_number: stint.stint_number,
        tyre_age_at_start: stint.tyre_age_at_start
      })),
    });

    console.log('Stints imported successfully');
  } catch (error) {
    console.error('Error importing stints:', error);
    throw error;
  }
}
