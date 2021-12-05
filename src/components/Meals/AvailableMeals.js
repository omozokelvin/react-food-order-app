import Card from 'components/UI/Card';
import { DUMMY_MEALS } from '../../constants/dummy-meals';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map(({ id, name, description, price }) => (
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
