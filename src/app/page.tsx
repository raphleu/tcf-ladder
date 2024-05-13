import LadderAndNav from "./components/ladderAndNav"
import {NextUIProvider} from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <LadderAndNav />
    </NextUIProvider>
  );
}
