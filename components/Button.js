import styled, { css } from "styled-components";

export const BtnStyle = css`
border: 0;
display: inline-flex;
padding: 5px 15px;
border-radius: 5px;
cursor: pointer;
align-items: center;
text-decoration: none;
font-weight: bold;

svg{
    height: 16px;
    margin-right: 5px;
}

${props => props.block && css`
display:block;
width:100%;
`}

${props => props.white && !props.outline && css`
background-color: #fff;
color: #206040;
`}

${props => props.white && props.outline && css`
background-color: transparent;
color: #206040;
border: 1px solid #206040;
`}

${props => props.primary && !props.outline && css`
background-color: #206040;
color: #fff;
border: 1px solid #206040;
`}

${props => props.primary && props.outline && css`
background-color: transparent;
color: #206040;
border: 1px solid #206040;
`}

${props => props.size === 'l' && css`
font-size: 1.2rem;
padding: 10px 20px;
`}
`;

const StyledBtn = styled.button`
${BtnStyle}
`;

export default function Button({children, ...rest}) {
    return(
        <StyledBtn {...rest}>{children}</StyledBtn>
    );
}