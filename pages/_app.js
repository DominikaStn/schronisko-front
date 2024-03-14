import { ReportContextProvider } from "@/components/ReportContext";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
body{
  background-color: #f5f5f0;
  padding:0;
  margin:0;

  font-family: "Playfair Display", serif;
}

`;

export default function App({ Component, pageProps }) {
  return (
    <>
    <GlobalStyles/>
    <ReportContextProvider>
        <Component {...pageProps} />
    </ReportContextProvider>
    </>
  );
}
