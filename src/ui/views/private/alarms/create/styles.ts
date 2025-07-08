import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;

    height: 100%;
    width: 100%;

    background-color: #ffffff;
`;

export const Header = styled.View`
    width: 100%;
    flex: 3
`;

export const ReturnButton = styled.TouchableOpacity`
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1;

    background-color: #ffffff;
    border-radius: 999px;

    padding: 14px 14px 14px 12px;

    width: 48px;
    height: 48px;
`;

export const Content = styled.View`
    width: 100%;
    flex: 5;

    padding: 22px;
`;

export const Formulario = styled.View`
    
    width: 100%;
    flex: 5;
    display: flex;

    align-items: center;
    justify-content: center;

    overflow: visible ;
`;

export const Info = styled.View`
    margin-top: 24px;
    width: inherit;
`;

export const Wrapper = styled.View`
    flex-direction: row;
    gap: 8px;

    align-items: center;
    justify-content: center;

`;

interface IInputTime {
    hasError: boolean;
}

function getBorderColor(hasError: boolean): string {
    return hasError ? "#FF0000" : "transparent";
}

export const InputTime = styled.TextInput<IInputTime>`
    border-radius: 6px;

    border: 1px solid transparent;
    border: ${({ hasError }) => `1px solid ${getBorderColor(hasError)}`};

    background: ${({ theme }) => theme.colors.transparent};
    width: 32px;
    height: 48px;

    align-items: center;
    justify-content: center;

    padding: 0px 8px;
`;

export const Footer = styled.View`
    padding: 22px;
`;