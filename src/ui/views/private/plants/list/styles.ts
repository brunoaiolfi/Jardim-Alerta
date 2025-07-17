import styled from "styled-components/native"

export const Container = styled.View`
    flex: 1;

    padding: 20px;

    background-color: ${({ theme }) => theme.colors.background};
    `;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    `;

export const HeaderWrapper = styled.View`
    align-items: flex-start;
    overflow: hidden;
    width: 70%;
    `;

export const Subheading = styled.View`
    margin-top: 40px;
    `;

export const EnvironmentsList = styled.FlatList`
    margin-top: 20px;
    height: 64px;
    `;

export const PlantsList = styled.FlatList`
    margin-top: 20px;
    height: 100%;
    `;

export const LoadingEnvironments = styled.View`
    width: 100%;
    height: 64px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    `;