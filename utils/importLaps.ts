import axios from 'axios';
import { PrismaClient } from '@prisma/client';

interface Lap {
  date_start: string;
  driver_number: number;
  duration_sector_1: number;
  duration_sector_2: number;
  duration_sector_3: number;
  i1_speed: number;
  i2_speed: number;
  is_pit_out_lap: boolean;
  lap_duration: number;
  lap_number: number;
  meeting_key: string;
  segments_sector_1: string;
  segments_sector_2: string;
  segments_sector_3: string;
  session_key: string;
  st_speed: number;
}

export async function importLaps(prisma: PrismaClient) {
  try {
    const response = await axios.get<Lap[]>('https://api.openf1.org/v1/laps?session_key=latest');
    const data = response.data;

    await prisma.laps.createMany({
      data: data.map(lap => ({
        date_start: new Date(lap.date_start),
        driver_number: lap.driver_number,
        duration_sector_1: lap.duration_sector_1,
        duration_sector_2: lap.duration_sector_2,
        duration_sector_3: lap.duration_sector_3,
        i1_speed: lap.i1_speed,
        i2_speed: lap.i2_speed,
        is_pit_out_lap: lap.is_pit_out_lap,
        lap_duration: lap.lap_duration,
        lap_number: lap.lap_number,
        meeting_key: lap.meeting_key,
        segments_sector_1: lap.segments_sector_1,
        segments_sector_2: lap.segments_sector_2,
        segments_sector_3: lap.segments_sector_3,
        session_key: lap.session_key,
        st_speed: lap.st_speed
      })),
    });

    console.log('Laps imported successfully');
  } catch (error) {
    console.error('Error importing laps:', error);
    throw error;
  }
}
