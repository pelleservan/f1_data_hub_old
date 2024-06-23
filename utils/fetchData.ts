import { PrismaClient } from '@prisma/client';
import { importIntervals } from './importIntervals';
import { importCarData } from './importCarData';
import { importDrivers } from './importDrivers';
import { importLaps } from './importLaps';
import { importLocation } from './importLocation';
import { importMeetings } from './importMeetings';
import { importPit } from './importPit';
import { importPosition } from './importPosition';
import { importRaceControl } from './importRaceControl';
import { importSessions } from './importSessions';
import { importStints } from './importStints';
import { importTeamRadio } from './importTeamRadio';
import { importWeather } from './importWeather';

const prisma = new PrismaClient();

export async function fetchData(prisma: PrismaClient) {
  try {
    await Promise.all([
      importIntervals(prisma),
      importCarData(prisma),
      importDrivers(prisma),
      importLaps(prisma),
      importLocation(prisma),
      importMeetings(prisma),
      importPit(prisma),
      importPosition(prisma),
      importRaceControl(prisma),
      importSessions(prisma),
      importStints(prisma),
      importTeamRadio(prisma),
      importWeather(prisma),
    ]);

    console.log('All data imported successfully');
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    await prisma.$disconnect();
  }
}
