import styled from "styled-components";

const StyledTable = styled.table`
width: 100%;
th{
  text-align: left;
  text-transform: uppercase;
  color: #206040;
  font-weight: normal;
  font-size: .8rem;
}
td{
    border-top: 1px solid #d5ff80;
}
`;



export default function Table(props) {
return <StyledTable {...props} />
}