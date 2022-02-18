import { useRouter } from "next/router";
import { Button } from "@mui/material";
import React from "react";
import globalUseStyles from "../styleHook";
import { Header, Div, Img, LogoButton, Wrapper3 } from "../Widget";

export default function MainHeader({
  handleConnection,
  connected,
  signerAddress,
  ...props
}) {
  const router = useRouter();
  const globalClasses = globalUseStyles();

  return (
    <Header>
      <Div>
        <LogoButton
          onClick={() => router.push("/")}
          target="_blank"
          rel="noreferrer"
        >
          <Img
            src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://ftmshrooms.io/wp-content/uploads/2021/10/cropped-fantomshrooms_logo-e1634642135265.png"
            alt=""
            className="logo"
            data-nsfw-filter-status=""
          />
        </LogoButton>
      </Div>
      <Wrapper3>
        <Button
          className={globalClasses.connectButton}
          onClick={() => router.push("/shrooms")}
          style={{fontSize: "15px"}}
        >
          MY SHROOMIES
        </Button>
        <Button
          variant="contained"
          onClick={handleConnection}
          className={globalClasses.connectButton}
          disabled={connected}
          style={{fontSize: "15px"}}
        >
          {connected ? (
            <p style={{ letterSpacing: 2 }}>
              <span style={{ textTransform: "none" }}>0x</span>
              {signerAddress &&
                signerAddress.slice(2, 6) + "..." + signerAddress.slice(38, 42)}
            </p>
          ) : (
            <p>Connect</p>
          )}
        </Button>
      </Wrapper3>
    </Header>
  );
}
