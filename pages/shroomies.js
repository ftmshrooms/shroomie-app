import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Header from "../components/Header";
import Background from "../components/Home/Background/Background";
import { Wrapper1 } from "../components/Widget";
import SmartContract from "../ABI/Shrooms.json";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import globalUseStyles from "../components/styleHook";
import { LazyLoadImage } from "react-lazy-load-image-component";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import InfoRounded from "@mui/icons-material/InfoRounded";
import Loading from "../components/Loading";
import { useRouter } from "next/router";
import { web3, provider, signer } from "../components/Home/Mint/Mint";

const SmartContractAddress = "0xd19a7F4e93794A0b35AfAA343E8A8608aBbA0278";
let contract = undefined;
let shrooms = [];

export default function Shrooms() {
  const router = useRouter();
  const globalClasses = globalUseStyles();
  const [account, setAccount] = useState("");
  const [connected, setConnected] = useState(false);
  const [balanceOf, setBalanceOf] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [empty, setEmpty] = useState(true);

  const getShrooms = async () => {
    if (signer === undefined) {
      setConnected(false);
      router.push("/");
    } else {
      const address = await web3.eth.getAccounts();
      setAccount(address[0]);
      setConnected(true);
      setIsLoading(true);
      try {
        contract = await new ethers.Contract(
          SmartContractAddress,
          SmartContract,
          provider
        );

        let balanceOf = await contract.balanceOf(address[0]);
        balanceOf = balanceOf.toString();
        setBalanceOf(balanceOf);
        if (balanceOf !== "0") {
          setEmpty(false);
          let indexes = await contract.walletOfOwner(address[0]);
          console.log("indexes", indexes);
          for (var i = 0; i < Number(balanceOf); i++) {
            // let tokenIndex = await contract.tokenOfOwnerByIndex(address[0], i);
            let id = indexes[i].toString();
            let tokenUrl = await contract.tokenURI(id);
            tokenUrl = tokenUrl.toString();
            console.log("tokenURL", tokenUrl);
            let jsonData = getJSONP(tokenUrl);
            shrooms[i] = await jsonData;
          }
        } else {
          setEmpty(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
      setIsLoading(false);

      console.log("empty:", empty);
    }
  };

  const getJSONP = async (url) => {
    let data = await (await fetch(url)).json();
    return data;
  };

  useEffect(() => {
    // setAccountInfo();
    const func = async () => {
      await getShrooms();
    };
    func();
  }, []);

  return (
    <Wrapper1>
      <Header signerAddress={account} connected={connected} />
      <Container style={{ marginTop: 80, zIndex: 3, textAlign: "center" }}>
        <Typography className={globalClasses.listTitle}>
          My Shroomies<span>(&nbsp;Total: {balanceOf}&nbsp;)</span>
        </Typography>
        {empty === true && (
          <div style={{ position: "relative", zIndex: 4 }}>
            <Typography className={globalClasses.emptyText}>
              You don&apos;t have any Shroomies
            </Typography>
            <Button
              onClick={() => router.push("/")}
              className={globalClasses.linkButton}
              variant="outlined"
              style={{
                color: "#fff",
                backgroundColor: "#006b94",
                border: "1px solid #006b94",
              }}
            >
              Buy Shroomies
            </Button>
          </div>
        )}
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={3}>
            {shrooms.length !== 0 &&
              shrooms.map((item, key) => (
                <Grid
                  key={key}
                  item
                  style={{ position: "relative", zIndex: 3 }}
                >
                  <Paper
                    spacing={3}
                    style={{ overflow: "hidden", position: "relative" }}
                  >
                    <LazyLoadImage
                      alt=""
                      height={426}
                      src={item.image} // use normal <img> attributes as props
                      width={240}
                    />
                    <Typography className={globalClasses.cardTitle}>
                      <span>{item.name}</span>
                      <Tooltip title={item.description}>
                        <IconButton>
                          <InfoRounded
                            fontSize="small"
                            style={{ fill: "#ccc" }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Container>
      <Loading loading={isLoading} />
      {/* <Background /> */}
    </Wrapper1>
  );
}
