import axios from 'axios';
import { PrismaClient } from '@prisma/client';

interface Session {
  circuit_key: string;
  circuit_short_name: string;
  country_code: string;
  country_key: string;
  country_name: string;
  date_end: string;
  date_start: string;
  gmt_offset: number;
  location: string;
  meeting_key: string;
  session_key: string;
  session_name: string;
  session_type: string;
  year: number;
}

export async function importSessions(prisma: PrismaClient) {
  try {
    const response = await axios.get<Session[]>('https://api.openf1.org/v1/sessions?session_key=latest');
    const data = response.data;

    await prisma.sessions.createMany({
      data: data.map(session => ({
        circuit_key: session.circuit_key,
        circuit_short_name: session.circuit_short_name,
        country_code: session.country_code,
        country_key: session.country_key,
        country_name: session.country_name,
        date_end: new Date(session.date_end),
        date_start: new Date(session.date_start),
        gmt_offset: session.gmt_offset,
        location: session.location,
        meeting_key: session.meeting_key,
        session_key: session.session_key,
        session_name: session.session_name,
        session_type: session.session_type,
        year: session.year
      })),
    });

    console.log('Sessions imported successfully');
  } catch (error) {
    console.error('Error importing sessions:', error);
    throw error;
  }
}
