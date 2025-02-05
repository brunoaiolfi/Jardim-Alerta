import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;

    background-color: #ffffff;
`;

export const Header = styled.View`
    width: 100%;
    height: 30%;
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

export const Content = styled.ScrollView`
    width: 100%;
    height: 70%;

    padding: 22px;
`;

export const Info = styled.View`
    margin-top: 24px;
    width: inherit;
`;

export const WaterContainer = styled.View`
    width: 100%;

    padding: 16px;
    background-color: #D6EDFF;

    border-radius: 20px;

    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

export const WaterIconContainer = styled.View`
    width: 56px;
    height: 56px;

    border-radius: 56px;

    align-items: center;
    justify-content: center;

    background-color:rgb(189, 222, 250);
`;

export const WaterTip = styled.Text`
    color: #5DADEC;
    font-size: 16px;
    width: 70%;
`;