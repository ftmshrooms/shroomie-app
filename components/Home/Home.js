// Components
import Mint from "./Mint/Mint";
import Info from "./Info/Info";

import Background from "./Background/Background";
import { Wrapper1 } from "../Widget";

const Home = () => {
  return (
    <Wrapper1>
      <Mint />
      <Info />
      <Background />
    </Wrapper1>
  );
};

export default Home;
