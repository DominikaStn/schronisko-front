import styled from "styled-components";
import AnimalBox from "./AnimalBox";

const StyledAnimalsGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap: 20px;
@media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
}
`;

export default function AnimalsGrid({podopieczni}) {
    return (
        <StyledAnimalsGrid>
                {podopieczni?.length > 0 && podopieczni.map(podopieczny =>(
                <AnimalBox key={podopieczny._id} {...podopieczny} />
            ))}
        </StyledAnimalsGrid>
    );
}