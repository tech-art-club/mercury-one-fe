import React, { useEffect, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

function Diet() {
  const [completedValue, setCompletedValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedValue((prev) => {
        const newValue = prev + 1;
        return newValue > 99 ? 99 : newValue;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '200px' }}>
      <ProgressBar completed={completedValue} maxCompleted={100} />
    </div>
  );
}
export default Diet;
