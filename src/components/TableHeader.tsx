import styled from "styled-components";

export const TableHeader = () => {
  return (
    <Container>
      {["Pair", "Price", "Fee[u]", "Fee[%]", "Final Price"].map((text) => (
        <ColumnHeader key={text}>{text}</ColumnHeader>
      ))}
    </Container>
  );
};

const Container = styled.div({
  backgroundColor: "black",
  display: "grid",
  gridAutoFlow: "column",
  gap: "48px",
  gridAutoColumns: "1fr",
  justifyItems: "center",
});

const ColumnHeader = styled.div({ color: "white", padding: "8px 0" });
