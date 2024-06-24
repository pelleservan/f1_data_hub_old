import { useState } from 'react';

const ImportDataPage = () => {
  const [status, setStatus] = useState('');

  const importData = async () => {
    setStatus('Importing data...');
    try {
      const response = await fetch('/api/import-data', {
        method: 'POST',
      });

      if (response.ok) {
        setStatus('Data import successful!');
      } else {
        setStatus('Failed to import data');
      }
    } catch (error) {
      console.error('Error during data import:', error);
      setStatus('Failed to import data');
    }
  };

  return (
    <div>
      <button onClick={importData}>Import Data</button>
      <div>{status}</div>
      <div>Content of import-data page</div>
    </div>
  );
};

export default ImportDataPage;
