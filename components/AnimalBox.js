import styled from "styled-components";
import Button from "./Button";
import Icons from "./Icons";
import Link from "next/link";
import { useContext } from "react";
import { ReportContext } from "./ReportContext";

const AnimalWrapper = styled.div`

`;

const WhiteBox = styled(Link)`
background-color: #fff;
padding:10px;
height: 150px;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
border-radius: 10px;
img{
    max-width:100%;
    max-height: 150px;
}
`;

const Title = styled(Link)`
font-weight: normal;
font-size: 1rem;
margin: 0;
font-weight: bold;
color: inherit;
text-decoration: none;
`;

const AnimalInfoBox = styled.div`
margin-top: 5px;
//text-align: center;
`;

const TimeRow = styled.div`
display: block;
@media screen and (min-width: 768px) {
    display: flex;
}
align-items: center;
justify-content: space-between;
margin-top: 5px;
`;

const Months = styled.div`
font-size: 1rem;
font-weight: 400;
text-align: center;
`;

export default function AnimalBox({_id, nazwa, opis, miesiace, zdjecia}) {
    const {addAnimal} = useContext(ReportContext);
    const url ='/podopieczny/'+_id;
    return(
        <AnimalWrapper>
        <WhiteBox href={url}>
            <div>
            <img src={zdjecia?.[0]} alt="" />
            </div>
        </WhiteBox>
        <AnimalInfoBox>
        <Title href={url}>{nazwa}</Title>
        <TimeRow>
        <Months>
             w schronisku: {miesiace} miesięcy
            </Months>
            <Button onClick={() => addAnimal(_id)} primary outline>Adoptuj</Button>
        </TimeRow>
        </AnimalInfoBox>
        </AnimalWrapper>
    );
}