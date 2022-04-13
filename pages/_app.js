import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }) {
  return (
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
  );
}

export default MyApp;
