import React from 'react';
import styles from './ProgressBar.module.scss';
import { Flat } from '@alptugidin/react-circular-progress-bar';

const ProgressBar = () => {
  return (
    <div className={styles.progressBar}>
      <Flat
        progress={99}
        range={{ from: 0, to: 100 }}
        sign={{ value: '%', position: 'end' }}
        text={''}
        showMiniCircle={true}
        showValue={true}
        sx={{
          strokeColor: '#febc6a',
          barWidth: 5,
          bgStrokeColor: '#ffffff',
          bgColor: { value: '#000000', transparency: '20' },
          shape: 'full',
          strokeLinecap: 'round',
          valueSize: 13,
          valueWeight: 'bold',
          valueColor: '#febc6a',
          valueFamily: 'Trebuchet MS',
          textSize: 13,
          textWeight: 'bold',
          textColor: '#000000',
          textFamily: 'Trebuchet MS',
          loadingTime: 60000,
          miniCircleColor: '#ff0000',
          miniCircleSize: 5,
          valueAnimation: true,
          intersectionEnabled: true,
        }}
      />
    </div>
  );
};

export default ProgressBar;
