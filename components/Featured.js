import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import BtnLink from "./BtnLink";
import { useContext } from "react";
import { ReportContext } from "./ReportContext";

const Bg = styled.div`
background-color:  #669900;
color: #fff;
padding: 50px 0;
`;

const Desc = styled.p`
color: #223300;
font-size: .9rem;
`;

const Title = styled.h1`
margin: 0;
font-weight:normal;
font-size: 2rem;
@media screen and (min-width: 768px) {
    font-size: 2.5rem;
}
`;

const ColWrapper = styled.div`
display: grid;
grid-template-columns: 1fr;
gap: 40px;
img{
    max-width: 100%;
}
@media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 1.2fr;
}
`;

const BtnWrapper = styled.div`
display: flex;
gap: 10px;
margin-top: 25px;
`;

const Column = styled.div`
display: flex;
align-items: center;
`;

export default function Featured({podopieczny}) {
    const {addAnimal} = useContext(ReportContext);
    function reportFeatured() {
        addAnimal(podopieczny._id);
    }
    return(
        <Bg>
            <Center>
                <ColWrapper>
                    <Column>
                    <div>
                    <Title>{podopieczny.nazwa}</Title>
                        <Desc>{podopieczny.opis}</Desc>
                        <BtnWrapper>
                        <BtnLink href={'/podopieczny/'+podopieczny._id} outline={1} white={1}>Dowiedz się więcej</BtnLink>
                        <Button primary onClick={reportFeatured}>Adoptuj</Button>
                        </BtnWrapper>
                        </div>
                    </Column>
                    <Column>
                        <img src="https://next-schronisko.s3.amazonaws.com/1710027431951.jpg" alt=""/>
                    </Column>
                </ColWrapper>
            </Center>
        </Bg>
    );
}