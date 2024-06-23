import axios from 'axios';
import { PrismaClient } from '@prisma/client';

interface Meeting {
  circuit_key: string;
  circuit_short_name: string;
  country_code: string;
  country_key: string;
  country_name: string;
  date_start: string;
  gmt_offset: number;
  location: string;
  meeting_key: string;
  meeting_name: string;
  meeting_official_name: string;
  year: number;
}

export async function importMeetings(prisma: PrismaClient) {
  try {
    const response = await axios.get<Meeting[]>('https://api.openf1.org/v1/meetings?session_key=latest');
    const data = response.data;

    await prisma.meetings.createMany({
      data: data.map(meeting => ({
        circuit_key: meeting.circuit_key,
        circuit_short_name: meeting.circuit_short_name,
        country_code: meeting.country_code,
        country_key: meeting.country_key,
        country_name: meeting.country_name,
        date_start: new Date(meeting.date_start),
        gmt_offset: meeting.gmt_offset,
        location: meeting.location,
        meeting_key: meeting.meeting_key,
        meeting_name: meeting.meeting_name,
        meeting_official_name: meeting.meeting_official_name,
        year: meeting.year
      })),
    });

    console.log('Meetings imported successfully');
  } catch (error) {
    console.error('Error importing meetings:', error);
    throw error;
  }
}
