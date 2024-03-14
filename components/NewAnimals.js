import styled from "styled-components";
import Center from "./Center";
import AnimalsGrid from "./AnimalsGrid";





const Naglowek = styled.h2`
font-size: 1.1rem;
color: #206040;
margin: 25px 0 30px;
font-weight: 500;
`;

export default function NewAnimals({podopieczni}) {
    return(
        <Center>
            <Naglowek>NAJNOWSI MIESZKAŃCY SCHRONISKA</Naglowek>
            <AnimalsGrid podopieczni={podopieczni} />
        </Center>
    );
}