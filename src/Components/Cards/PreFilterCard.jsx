import { useNavigate } from 'react-router-dom';
import { navigateFromMainToCatalog } from '../../Helpers/navigate';
import styles from './PreFilterCard.module.css';

const PreFilterCard = ({ content, type }) => {
  const navigate = useNavigate();

  function toContent() {
    navigate(navigateFromMainToCatalog(type, content.title));
  }

  return (
    <div key={content.id} className={styles.content} onClick={toContent}>
      {content.title}
    </div>
  );
};

export default PreFilterCard;
