import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { RatesApiResponseType } from "../api/types";
import { RateCreator, Table } from "../components";
import { getRates } from "../api";

export const Rates = () => {
  const [rates, setRates] = useState<RatesApiResponseType>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRates()
      .then((response) => setRates(response))
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (error !== "") return <Fragment>{error}</Fragment>;

  return (
    <Container>
      {isLoading ? (
        <Fragment>Loading...</Fragment>
      ) : (
        <Fragment>
          <Title>Rates</Title>
          <Table rates={rates} setIsModalOpen={setIsModalOpen} />
          <RateCreator
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            rates={rates}
            setRates={setRates}
          />
        </Fragment>
      )}
    </Container>
  );
};

const Container = styled.div({
  padding: "32px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Title = styled.h1({});
