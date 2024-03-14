import AnimalsGrid from "@/components/AnimalsGrid";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Naglowek from "@/components/Naglowek";
import { mongooseConnect } from "@/lib/mongoose";
import { Podopieczny } from "@/models/Podopieczny";
import styled from "styled-components";


export default function PodopieczniPage({podopieczni}) {
    return(
        <>
        <Header />
        <Center>
        <Naglowek>Wszyscy podopieczni schroniska</Naglowek>
        <AnimalsGrid podopieczni={podopieczni} />
        </Center>
        </>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();
    const podopieczni = await Podopieczny.find({}, null, {sort:{'_id':-1}});
    return {
        props: {
            podopieczni: JSON.parse(JSON.stringify(podopieczni)),
        }
    };
}