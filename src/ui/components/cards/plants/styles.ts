import styled from "styled-components/native";

export const Container = styled.View`
    width: 45%;
    height: 150px;
    
    background: ${({ theme }) => theme.colors.transparent};
    border-radius: 20px;
    
    padding: 20px;
    margin: 10px;
`;