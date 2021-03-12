import styled from "styled-components";
import { useEffect, useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { RatesApiResponseType } from "../api/types";

export type RatesCreatorProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rates: RatesApiResponseType;
  setRates: React.Dispatch<React.SetStateAction<RatesApiResponseType>>;
};

export type FormData = {
  fromSymbol: string;
  toSymbol: string;
  fee: number;
};

export function RateCreator({
  isOpen,
  setIsOpen,
  rates,
  setRates,
}: RatesCreatorProps) {
  const { handleSubmit, watch, register, errors } = useForm<FormData>({
    mode: "onSubmit",
    defaultValues: { fee: 0 },
  });

  const [originalRate, setOriginalRate] = useState<number>();

  useEffect(() => {
    let fromSymbolPrice;
    let toSymbolPrice;

    if (watch("fromSymbol") !== "" && watch("toSymbol") !== "") {
      fromSymbolPrice = rates.find(
        (rate) => rate.symbol === watch("fromSymbol")
      )?.price as number;
      toSymbolPrice = rates.find((rate) => rate.symbol === watch("toSymbol"))
        ?.price as number;
      setOriginalRate(fromSymbolPrice / toSymbolPrice);
    }
  }, [watch, rates]);

  return isOpen ? (
    <Container>
      <ModalBox>
        <Title>Pair Creator</Title>
        <Form onSubmit={handleSubmit(submitData)}>
          <TripleColumnRow>
            <InputContainer>
              <Dropdown
                name="fromSymbol"
                ref={register({
                  required: "Required",
                })}
              >
                <Option hidden></Option>
                {rates
                  .filter((rate) => rate.symbol.slice(-4) === "USDT")
                  .map((rate) => (
                    <Option key={rate.symbol} value={rate.symbol}>
                      {rate.symbol.slice(0, -4)}
                    </Option>
                  ))}
              </Dropdown>
              <ErrorMsg>{errors.fromSymbol?.message}</ErrorMsg>
            </InputContainer>
            {"-->"}
            <InputContainer>
              <Dropdown
                name="toSymbol"
                ref={register({
                  required: "Required",
                })}
              >
                <Option hidden></Option>
                {rates
                  .filter((rate) => rate.symbol.slice(-4) === "USDT")
                  .map((rate) => (
                    <Option key={rate.symbol} value={rate.symbol}>
                      {rate.symbol.slice(0, -4)}
                    </Option>
                  ))}
              </Dropdown>
              <ErrorMsg>{errors.toSymbol?.message}</ErrorMsg>
            </InputContainer>
          </TripleColumnRow>

          {originalRate != null && !isNaN(originalRate) && (
            <Fragment>
              <Row>
                <RowTitle>Original Rate</RowTitle>
                <RowValue>{originalRate.toFixed(4)}</RowValue>{" "}
              </Row>
              <InputContainer>
                <Row>
                  <RowTitle>Fee</RowTitle>
                  <Input
                    name="fee"
                    type="number"
                    min={0}
                    ref={register({})}
                    step="0.01"
                  ></Input>
                  <RowValueInline>
                    {((100 * watch("fee")) / originalRate).toFixed(2)}%
                  </RowValueInline>
                </Row>
              </InputContainer>
              <Row>
                <RowTitle>Total Rate</RowTitle>
                <RowValue>
                  {(originalRate + watch("fee") / 1).toFixed(4)}
                </RowValue>
              </Row>
            </Fragment>
          )}
          <ButtonsContainer>
            <Button type="submit">Create</Button>
            <Button type="button" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ButtonsContainer>
        </Form>
      </ModalBox>
    </Container>
  ) : null;

  function submitData(data: FormData) {
    const newRate = {
      symbol: data.fromSymbol.slice(0, -4) + data.toSymbol.slice(0, -4),
      price: originalRate as number,
      fee: data.fee,
    };

    setRates((rates) => [newRate, ...rates]);
    setIsOpen(false);
  }
}

const Container = styled.div({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.65)",
  zIndex: 90000,
});

const ModalBox = styled.div({
  position: "fixed",
  width: "20rem",
  backgroundColor: "white",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  padding: "2rem 1.6rem",
});

const TripleColumnRow = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  columnGap: "1.8rem",
});

const ButtonsContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  gap: "4px",
  paddingTop: "8px",
});

const Title = styled.h1({
  fontSize: "1.4rem",
  marginTop: 0,
  textAlign: "center",
});

const Form = styled.form({
  display: "grid",
  rowGap: "0.8rem",
});

const Button = styled.button({});

const InputContainer = styled.div({
  display: "grid",
});

const Dropdown = styled.select({
  height: "20px",
});

const ErrorMsg = styled.small({
  color: "red",
  fontSize: "0.6rem",
});

const Option = styled.option({});

const RowValue = styled.p({
  margin: 0,
  fontWeight: "bold",
});

const RowTitle = styled.p({
  margin: 0,
});

const RowValueInline = styled.span({
  marginLeft: "4px",
  fontWeight: "bold",
});

const Input = styled.input({});

const Row = styled.span({});
