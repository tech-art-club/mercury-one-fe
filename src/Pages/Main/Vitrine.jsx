import { Children, useState } from 'react';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import styles from './Vitrine.module.scss';

const Vitrine = ({ title, children }) => {
  const [activeQuantity, setActiveQuantity] = useState(5);

  function showMore() {
    setActiveQuantity(activeQuantity + 5);
  }

  return (
    <div className={styles.vitrineContainer}>
      <div className={styles.vitrineContainer__title}>{title}</div>
      <div className={styles.vitrineContainer__content}>
        {Children.map(children, (child, i) => i < activeQuantity && child)}
      </div>
      <div className={styles.vitrineContainer__button}>
        <PrimaryButton
          onClick={showMore}
          fontSize={'24px'}
          display={activeQuantity >= children?.length ? 'none' : 'block'}
        >
          Show more
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Vitrine;
