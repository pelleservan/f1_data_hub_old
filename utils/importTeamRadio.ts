import axios from 'axios';
import { PrismaClient } from '@prisma/client';

interface TeamRadio {
  date: string;
  driver_number: number;
  meeting_key: string;
  recording_url: string;
  session_key: string;
}

export async function importTeamRadio(prisma: PrismaClient) {
  try {
    const response = await axios.get<TeamRadio[]>('https://api.openf1.org/v1/team-radio?session_key=latest');
    const data = response.data;

    await prisma.teamRadio.createMany({
      data: data.map(teamRadio => ({
        date: new Date(teamRadio.date),
        driver_number: teamRadio.driver_number,
        meeting_key: teamRadio.meeting_key,
        recording_url: teamRadio.recording_url,
        session_key: teamRadio.session_key
      })),
    });

    console.log('Team radio data imported successfully');
  } catch (error) {
    console.error('Error importing team radio data:', error);
    throw error;
  }
}
