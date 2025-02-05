import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    width: 45%;
    height: 150px;
    
    background: ${({ theme }) => theme.colors.transparent};
    border-radius: 20px;
    
    margin: 10px;

    justify-content: flex-end;
    overflow: hidden;
`;

export const Footer = styled.View`
    width: 100%;

    padding: 8px 0 ;

    background: rgba(0, 0, 0, 0.7);

    justify-content: center;
    align-items: center;

    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`;