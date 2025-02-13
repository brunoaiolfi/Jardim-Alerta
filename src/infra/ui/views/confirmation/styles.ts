import styled from "styled-components/native"

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Ilustration = styled.Image`
    width: 292px;
    height: 284px;
`;

export const TextWrapper = styled.View`
    flex-direction: column;
    gap: 16px;
`;