import React, { useState } from 'react';
import {BarcodeScanner} from 'react-barcode-scanner'

const BarcodeScan = () => {
    const [data, setData] = useState('No result');
    const [scanning, setScanning] = useState(false);
  
    const handleToggle = () => {
      setScanning(prevState => !prevState);
    };
  
    return (
      <div>
        <button style={{backgroundColor: 'green', padding: '6px', borderRadius:'5px', color:'#fff'}} onClick={handleToggle}>
          {scanning ? 'Stop Scanning' : 'Scan Barcode'}
        </button>
        {scanning && (
          <BarcodeScanner
            width={500}
            height={500}
            onUpdate={(err, result) => {
              if (result) setData(result.text);
              else setData('No result');
            }}
          />
        )}
        <p>{data}</p>
      </div>
    );
  };;

export default BarcodeScan;
