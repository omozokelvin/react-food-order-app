import Card from 'components/UI/Card';
import { useEffect, useReducer, useState } from 'react';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const actions = Object.freeze({
  LOADED: 'LOADED',
  STOP_LOADING: 'STOP_LOADING',
  ERROR: 'ERROR',
});

const initialMealsState = {
  meals: [],
  isLoading: true,
  httpError: null,
};

const mealsStateReducer = (state, action) => {
  if (action.type === actions.LOADED) {
    return { ...state, meals: action.payload };
  }

  if (action.type === actions.STOP_LOADING) {
    return { ...state, isLoading: false };
  }

  if (action.type === actions.ERROR) {
    return { ...state, httpError: action.payload };
  }

  return state;
};

const AvailableMeals = () => {
  const [mealsState, dispatch] = useReducer(
    mealsStateReducer,
    initialMealsState
  );

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-54590-default-rtdb.firebaseio.com/meals.json'
      );

      if (!response.ok) {
        throw Error('Something went wrong');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const [key, value] of Object.entries(responseData)) {
        loadedMeals.push({
          id: key,
          ...value,
        });
      }

      dispatch({
        type: actions.LOADED,
        payload: loadedMeals,
      });

      dispatch({ type: actions.STOP_LOADING });
    };

    fetchMeals().catch((error) => {
      dispatch({ type: actions.STOP_LOADING });

      dispatch({ type: actions.ERROR, payload: error.message });
    });
  }, []);

  if (mealsState.isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (mealsState.httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{mealsState.httpError}</p>
      </section>
    );
  }

  const mealsList = mealsState.meals.map(({ id, name, description, price }) => (
    <MealItem
      id={id}
      key={id}
      name={name}
      description={description}
      price={price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
