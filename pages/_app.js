import { MantineProvider } from "@mantine/core";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <MantineProvider
        theme={{
          colors: {
            "reddit-orange": [
              "#ff4300",
              "#ff4300",
              "#ff4300",
              "#ff4300",
              "#ff4300",
              "#ff4300",
              "#ff4300",
              "#ff4300",
            ],
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

export default MyApp;
