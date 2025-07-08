import styled from "styled-components/native";

interface IInputProps {
  hasError?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  padding: 24px 20px 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border || '#F0F0F0'};
`;

export const Content = styled.ScrollView`
  flex: 1;
`;

export const Footer = styled.View`
  padding: 16px 20px 24px;
  background-color: ${({ theme }) => theme.colors.background};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border || '#F0F0F0'};
`;

export const Formulario = styled.View`
  gap: 24px;
`;

export const InputGroup = styled.View`
  gap: 8px;
`;

export const Label = styled.View`
  margin-bottom: 8px;
`;

export const Input = styled.TextInput<IInputProps>`
  border: 1.5px solid ${({ hasError, theme }) =>
    hasError ? theme.colors.danger : theme.colors.inputBorder || '#E8E8E8'};
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.inputBackground || '#FAFAFA'};
  min-height: 52px;

`;

export const TextArea = styled(Input)`
  height: 100px;
  padding-top: 16px;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
`;

export const ImagePickerButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 2px dashed ${({ theme }) => theme.colors.primary || '#4CAF50'};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primaryLight || '#F1F8E9'};
  margin-top: 8px;
`;

export const ImagePickerText = styled.Text`
  color: ${({ theme }) => theme.colors.primary || '#4CAF50'};
  font-size: 16px;
  font-weight: 600;
  margin-left: 8px;
`;

export const ImagePreview = styled.View`
  margin-top: 16px;
  border-radius: 12px;
  overflow: hidden;

`;

export const ImagePreviewImage = styled.Image`
  width: 100%;
  height: 200px;
`;

export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 14px;
  margin-top: 4px;
  font-weight: 500;
`;

export const SectionTitle = styled.View`
  margin-bottom: 12px;
  margin-top: 8px;
`;

export const EnvironmentGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
`;

export const FloatingActionButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${({ theme }) => theme.colors.primary || '#4CAF50'};
  align-items: center;
  justify-content: center;

`;

export const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.card || '#FFFFFF'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
`;

export const ProgressBar = styled.View`
  height: 4px;
  background-color: ${({ theme }) => theme.colors.progressBackground || '#E0E0E0'};
  border-radius: 2px;
  margin-bottom: 12px;
`;

export const ProgressFill = styled.View<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: ${({ theme }) => theme.colors.primary || '#4CAF50'};
  border-radius: 2px;
`;

export const StepIndicator = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 32px;
  padding: 0 20px;
`;

export const StepDot = styled.View<{ active: boolean; completed: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${({ active, completed, theme }) =>
    completed ? theme.colors.success || '#4CAF50' :
    active ? theme.colors.primary || '#4CAF50' :
    theme.colors.inactive || '#E0E0E0'};
`;

export const AnimatedContainer = styled.View`
  transform: translateY(0);
`;



export const FloatingCard = styled.View`
  background-color: ${({ theme }) => theme.colors.card || '#FFFFFF'};
  border-radius: 20px;
  margin: 16px;
  padding: 12px;
`;

export const IconContainer = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.primaryLight || '#F1F8E9'};
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

export const TitleSection = styled.View`
  align-items: center;
  margin-bottom: 16px;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary || '#666666'};
  font-size: 16px;
  text-align: center;
  margin-top: 8px;
  line-height: 24px;
`;