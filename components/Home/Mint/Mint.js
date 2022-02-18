// React
import { useState, useEffect } from "react";

// Material UI
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
// Ethers
import { ethers } from "ethers";

// Web3
import Web3 from "web3";

// Web3Modal
import Web3Modal from "web3modal";

// Contract
import SmartContract from "../../../ABI/Shrooms.json";

const SmartContractAddress = "0xd19a7F4e93794A0b35AfAA343E8A8608aBbA0278";

// Components
import MintProgress from "./MintProgress/MintProgress";
import { Container, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Wrapper,
  Wrapper2,
  MainContent,
  PreviewImage,
  InfoContent,
  Div,
  Img,
  MintForm,
  PriceBox,
  PreviewImageContent,
  Discription,
} from "../../Widget";
import globalUseStyles from "../../styleHook";
import Skeleton from "@mui/material/Skeleton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

// Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainHeader from "../../Header";
import './Mint.module.css';

const MintAlert = withReactContent(Swal);
const ErrorLog = [
  "Amount Exceed",
  "Only whitelisted address can mint first 250 NFTs",
  "BUYABLE LIMIT EXCEED",
  "Public sale amount exceed",
  "Only a holder can mint this NFT",
  "MAX MINT COUNT LIMIT EXCEED",
  "FTM.Shrooms: incorrect price",
];
const MAX_ENTRIES = 5000;
let MAX_PURCHASE_COUNT = 10;
let MAX_MINT_COUNT = 10;

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#000000ee",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: 16,
    border: "1px solid #000",
    padding: 15,
  },
}));

export let web3 = undefined;
export let provider = undefined;
export let signer = undefined;
let web3Modal = undefined;
let connection = undefined;
let contract = undefined;

