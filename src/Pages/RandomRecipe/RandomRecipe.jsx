
import { useParams } from 'react-router-dom';
import styles from '../Recipe/Recipe.module.css';
import React, { useEffect, useState } from 'react';
import Connector from '../Diet/testCon'

function parseRecipe(message) {
  if (message.substring(message.length - 2) === `{"`) {
    message[message.length - 2] = ']'
    message[message.length - 1] = '}'
  } else {
    let arrayStartsCounter = 0
    let arrayEndsCounter = 0
    let objectStartsCounter = 0
    let objectEndsCounter = 0
    let doubleQuotesCounter = 0
    let colonsCounter = 0

    for (let i = 0; i < message.length; i++) {
      if (message[i] === `{`) {
        objectStartsCounter++;
      }
      if (message[i] === `}`) {
        objectEndsCounter++;
      }
      if (message[i] === `[`) {
        arrayStartsCounter++;
      }
      if (message[i] === `]`) {
        arrayEndsCounter++;
      }
      if (message[i] === `"`) {
        doubleQuotesCounter++;
      }
      if (message[i] === `:`) {
        colonsCounter++;
      }
    }

    if (doubleQuotesCounter % 2 !== 0) {
      let indexOfLastDoubleQuote = message.lastIndexOf(`"`);

      message = message + `"`

      if (indexOfLastDoubleQuote !== -1) {
        if (message[indexOfLastDoubleQuote - 1] !== `:` &&
          message[indexOfLastDoubleQuote - 1] !== `{` &&
          message[indexOfLastDoubleQuote - 1] !== `[`) {

          message = message + `:""`
        }
      }
    }

    if (arrayStartsCounter != arrayEndsCounter) {
      if (objectStartsCounter !== objectEndsCounter && message[message.length - 2] !== ':') {
        message = message + `}`
      }

      message = message + `]}`
    } else if (objectStartsCounter !== objectEndsCounter) {
      message = message + `}`
    }
  }
  try {
    let json = JSON.parse(message)

    return json;
  } catch (error) {

    return false;
  }
}

const RandomRecipe = () => {
  const { methods, events } = Connector();
  const [recipe, setRecipe] = useState({});
  const [connectionId, setconnectionId] = useState('');

  useEffect(() => {
    events((method, messageFromSignal) => {
      if (method === methods.ReciveRecipePart) {
        let recipeJson = parseRecipe(messageFromSignal)
        if (recipeJson !== false) {
          setRecipe(recipeJson)
        }
      }

      if (method === methods.ReceiveConnectionId) {
        setconnectionId(messageFromSignal)
      }
    });
  });

  return (
    <div className={styles.recipeContainer}>
      <div>{connectionId}</div>
      <div className={styles.title}>{recipe.Title}</div>
      <div className={styles.contentRow}>
        <div className={styles.imageContainer}>
          <img src={recipe.ImageUrl} alt="img" />
        </div>
        <div className={styles.ingredients}>
          <p style={{ alignSelf: 'flex-start' }}>Ingredients</p>
          <div className={styles.servings}>servings: 1 + -</div>
          {
            Array.isArray(recipe.Products) ?
              recipe.Products?.map((el, index) => (
                <div className={styles.product} key={index}>
                  {el} <p>100gr</p>
                </div>
              )) : ''}
        </div>
      </div>
      <div className={styles.contentRow}>
        <div className={styles.contentColumn}>
          <div className={styles.cuisine}>
            Cuisine: {
              Array.isArray(recipe.Cuisine) ?
                recipe.Cuisine?.map((el, index) => <span key={index}>{el}</span>) : ''
            }
          </div>
          <div className={styles.dishType}>
            Dish type: {
              Array.isArray(recipe.DishType) ?
                recipe.DishType?.map((el, index) => <span key={index}>{el}</span>) : ''
            }
          </div>
          <div className={styles.diet}>
            Diet: {
              Array.isArray(recipe.Diet) ?
                recipe.Diet?.map((el, index) => <span key={index}>{el}</span>) : ''
            }
          </div>
        </div>
        <div className={styles.description}>
          Description: <br />
          {recipe.Description}
        </div>
      </div>
      <div className={styles.cookingSteps}>
        {
          Array.isArray(recipe.CookingSteps) ?
            recipe.CookingSteps
              ?.sort((a, b) => a.StepNumber - b.StepNumber)
              .map((el) => (
                <div key={el.id}>
                  <div className={styles.step}>Step {el.StepNumber}</div>
                  <div className={styles.stepDescription}>{el.Description}</div>
                </div>
              )) : ''}
      </div>
    </div>
  )
};

export default RandomRecipe;