import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [DUMMY_MEALS, setDUMMY_MEALS] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorOccurred, setErrorOccured] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("https://react-demo-51a5a-default-rtdb.firebaseio.com/meals.json");
      if (!response.ok) throw new Error("something went wrong");

      const data = await response.json();
      let loadedMeals = [];
      for (const Key in data) {
        loadedMeals.push({
          id: data[Key].id,
          description: data[Key].description,
          price: data[Key].price,
          name: data[Key].name,
        });
      }
      setDUMMY_MEALS(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setErrorOccured(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading Meals...</p>
      </section>
    );
  }

  if (errorOccurred) {
    return (
      <section className={classes.error}>
        <p>{errorOccurred}</p>
      </section>
    );
  }
  const meals = DUMMY_MEALS.map((meal) => (
    <MealItem meal={meal} key={meal.id} />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{meals}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
