import { useState } from "react";
import styled from "styled-components";


const Image = styled.img`
max-width: 100%;
max-height: 100%;
`;

const ImageButtons = styled.div`
display: flex;
gap: 10px;
flex-grow: 0;
margin-top: 10px;
`;

const ImageButton = styled.div`
border: 1px solid #aaa;
${props => props.active ? `border-color: #d5ff80;` :`border-color:transparent;`}

height: 40px;
cursor: pointer;
border-radius: 5px;
`;


export default function AnimalImages({zdjecia}) {
    const [activeImage, setActiveImage] = useState(zdjecia?.[0]);
    return(
        <>
        <Image src={activeImage} />
        <ImageButtons>
            {zdjecia.map(zdjecie => (
                <ImageButton key={zdjecie} active={zdjecie===activeImage} onClick={() => setActiveImage(zdjecie)}>
                    <Image src={zdjecie} />
                </ImageButton>
            ))}
        </ImageButtons>
        </>
    );
}