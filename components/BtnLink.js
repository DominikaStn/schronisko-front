import Link from "next/link";
import styled from "styled-components";
import { BtnStyle } from "./Button";


const StyledLink = styled(Link)`
${BtnStyle};
`;

export default function BtnLink(props) {
    return (
        <StyledLink {...props} />
    );
}