// pages/import-data.tsx

import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { fetchData } from '../utils/fetchData';

interface ImportDataPageProps {
  success?: boolean;
  error?: string;
}

const ImportDataPage = ({ success, error }: ImportDataPageProps) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {success && <div>Data import successful!</div>}
      <div>Content of import-data page</div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ImportDataPageProps> = async () => {
  const prisma = new PrismaClient();

  try {
    await fetchData(prisma);
    console.log('Data import process completed successfully');
    
    return {
      props: {
        success: true,
      },
    };
  } catch (error) {
    console.error('Error during data import:', error);
    return {
      props: {
        error: 'Failed to import data',
      },
    };
  } finally {
    await prisma.$disconnect();
  }
};

export default ImportDataPage;
