import React, { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";
import Chart from "../components/Chart";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import Table from "../components/Table";

export interface StarshipInterface {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [starships, setStarships] = useState<StarshipInterface[]>([]);

  const getStarships = async () => {
    try {
      const response = await fetch("https://swapi.dev/api/starships");
      if (!response.ok) {
        throw new Error(String(response.status));
      }
      const json = await response.json();
      const results = json.results;
      setStarships(results);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStarships();
  }, []);

  if (error) {
    return <ErrorPage title={error} />;
  }

  const PageContent = () => {
    const starshipsName = starships?.map(({ name }) => name);

    const starshipsSpeed = starships?.map(({ max_atmosphering_speed }) =>
      parseInt(max_atmosphering_speed)
    );

    return (
      <>
        {starships?.length ? (
          <>
            <Chart name={starshipsName} speed={starshipsSpeed} />
            <Table starships={starships} />
          </>
        ) : (
          <ErrorPage />
        )}
      </>
    );
  };

  return (
    <>
      <Header />
      {isLoading ? <Spinner /> : <PageContent />}
    </>
  );
};

export default HomePage;
