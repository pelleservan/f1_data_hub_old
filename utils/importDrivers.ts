import axios from 'axios';
import { PrismaClient } from '@prisma/client';

interface Driver {
  broadcast_name: string;
  country_code: string;
  driver_number: number;
  first_name: string;
  full_name: string;
  headshot_url: string;
  last_name: string;
  meeting_key: string;
  name_acronym: string;
  session_key: string;
  team_colour: string;
  team_name: string;
}

export async function importDrivers(prisma: PrismaClient) {
  try {
    const response = await axios.get<Driver[]>('https://api.openf1.org/v1/drivers?session_key=latest');
    const data = response.data;

    await prisma.drivers.createMany({
      data: data.map(driver => ({
        broadcast_name: driver.broadcast_name,
        country_code: driver.country_code,
        driver_number: driver.driver_number,
        first_name: driver.first_name,
        full_name: driver.full_name,
        headshot_url: driver.headshot_url,
        last_name: driver.last_name,
        meeting_key: driver.meeting_key,
        name_acronym: driver.name_acronym,
        session_key: driver.session_key,
        team_colour: driver.team_colour,
        team_name: driver.team_name
      })),
    });

    console.log('Drivers imported successfully');
  } catch (error) {
    console.error('Error importing drivers:', error);
    throw error;
  }
}
