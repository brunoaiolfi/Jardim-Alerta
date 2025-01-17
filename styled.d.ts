import 'styled-components/native'

interface ITheme {
  borderRadius: string;

  fontSize: {
    small: string;
    medium:string;
    large: string;
  }

  colors: {
    textHeading: string;
    textSubheading: string;
    textParagraph: string;
    background: string;
    tint: string;
    tabIconDefault: string;
    tabIconSelected: string;
    primary: string;
    secondary: string;
    borderColor: string;
  };
}

declare module 'styled-components/native' {
  export interface DefaultTheme extends ITheme { }

}