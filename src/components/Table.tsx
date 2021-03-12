import { useState } from "react";
import styled from "styled-components";
import { SymbolsFilter, RatesRow, TableHeader } from ".";
import { RatesApiResponseType } from "../api/types";

const symbols = ["BTCUSDT", "BTCETH", "ETHUSDT", "XLMUSDT", "BTCXLM"];

type TableProps = {
  rates: RatesApiResponseType;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Table = ({ rates, setIsModalOpen }: TableProps) => {
  const [selectedSymbols, setSelectedSymbols] = useState<typeof symbols>([]);

  return (
    <TableContainer>
      <TableHeader />
      <TableBody>
        {rates
          .filter(
            (rate) =>
              selectedSymbols.length === 0 ||
              selectedSymbols.indexOf(rate.symbol) > -1
          )
          .map((rate) => (
            <RatesRow
              key={rate.symbol + rate.fee}
              symbol={rate.symbol}
              rate={rate.price}
              fee={rate.fee}
            />
          ))}
      </TableBody>
      <Footer>
        <Description>Data provided by Binance.</Description>
        <SymbolsFilterContainer>
          <SymbolsFilterText>Quick Filters</SymbolsFilterText>
          <SymbolsFilter
            symbols={symbols}
            selected={selectedSymbols}
            setSelected={setSelectedSymbols}
          />
        </SymbolsFilterContainer>
        <Button onClick={() => setIsModalOpen(true)}>Create Pair +</Button>
      </Footer>
    </TableContainer>
  );
};

const Footer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  marginTop: "8px",
});

const Description = styled.small({});

const TableBody = styled.div({
  display: "grid",
  gridAutoRows: "48px",
  "& > div:nth-of-type(odd)": {
    backgroundColor: "whitesmoke",
  },
  "& > div:nth-of-type(even)": {
    backgroundColor: "white",
  },
  overflow: "auto",
  height: "300px",
});

const TableContainer = styled.div({
  width: "800px",
  padding: "20px",
  boxShadow: "rgb(0 0 0 / 20%) 0px 2px 5px 0px",
});

const SymbolsFilterText = styled.span({});

const SymbolsFilterContainer = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
});

const Button = styled.button({});
