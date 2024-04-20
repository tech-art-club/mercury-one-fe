import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PiTimerLight } from 'react-icons/pi';
import Share from '../../Components/Share/Share';
import RecipeLike from '../../Components/Likes/RecipeLike';
import { addViewedRecipe } from '../../Store/Slices/authReducer';
import { selectAuth } from '../../Store/Slices/authReducer';
import styles from './Recipe.module.css';
import { useEffect, useState } from 'react';
import { PieChart, pieChartDefaultProps } from 'react-minimal-pie-chart';
import { useSelector, useDispatch } from 'react-redux';

const defaultLabelStyle = {
  fontSize: '5px',
  fontFamily: 'sans-serif',
};
const shiftSize = 1;

const Recipe = () => {
  const { id } = useParams();
  const fullUrl = window.location.href;
  const dispatch = useDispatch();
  const userId = useSelector(selectAuth);
  const [recipe, setRecipe] = useState({});
  const [likes, setLikes] = useState(recipe.likes);

  const updateLikes = (newLikes) => {
    setLikes((prevLikes) => prevLikes + newLikes);
  };

  useEffect(() => {
    const fetchRecipe = async (recipeId) => {
      const res = await axios.get(
        `https://mercure-recipe-app-dev.azurewebsites.net/Recipes?id=${recipeId}`
      );
      const recipe = {
        id: res.data.id,
        title: res.data.title,
        smallImageUrl: res.data.smallImageUrl,
        likes: res.data.likes,
      };
      dispatch(addViewedRecipe({ recipe, userId }));
      return setRecipe(res.data);
    };

    if (id) {
      fetchRecipe(id);
    }
  }, [id, dispatch, userId]);

  useEffect(() => {
    setLikes(recipe.likes || 0);
  }, [recipe]);

  return (
    id && (
      <div className={styles.recipeContainer}>
        <div className={styles.title}>{recipe.title}</div>
        <div className={styles.contentRow}>
          <div className={styles.imageContainer}>
            <img src={recipe.imageUrl} alt="img" />
          </div>
          <div className={styles.ingredients}>
            <p style={{ alignSelf: 'flex-start' }}>Ingredients</p>
            <div className={styles.servings}>servings: 1 + -</div>
            {recipe.products?.map((el, i) => (
              <div className={styles.product} key={i}>
                <div style={{ width: '50%' }}>{el.name}</div>
                <div style={{ width: '20%' }}>{el.quantity}</div>
                <div style={{ width: '30%', textAlign: 'end' }}>
                  {el.measurement}
                </div>
              </div>
            ))}
            <div className={styles.likes}>
              <Share fullUrl={fullUrl} />
              <div className={styles.likesIcon}>
                <RecipeLike id={recipe.id} updateLikes={updateLikes} />
              </div>
              <span className={styles.likesQuantity}>{likes}</span>
            </div>
          </div>
        </div>
        <div className={styles.cookingTime}>
          <PiTimerLight className={styles.cookingTimeIcon} />
          {recipe.cookingTimeMinutes} min
        </div>
        <div className={styles.contentRow}>
          <div className={styles.contentColumn}>
            <div className={styles.cuisine}>
              Cuisine: {recipe.cuisines?.map((el) => el.title)}
            </div>
            <div className={styles.dishType}>
              Dish type: {recipe.dishTypes?.map((el) => el.title)}
            </div>
            <div className={styles.diet}>
              Diet: {recipe.diets?.map((el) => el.title)}
            </div>
          </div>
          <div className={styles.description}>
            Description: <br />
            {recipe.description}
          </div>
        </div>
        {typeof recipe.calorieContent === 'number' &&
          recipe.calorieContent > 0 && (
            <div style={{ height: '200px', display: 'flex' }}>
              <span>
                <PieChart
                  data={[
                    {
                      title: 'Proteins',
                      value: recipe.proteins,
                      color: '#0000FF',
                    },
                    {
                      title: 'Fats',
                      value: recipe.fats,
                      color: '#FFA500',
                    },
                    {
                      title: 'Carbohydrates',
                      value: recipe.carbohydrates,
                      color: '#6A2135',
                    },
                  ]}
                  radius={pieChartDefaultProps.radius - shiftSize}
                  segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
                  label={({ dataEntry }) => dataEntry.value}
                  labelStyle={{
                    ...defaultLabelStyle,
                  }}
                />
              </span>
              <span>
                <div>100 grams of recipe</div>
                <div>calories: {recipe.calorieContent} kcal</div>
                <div>proteins: {recipe.proteins} grams</div>
                <div>fats: {recipe.fats} grams</div>
                <div>carbohydrates: {recipe.carbohydrates} grams</div>
              </span>
            </div>
          )}
        <div className={styles.cookingSteps}>
          {recipe.cookingSteps
            ?.sort((a, b) => a.stepNumber - b.stepNumber)
            .map((el) => (
              <div key={el.id}>
                <div className={styles.step}>Step {el.stepNumber}</div>
                <div className={styles.stepDescription}>{el.description}</div>
                {el.imageUrl && (
                  <div className={styles.stepImage}>
                    <img src={el.imageUrl} alt="smallImg" />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default Recipe;
