import styled from "styled-components/native";

export const NotificationCard = styled.View`
    width: 100%;
    height: 148px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    flex-direction: row;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

export const AlarmInfos = styled.View`
    flex: 1;
    margin-left: 16px;
`;

export const AlarmInfoFooter = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
`;

export const Header = styled.View`
    margin-bottom: 16px;

    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    gap: 8px;
`;