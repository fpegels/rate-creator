import styled from "styled-components";

type SymbolsSelectorProps = {
  symbols: string[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

export const SymbolsFilter = ({
  symbols,
  selected,
  setSelected,
}: SymbolsSelectorProps) => {
  return (
    <Container>
      {symbols.map((symbol) => (
        <SymbolButton
          key={symbol}
          selected={selected.indexOf(symbol) > -1}
          onClick={() => onClick(symbol)}
        >
          {symbol}
        </SymbolButton>
      ))}
    </Container>
  );

  function onClick(symbol: string) {
    if (selected.indexOf(symbol) > -1) {
      setSelected((selected) =>
        selected.filter((selected) => selected !== symbol)
      );
    } else {
      setSelected((selected) => [...selected, symbol]);
    }
  }
};

const Container = styled.div({
  display: "flex",
  gap: "4px",
});

type SelectedProps = {
  selected: boolean;
};

const SymbolButton = styled.button<SelectedProps>(({ selected }) => ({
  backgroundColor: selected ? "#4194D8" : "white",
  border: "1px solid",
  borderColor: selected ? "#4194D8" : "black",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.6rem",
  outline: "none",
  padding: "4px",
}));
