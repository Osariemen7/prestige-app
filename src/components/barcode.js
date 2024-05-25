import React, { useState } from 'react';
import {BarcodeScanner} from '@thewirv/react-barcode-scanner';

const BarcodeScan = () => {
  const [data, setData] = useState('No result');
  const [scanning, setScanning] = useState(false);

  const handleToggle = () => {
    setScanning(prevState => !prevState);
  };
  return (
    <>
    <button onClick={handleToggle} style={{backgroundColor:'green', padding:'5px', borderRadius:'5px', color:'#fff' }}>
      {scanning ? 'Stop Scanning' : 'Scan Barcode'}
    </button>
    {scanning && (
      <BarcodeScanner
        onSuccess={(text) => setData(text)}
        onError={(error) => {
          if (error) {
            console.error(error.message);
          }
        }}
        onLoad={() => console.log('Video feed has loaded!')}
        containerStyle={{ width: '100%' }}
      />
    )}
    <p>{data}</p>
  </>
    );
  };;

export default BarcodeScan;
