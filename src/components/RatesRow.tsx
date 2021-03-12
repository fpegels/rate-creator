import styled from "styled-components";

type RatesRowProps = {
  symbol: string;
  rate: number;
  fee: number;
};

export const RatesRow = ({ symbol, rate, fee }: RatesRowProps) => {
  return (
    <Container>
      <Symbol>{symbol}</Symbol>
      <Price>{rate.toFixed(4)}</Price>
      <Fee>{fee}</Fee>
      <FeeAsPercentage>{((100 * fee) / rate).toFixed(2)}</FeeAsPercentage>
      <TotalPrice>{(1 * rate + 1 * fee).toFixed(4)}</TotalPrice>
    </Container>
  );
};

const Container = styled.div({
  display: "grid",
  gridAutoFlow: "column",
  gap: "48px",
  gridAutoColumns: "1fr",
  justifyItems: "center",
  alignSelf: "center",
  paddingTop: "10px",
  height: "40px",
});

const Symbol = styled.div({});
const Price = styled.div({});
const Fee = styled.div({});
const FeeAsPercentage = styled.div({});
const TotalPrice = styled.div({});
