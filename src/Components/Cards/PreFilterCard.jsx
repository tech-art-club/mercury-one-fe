import { useNavigate } from 'react-router-dom';
import { navigateFromMainToCatalog } from '../../Helpers/navigate';
import styles from './PreFilterCard.module.scss';

const PreFilterCard = ({ content, type }) => {
  const navigate = useNavigate();

  function toContent() {
    navigate(navigateFromMainToCatalog(type, content.title));
  }

  return (
    <div key={content.id} className={styles.card} onClick={toContent}>
      <div className={styles.card__title}>{content.title}</div>
    </div>
  );
};

export default PreFilterCard;
