import AnimalImages from "@/components/AnimalImages";
import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Naglowek from "@/components/Naglowek";
import { ReportContext } from "@/components/ReportContext";
import WhiteBox from "@/components/WhiteBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Podopieczny } from "@/models/Podopieczny";
import { useContext } from "react";
import styled from "styled-components";

const ColWrapper = styled.div`
display: grid;
grid-template-columns: 1fr;
@media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
}
gap: 40px;
margin: 40px 0;
`;

const Add = styled.div`
gap: 20px;
display: flex;
align-items: center;
`;

const AddClick = styled.div`
gap: 20px;
display: flex;
align-items: center;
margin-top: 20px;
`;

const Time = styled.span`
font-size: 1.2rem;
color: #206040;
`;

export default function PodopiecznyPage({podopieczny}) {
    const {addAnimal} = useContext(ReportContext);
    return(
        <>
        <Header />
        <Center>
            <ColWrapper>
            <WhiteBox>
            <AnimalImages zdjecia={podopieczny.zdjecia} />
            </WhiteBox>
        <div>
            <Naglowek>{podopieczny.nazwa}</Naglowek>
            <p>{podopieczny.opis}</p>
            <Add>
                <div>
                    <Time>W schronisku od: {podopieczny.miesiace} miesięcy</Time>
                </div>
                </Add>
                <AddClick>
                <Button primary onClick={() => addAnimal(podopieczny._id)}>Adoptuj</Button>
                </AddClick>
           
        </div>
            </ColWrapper>

        </Center>
        </>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const {id} = context.query;
    const podopieczny = await Podopieczny.findById(id);
    return{
        props:{
            podopieczny: JSON.parse(JSON.stringify(podopieczny)),
        }
    }
}