const Mint = () => {
  const globalClasses = globalUseStyles();
  const [amount, setAmount] = useState(1);
  const [sold, setSold] = useState();
  const [price, setPrice] = useState(1);
  const [connected, setConnected] = useState(false);
  const [signerAddress, setSignerAddress] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [estimatedPrice, setEstimatedPrice] = useState(1);
  const [priceofNShrmy, setPriceOfNShrmy] = useState(1);

  const [loading, setLoading] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [estimateLoading, setEstimateLoading] = useState(false);
  const [increaseLoading, setIncreaseLoading] = useState(false);
  const [decreaseLoading, setDecreaseLoading] = useState(false);

  var preMintedCnt = 0;

  const priceArray = [35, 50, 75, 100, 0];
  const maxBuyable = [3, 5, 1];

  const decimalFix = (value, decimal = 0) => {
    return Number(value).toFixed(decimal);
  };

  const decreaseQuantity = async () => {
    if (signer === undefined) return;
    if (amount > 1 && amount <= MAX_PURCHASE_COUNT) {
      setDecreaseLoading(true);
      setEstimateLoading(true);
      setAmount(amount - 1);
      setPriceOfNShrmy((amount - 1) * price);
      setEstimate(amount - 1);
      setEstimateLoading(false);
    }
    setDecreaseLoading(false);
  };

  const increaseQuantity = async () => {
    if (signer === undefined) return;

    if (amount >= 1 && amount < MAX_PURCHASE_COUNT) {
      setIncreaseLoading(true);
      setEstimateLoading(true);
      setPriceOfNShrmy((amount + 1) * price);
      setAmount(amount + 1);
      setEstimate(amount + 1);
      setEstimateLoading(false);
    } else {
      toast.warning("You can't buy more NFT at this stage!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
    setIncreaseLoading(false);
  };

  const setEstimate = async (newAmount) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const chainId = await web3.eth.getChainId();
      if (chainId === 250) {
        const amountForNextPrice = 500 - (sold % 500);
        // const currentPriceId = await getCurrentStage();
        // const currentPrice = await getCurrentPrice();
        // let estimatePrice = 0;
        // if (newAmount > amountForNextPrice) {
        //   estimatePrice =
        //     ethers.utils.formatEther(currentPrice) * amountForNextPrice +
        //     priceArray[currentPriceId + 1] * (sold - amountForNextPrice);
        // } else {
        //   estimatePrice = ethers.utils.formatEther(currentPrice) * newAmount;
        // }
        // if (isDiscountUser(accounts[0]) > 0)
        //   estimatePrice = (estimatePrice * 90) / 100;
        // console.log("estimate:", estimatePrice);
        setEstimatedPrice(newAmount * price);
      } else {
        toast.error("The wrong network, please switch to the Fantom network.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getWhitelistState = async (address) => {
    try {
      const chainId = await web3.eth.getChainId();
      if (chainId === 250) {
        // const contract = new ethers.Contract(
        //   SmartContractAddress,
        //   SmartContract,
        //   provider
        // );
        const whiteListState = await contract.getWhitelistState(address);
        return whiteListState;
      } else {
        toast.error("The wrong network, please switch to the Fantom network.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const getCurrentStage = async () => {
  //   try {
  //     const chainId = await web3.eth.getChainId();
  //     if (chainId === 250) {
  //       // const contract = new ethers.Contract(
  //       //   SmartContractAddress,
  //       //   SmartContract,
  //       //   provider
  //       // );
  //       const currentStage = await contract.getCurrentStage();
  //       return currentStage;
  //     } else {
  //       toast.error("The wrong network, please switch to the Fantom network.", {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         theme: "colored",
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getSold = async () => {
    // const contract = new ethers.Contract(
    //   SmartContractAddress,
    //   SmartContract,
    //   provider
    // );

    const sold = await contract.totalSupply();
    setSold(sold.toString());
    return sold.toString();
  };

  const handleConnection = async () => {
    try {
      const chainId = await web3.eth.getChainId();
      if (chainId === 250) {
        ethereum
          .request({ method: "eth_requestAccounts" })
          .then()
          .catch((err) => {
            if (err.code === -32002) {
              toast.warning("Please connect to MetaMask!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
              });
            } else if (err.code === 4001) {
              toast.info(
                "You rejected the connect, please connect the MetaMask",
                {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "colored",
                }
              );
            } else {
              console.log(err);
            }
          });

        if (connected) {
          web3Modal.clearCachedProvider();
          // setConnected(false);
        } else {
          web3Modal = new Web3Modal();
          connection = await web3Modal.connect();
          provider = new ethers.providers.Web3Provider(connection);
          contract = new ethers.Contract(
            SmartContractAddress,
            SmartContract,
            provider
          );
          signer = provider.getSigner();
          console.log("signerMT:", signer);

          web3 = new Web3(Web3.givenProvider);

          /* show alert when success the connection */
          toast.success("You are connected!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          setSignerAddress(signer.provider.provider.selectedAddress);
          setConnected(true);
          // checkConnect();
          // await getCurrentStage();
        }
      } else {
        toast.error("The wrong network, please switch to the Fantom network.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isDiscountUser = async (account) => {
    if (signer === undefined) return;

    try {
      const chainId = await web3.eth.getChainId();
      if (chainId === 250) {
        // const contract = new ethers.Contract(
        //   SmartContractAddress,
        //   SmartContract,
        //   signer
        // );

        const balance = await contract.isDiscountAddress(account);
        return balance;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const preMintedCount = async (account) => {
    if (signer === undefined) return;

    try {
      const chainId = await web3.eth.getChainId();
      if (chainId === 250) {
        // const contract = new ethers.Contract(
        //   SmartContractAddress,
        //   SmartContract,
        //   signer
        // );

        const mintedCnt = await contract.preMintedCnt(account);
        return mintedCnt;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const totalMintedCount = async () => {
    if (signer === undefined) return;

    try {
      const chainId = await web3.eth.getChainId();
      if (chainId === 250) {
        // const contract = new ethers.Contract(
        //   SmartContractAddress,
        //   SmartContract,
        //   signer
        // );

        const totalCnt = await contract.totalMinted();
        return totalCnt;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getBalance = async (account) => {
    if (signer === undefined) return;

    try {
      const chainId = await web3.eth.getChainId();
      if (chainId === 250) {
        // const contract = new ethers.Contract(
        //   SmartContractAddress,
        //   SmartContract,
        //   signer
        // );

        const balance = await contract.balanceOf(account);
        return balance;
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const getFreeMinted = async (account) => {
  //   if (signer === undefined) return;

  //   try {
  //     const chainId = await web3.eth.getChainId();
  //     if (chainId === 250) {
  //       // const contract = new ethers.Contract(
  //       //   SmartContractAddress,
  //       //   SmartContract,
  //       //   signer
  //       // );

  //       const freeMinted = await contract.freeminted(account);
  //       return freeMinted;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getCurrentPrice = async () => {
  //   if (signer === undefined) return;

  //   try {
  //     const chainId = await web3.eth.getChainId();
  //     if (chainId === 250) {
  //       // const contract = new ethers.Contract(
  //       //   SmartContractAddress,
  //       //   SmartContract,
  //       //   signer
  //       // );

  //       const mintCost = await contract.getCurrentPrice();

  //       setPrice(ethers.utils.formatEther(mintCost?.toString()));
  //       setEstimatedPrice(ethers.utils.formatEther(mintCost?.toString()));
  //       return mintCost?.toString();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getPaused = async () => {
  //   if (signer === undefined) return;

  //   try {
  //     const chainId = await web3.eth.getChainId();
  //     if (chainId === 250) {
  //       // const contract = new ethers.Contract(
  //       //   SmartContractAddress,
  //       //   SmartContract,
  //       //   signer
  //       // );

  //       const paused = await contract.paused();

  //       return paused;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const mint = async () => {
    setLoading(true);
    if (signer === undefined) return;
    // const paused = await getPaused();
    // if (paused == true) {
    //   toastError("Sale not started!");
    //   return;
    // }
    // const curStage = await getCurrentStage();
    await getSold();
    // MAX_PURCHASE_COUNT = curStage === 0 ? 10 : curStage === 1 ? 100 : 1;
    const accounts = await web3.eth.getAccounts();
    const totalMinted = await totalMintedCount();
    const balance = await getBalance(accounts[0]);
    let flag = 0;

    if (amount + Number(totalMinted?.toString()) > MAX_ENTRIES) {
      flag = 1;
      toastError(ErrorLog[0]);
    }
    // switch (curStage) {
    //   case 0:
    //     const whiteList = await getWhitelistState(accounts[0]);
    //     const preMinted = await preMintedCount(accounts[0]);
    //     if (!whiteList) {
    //       flag = 1;
    //       toastError(ErrorLog[1]);
    //     } else if (
    //       Number(preMinted?.toString()) + amount >
    //       MAX_PURCHASE_COUNT
    //     ) {
    //       flag = 1;
    //       toastError(ErrorLog[2]);
    //     }
    //     break;
    //   case 1:
    //     if (Number(sold) + amount > 2000) {
    //       flag = 1;
    //       toastError(ErrorLog[3]);
    //     }
    //     break;
    //   case 2:
    //     const freeMinted = await getFreeMinted(accounts[0]);
    //     if (Number(balance?.toString()) <= 0) {
    //       flag = 1;
    //       toastError(ErrorLog[4]);
    //     } else if (Number(freeMinted?.toString()) === 1) {
    //       flag = 1;
    //       toastError(ErrorLog[5]);
    //     }
    //     break;
    // }
    if (Number(balance?.toString()) < 0) {
      flag = 1;
      toastError(ErrorLog[4]);
    }
    if (price * amount < estimatedPrice) {
      console.log("price amout estimatedprice", price, amount, estimatedPrice);
      flag = 1;
      toastError(ErrorLog[6]);
    }
    if (preMintedCnt == MAX_MINT_COUNT) {
      flag = 1;
      toastError(ErrorLog[5]);
    }

    if (flag === 0) {
      setLoading(true);
      try {
        const chainId = await web3.eth.getChainId();
        if (chainId === 250) {
          try {
            contract = new ethers.Contract(
              SmartContractAddress,
              SmartContract,
              signer
            );
            console.log(amount, (estimatedPrice * 1e18).toString());
            let tx = await contract.mint(amount, {
              value: (estimatedPrice * 1e18).toString(),
            });
            await tx.wait();

            getSold();

            preMintedCnt++;

            setLoading(false);
            getSold();
            MintAlert.fire({
              title: (
                <Typography component="h2" className={globalClasses.alertTitle}>
                  Congratulation!
                </Typography>
              ),
              html: (
                <Typography component="p" className={globalClasses.alertText}>
                  You have done!
                </Typography>
              ),
              icon: "success",
            });
          } catch (err) {
            setLoading(false);
            console.log("err", err);

            MintAlert.fire({
              title: (
                <Typography component="h2" className={globalClasses.alertTitle}>
                  Oops!
                </Typography>
              ),
              html: (
                <Typography component="p" className={globalClasses.alertText}>
                  {err.data.message}
                </Typography>
              ),
              icon: "warning",
            });

            const network = await provider.getNetwork();

            if (network.chainId !== 250) {
              MintAlert.fire({
                title: (
                  <Typography
                    component="h2"
                    className={globalClasses.alertTitle}
                  >
                    Oops!
                  </Typography>
                ),
                html: <p>Please switch to FTM network</p>,
                icon: "error",
              });
            } else {
              // alert("Failed to transact");
            }
          }
        } else {
          toast.error(
            "The wrong network, please switch to the Fantom network.",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            }
          );
        }
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    }
    setLoading(false);
  };

  const fetchProgress = async () => {
    if (signer === undefined) return;

    try {
      const chainId = await web3.eth.getChainId();
      if (chainId === 250) {
        await getSold();
        checkConnect();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkConnect = async () => {
    if (web3Modal === undefined) return;
    const accounts = await web3.eth.getAccounts();
    setBalanceLoading(true);
    web3.eth
      .getBalance(accounts[0])
      .then((e) => setCurrentBalance(e && ethers.utils.formatEther(e)));

    setBalanceLoading(false);

    if (signer._isSigner) {
      setConnected(true);
      setSignerAddress(signer.provider.provider.selectedAddress);
    } else {
      setConnected(false);
    }
  };

  const checkNetwork = async () => {
    try {
      const chainId = await web3.eth.getChainId();
      if (chainId === 250) {
        checkConnect();
        fetchProgress();
        // getCurrentPrice();
      } else {
        toast.error("The wrong network, please switch to the Fantom network.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toastError = (errorLog) => {
    MintAlert.fire({
      title: (
        <Typography component="h2" className={globalClasses.alertTitle}>
          Oops!
        </Typography>
      ),
      html: (
        <Typography component="p" className={globalClasses.alertText}>
          {errorLog}
        </Typography>
      ),
      icon: "warning",
    });
  };

  useEffect(() => {
    setPrice(1);
    web3 = new Web3(window.ethereum);
    checkNetwork();
  }, []);

  useEffect(() => {
    fetchProgress();
    // getCurrentPrice();
  }, [sold, connected]);

  return (
    <Wrapper>
      <MainHeader
        handleConnection={handleConnection}
        connected={connected}
        signerAddress={signerAddress}
      />
      <Wrapper2 className={"wrapper2"}>
        <MainContent>
          {/* <PreviewImage>
            <PreviewImageContent>
              <Img
                src="https://gateway.pinata.cloud/ipfs/QmRCRRspauRxhUvFDm8gUxo7CBJVGJUpLoKtRTNokdE9yU"
                data-nsfw-filter-status=""
                alt=""
                className="gif"
              />
            </PreviewImageContent>
          </PreviewImage> */}

          <InfoContent>
            <MintForm>
              <HtmlTooltip
                title={
                  <>
                    <Typography
                      component="p"
                      className={globalClasses.tooltipText}
                    >
                      🍄 Get no more than 10 Shroomies per mint – 1FTM per
                      Shroomy
                    </Typography>
                    <Typography
                      component="p"
                      className={globalClasses.tooltipText}
                    >
                      🍄 For FTM.Shroom holders 1 Shroomy for free
                    </Typography>
                    <Typography
                      component="p"
                      className={globalClasses.tooltipText}
                    >
                      🍄 5000 Shroomies for community treasury (will be minted
                      by the team)
                    </Typography>
                    {/* <Typography component="p" className={globalClasses.tooltipText}>
                      👍 1501-2000 for 80 FTM
                    </Typography>
                    <Typography component="p" className={globalClasses.tooltipText}>
                      👍 2001-2250 for 0 FTM (for holders)
                    </Typography>
                    <Typography component="p" className={globalClasses.tooltipText}>
                      👍 2251-2500 for 0 FTM (for team)
                    </Typography> */}
                  </>
                }
              >
                <Typography component="h5" className={globalClasses.totalText}>
                  Total Shroomies Minted:&nbsp;
                  {!connected && (
                    <span style={{ fontWeight: 400, color: "#888" }}>
                      N/A&nbsp;
                    </span>
                  )}
                  {sold} / 5000
                </Typography>
              </HtmlTooltip>

              <MintProgress progress={sold} />
              {/* <MintProgress progress={100} /> */}

              <Typography component="p" className={globalClasses.amountLabel}>
                MINT A SHROOMIE 
              </Typography>
              <Typography component="p" className={globalClasses.amountText}>
                (1 Shroomie = 1FTM)
                {/* {!connected &&
                  <span style={{ fontWeight: 400, color: "#888" }}>N/A&nbsp;</span>
                } */}
                {/* {price && decimalFix(price)}
                FTM) */}
              </Typography>

              <ButtonGroup variant="contained" fullWidth className="wrapper">
                <LoadingButton
                  loading={decreaseLoading}
                  className={globalClasses.greentButton}
                  size="small"
                  variant="contained"
                  onClick={decreaseQuantity}
                >
                  <RemoveRoundedIcon />
                </LoadingButton>
                <Button disabled>
                  <Typography
                    component="h5"
                    className={globalClasses.amountCount}
                  >
                    {amount}
                  </Typography>
                </Button>

                <LoadingButton
                  loading={increaseLoading}
                  className={globalClasses.greentButton}
                  size="small"
                  variant="contained"
                  onClick={increaseQuantity}
                >
                  <AddRoundedIcon />
                </LoadingButton>
              </ButtonGroup>
              {connected && (
                <PriceBox>
                  <Div>
                    <Typography
                      component="h5"
                      className={globalClasses.balanceLabel}
                    >
                      You will pay for {amount} Shroomies
                    </Typography>
                    <Typography
                      component="h5"
                      className={globalClasses.balanceText}
                    >
                      {estimateLoading && (
                        <Skeleton
                          width={40}
                          height={20}
                          variant="rectangular"
                          sx={{ bgcolor: "#ffffff30", borderRadius: 0 }}
                        />
                      )}

                      {!estimateLoading &&
                        // decimalFix(estimatedPrice)
                        priceofNShrmy}
                      <span>&nbsp;FTM</span>
                    </Typography>
                  </Div>
                  <Div>
                    <Typography
                      component="h5"
                      className={globalClasses.balanceLabel}
                    >
                      Your balance
                    </Typography>
                    <Typography
                      component="h5"
                      className={globalClasses.balanceText}
                    >
                      {balanceLoading && (
                        <Skeleton
                          width={40}
                          height={20}
                          variant="rectangular"
                          sx={{ bgcolor: "#ffffff30", borderRadius: 1 }}
                        />
                      )}
                      {decimalFix(currentBalance, 2)}
                      <span>&nbsp;FTM</span>
                    </Typography>
                  </Div>
                </PriceBox>
              )}
              <LoadingButton
                loading={loading}
                className={globalClasses.mintButton}
                variant="contained"
                onClick={mint}
              >
                MINT
              </LoadingButton>
            </MintForm>
            <Discription>
              <ul>
                <li>
                  Every FTM.Shrooms holder gets 1 free Shroomies NFT
                  per wallet
                </li>
                <ul>
                  <li>Holder snapshot - 17th Feb 11pm UTC</li>
                </ul>
                <li>Rest will be available for public for 1FTM per mint</li>
                <li>
                  25% of Shroomies secondary sales royalties will be used for
                  charity
                </li>
                <li>
                  Up to 2.000$FTM (if we sell out) will be won by 3 holders of at least
                  1FTM.Shroomie (winners will be drawn randomly - $FTM 1000/700/300)
                  split)
                  {/* <ul>
                    <li>
                      25% of Shroomies secondary sales royalties will be used
                      for charity
                    </li>
                    <li>
                      50% of Shroomies sales will be redistributed to holders of
                      at least 1 <br />
                      FTM.Shroom & 1 FTM.Shroomie via raffles
                    </li>
                    <li>will be utilized in different ways</li>
                  </ul> */}
                </li>
              </ul>
            </Discription>
          </InfoContent>
        </MainContent>
      </Wrapper2>
      <ToastContainer
        style={{ fontSize: 12, padding: "5px !important", lineHeight: "15px" }}
      />
    </Wrapper>
  );
};

export default Mint;
