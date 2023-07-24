import { useState, useEffect } from "react";

import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        const fetchMeals = async () => {
            const response = await fetch(process.env.REACT_APP_URL + "meals.json");

            if (!response.ok) {
                throw new Error("Request failed!");
            }

            const responseData = await response.json();
            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                });
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch((err) => {
            setError(err.message || "Something went wrong!");
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <section className={classes["meals-loading"]}>
                <p>Loading...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className={classes["meals-error"]}>
                <p>{error}</p>
            </section>
        );
    }

    const mealsList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
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
