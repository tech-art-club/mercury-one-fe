import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { requestWithTokenValidation } from '../../Helpers/requestWithTokenValidation';
import { isLike } from '../../Helpers/isLike';
import styles from './RecipeLike.module.scss';
import { useEffect, useState } from 'react';

const RecipeLike = ({ id, updateLikes }) => {
  const [isLikedByUser, setIsLikedByUser] = useState(false);
  const url = `https://mercury-uc-app-dev.azurewebsites.net/Recipes/${id}/isLikedBy`;

  useEffect(() => {
    if (id) {
      const checkIsLiked = async () => {
        try {
          const res = await requestWithTokenValidation((headers) => {
            return axios.get(url, { headers });
          });
          setIsLikedByUser(res.data);
          return await res;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      checkIsLiked();
    }
  }, [id, url]);

  const handleClick = async (event) => {
    event.stopPropagation();
    try {
      const res = await isLike(id, isLikedByUser);
      setIsLikedByUser(!isLikedByUser);
      updateLikes(isLikedByUser ? -1 : 1);
      return res;
    } catch (error) {
      console.error('Error occurred while processing like:', error);
    }
  };

  return (
    <FaHeart
      className={isLikedByUser ? styles.liked : styles.unliked}
      onClick={handleClick}
    />
  );
};

export default RecipeLike;
