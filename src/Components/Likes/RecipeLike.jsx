import { CiHeart } from 'react-icons/ci';
import { isLike } from '../../Helpers/isLike';
import styles from './RecipeLike.module.scss';

const RecipeLike = ({ id }) => {
  const handleClick = (event) => {
    event.stopPropagation();
    isLike(id);
  };

  return <CiHeart className={styles.like} onClick={handleClick} />;
};

export default RecipeLike;
