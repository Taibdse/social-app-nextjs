import { Container } from "react-bootstrap";
import NextHead from 'next/head'
import AppNavbar from "./components/Navbar";

export default function AppLayout(props: any) {
  const { children } = props;
  return (
    <div>
      <NextHead>
        <title>Create Social Events App</title>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/assets/img/icons/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </NextHead>
      <AppNavbar />
      <Container style={{ minHeight: 'calc(100vh - 200px)' }}>
        {children}
      </Container>
    </div>
  )
}
