import React, { useEffect } from 'react';
import io from '@/utils/ws';

const WapView: React.FC = () => {
  useEffect(() => {
    io.on('data', (msg) => {
      console.log(msg);
    });

    io.emit('data', 'test...');
  });
  return <></>;
};

export default WapView;
