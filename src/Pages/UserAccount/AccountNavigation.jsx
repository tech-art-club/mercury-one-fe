import { Link, useMatch } from 'react-router-dom';
import styles from './AccountNavigation.module.css';

const AccountNavigation = () => {
  const ordersMatch = useMatch('/account/orders');
  const viewedRecipesMatch = useMatch('/account/viewed-recipes');
  const favoriteRecipesMatch = useMatch('/account/favorite-recipes');
  const addRecipeMatch = useMatch('/account/add-recipe');

  return (
    <nav className={styles.wrapper}>
      <Link
        className={`${styles.link} ${ordersMatch ? styles.active : ''}`}
        to="orders"
      >
        My orders
      </Link>
      <Link
        className={`${styles.link} ${viewedRecipesMatch ? styles.active : ''}`}
        to="viewed-recipes"
      >
        Viewed recipes
      </Link>
      <Link
        className={`${styles.link} ${
          favoriteRecipesMatch ? styles.active : ''
        }`}
        to="favorite-recipes"
      >
        Favorite recipes
      </Link>
      <Link
        className={`${styles.link} ${addRecipeMatch ? styles.active : ''}`}
        to="add-recipe"
      >
        Add recipe
      </Link>
    </nav>
  );
};

export default AccountNavigation;
