import { Children, useState } from 'react';
import styles from './Vitrine.module.css';

const Vitrine = ({ title, children }) => {
  const [activeQuantity, setActiveQuantity] = useState(5);

  function showMore() {
    setActiveQuantity(activeQuantity + 5);
  }

  return (
    <div className={styles.vitrineContainer}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>
        {Children.map(children, (child, i) => i < activeQuantity && child)}
      </div>
      <button
        className={styles.showMoreBtn}
        onClick={showMore}
        style={
          activeQuantity >= children?.length
            ? { display: 'none' }
            : { display: 'block' }
        }
      >
        Show more
      </button>
    </div>
  );
};

export default Vitrine;
