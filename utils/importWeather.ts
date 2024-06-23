import axios from 'axios';
import { PrismaClient } from '@prisma/client';

interface Weather {
  air_temperature: number;
  date: string;
  humidity: number;
  meeting_key: string;
  pressure: number;
  rainfall: number;
  session_key: string;
  track_temperature: number;
  wind_direction: number;
  wind_speed: number;
}

export async function importWeather(prisma: PrismaClient) {
  try {
    const response = await axios.get<Weather[]>('https://api.openf1.org/v1/weather?session_key=latest');
    const data = response.data;

    await prisma.weather.createMany({
      data: data.map(weather => ({
        air_temperature: weather.air_temperature,
        date: new Date(weather.date),
        humidity: weather.humidity,
        meeting_key: weather.meeting_key,
        pressure: weather.pressure,
        rainfall: weather.rainfall,
        session_key: weather.session_key,
        track_temperature: weather.track_temperature,
        wind_direction: weather.wind_direction,
        wind_speed: weather.wind_speed
      })),
    });

    console.log('Weather data imported successfully');
  } catch (error) {
    console.error('Error importing weather data:', error);
    throw error;
  }
}
