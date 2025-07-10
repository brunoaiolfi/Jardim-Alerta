import styled from "styled-components/native";

export const Background = styled.View`
    flex: 1;
    background: rgba(0,0,0,0.3);
`

export const Container = styled.View`
    flex: 1;

    margin-top: 48px;
    
    background: white;

    border-radius: 16px 16px 0 0;
    padding: 16px;
`;

export const Header = styled.View`
    width: 100%;
    height: 48px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const RowWrapper = styled.View`
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const ColumnWrapper = styled.View`
    flex: 1;
    width: 100%;

    display: flex;
    flex-direction: column;

    justify-content: flex-start;
    align-items: flex-start;
`;

export const PlantButton = styled.TouchableOpacity`
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
