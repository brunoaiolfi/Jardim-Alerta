import styled from "styled-components/native"

export const Container = styled.View`
    flex: 1;

    padding: 20px;

    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    align-items: flex-start;
`;

export const Subheading = styled.View`
    margin-top: 40px;
`;

export const EnvironmentsList = styled.FlatList`
    margin-top: 20px;
`;