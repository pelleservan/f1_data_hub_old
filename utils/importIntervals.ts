import axios from 'axios';
import { PrismaClient } from '@prisma/client';

// Définition du type pour les données de l'intervalle
interface IntervalData {
  date: string;
  driver_number: number;
  gap_to_leader?: number | null; // Peut être facultatif
  interval?: number | null; // Peut être facultatif
  meeting_key: number;
  session_key: number;
}

// Fonction pour importer les intervalles
export async function importIntervals(prisma: PrismaClient) {
  try {
    // Appel à l'API externe pour récupérer les données des intervalles
    const response = await axios.get<IntervalData[]>('https://api.openf1.org/v1/intervals?session_key=latest');
    const data = response.data;

    // Insertion des données dans la base de données à l'aide de Prisma
    await prisma.interval.createMany({
      data: data.map(interval => ({
        date: new Date(interval.date),
        driver_number: interval.driver_number,
        gap_to_leader: interval.gap_to_leader ?? undefined,
        interval: interval.interval ?? undefined,
        meeting_key: interval.meeting_key,
        session_key: interval.session_key,
      })),
    });

    console.log('Intervals imported successfully');
  } catch (error) {
    console.error('Error importing intervals:', error);
    throw error; // Rejeter l'erreur pour la gestion centralisée des erreurs dans fetchData()
  }
}
