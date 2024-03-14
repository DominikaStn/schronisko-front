import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { ReportContext } from "@/components/ReportContext";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
display: grid;
grid-template-columns: 1fr;

@media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr .7fr;
}
gap: 40px;
margin-top: 40px;
`;

const Box = styled.div`
background-color: #fff;
border-radius: 10px;
padding: 30px;

`;

const AnimalInfoCell = styled.td`
padding: 10px 0;
`;

const AnimalImageBox = styled.div`
max-width: 150px;
max-height: 150px;
padding: 2px;
box-shadow: 0 0 3px #d5ff80;
display: flex;
align-items: center;
justify-content: center;
border-radius: 10px;
img{
    max-width: 150px;
    max-height: 150px;
}
@media screen and (min-width: 768px) {
    padding: 10px;
}
`;



export default function ZgloszeniaPage() {
    const {reportAnimals, clearChoice} = useContext(ReportContext);
    const [podopieczni, setPodopieczni] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [number, setNumber] = useState('');

    const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const success = queryParams.get('success');
        if (success === '1') {
            setIsSubmissionSuccessful(true);
        }
    }, []);

    useEffect(() => {
        if (reportAnimals.length > 0) {
            axios.post('/api/zgloszenia', {ids:reportAnimals}).then(response => {
                setPodopieczni(response.data);
            })
        } else {
            setPodopieczni([]);
        }
    }, [reportAnimals]);

    useEffect(() => {
        if (isSubmissionSuccessful) {
            clearChoice();
        }
    }, [isSubmissionSuccessful, clearChoice]);

    async function dokonczZgloszenie() {
        try {
            const response = await axios.post('/api/sprawdzenie', {
                name, email, streetAddress, postalCode, city, number, reportAnimals,
            });
            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error('Błąd podczas przesyłania formularza:', error);
        }
    }


// Obliczenie łącznej liczby spacerów
    const totalWalks = podopieczni.reduce((total, podopieczny) => {
        const count = reportAnimals.filter(id => id === podopieczny._id).length;
        return total + count;
        }, 0);

    if (isSubmissionSuccessful) {
            return (
                <>
                <Header />
                <Center>
                    <ColumnsWrapper>
                    <Box>
                        <h1>Dziękujemy za Twoje zgłoszenie</h1>
                        <p>Skontaktujemy się z Tobą poprzez e-mail podany w formularzu</p>
                    </Box>
                    </ColumnsWrapper>

                </Center>
                </>
            );
        }

    return(
        <>
        <Header/>
        <Center>
        <ColumnsWrapper>
        <Box>
        <h2>Wybrane</h2>

                {!reportAnimals?.length && (
                    <div>Żaden zwierzak nie został wybrany</div>
                )}
                {podopieczni?.length > 0 && (
                <Table>
                    <thead>
                        <tr>
                            <th>Podopieczny schroniska</th>
                            
                            <th>Ilość miesiecy w schronisku</th>
                        </tr>
                    </thead>
                    <tbody>
                    {podopieczni.map(podopieczny => (
                        <tr>
                            <AnimalInfoCell>
                            <AnimalImageBox>
                                <img src={podopieczny.zdjecia[0]} alt="" />
                            </AnimalImageBox>
                                {podopieczny.nazwa}
                            </AnimalInfoCell>
                            
                            <td>
                            {reportAnimals.filter(id => id === podopieczny._id).length = podopieczny.miesiace}
                            </td>
                        </tr>
                    ))}
                    <tr>

                    </tr>
                    </tbody>
                </Table>
                )}
            </Box>
            {!!reportAnimals?.length && (
            <Box>
            <h2>Wypełnij formularz</h2>
            <Input type="text" placeholder="Imię i nazwisko" value={name} name="name" onChange={ev => setName(ev.target.value)}/>
            <Input type="text" placeholder="E-mail do kontaktu" value={email} name="email" onChange={ev => setEmail(ev.target.value)}/>
            <Input type="text" placeholder="Ulica i nr domu" value={streetAddress} name="streetAddress" onChange={ev => setStreetAddress(ev.target.value)}/>
            <Input type="text" placeholder="Kod pocztowy" value={postalCode} name="postalCode" onChange={ev => setPostalCode(ev.target.value)}/>
            <Input type="text" placeholder="Miasto" value={city} name="city" onChange={ev => setCity(ev.target.value)}/>
            <Input type="text" placeholder="Numer do kontaktu" value={number} name="number" onChange={ev => setNumber(ev.target.value)}/>

            <Button block primary onClick={dokonczZgloszenie}>Wyślij zgłoszenie</Button>
            </Box>
        )}
        </ColumnsWrapper>
        </Center>
        </>
    );
}