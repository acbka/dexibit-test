import React, { useEffect, useState } from "react";
import Chart from "./components/Chart";
import Header from "./components/Header";
import Table from "./components/Table";
import Spinner from "./components/Spinner";

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

function App() {
  const [starships, setStarships] = useState<StarshipInterface[]>([]);

  const getStarships = async () => {
    try {
      const response = await fetch("https://swapi.dev/api/starships");
      const json = await response.json();
      const results = json.results;
      setStarships(results);
    } catch (error) {
      console.log("There is an error", error);
    }
  };

  useEffect(() => {
    getStarships();
  }, []);

  const starshipsName = starships?.map(({ name }) => name);

  const starshipsSpeed = starships?.map(({ max_atmosphering_speed }) =>
    parseInt(max_atmosphering_speed)
  );

  return (
    <>
      <Header />
      {starships?.length ? (
        <>
          <Chart name={starshipsName} speed={starshipsSpeed} />
          <Table starships={starships} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default App;
