// Styled Components
import styled from "styled-components";
import IconButton from '@mui/material/IconButton';
import { Container } from "@mui/material";

const Info = () => {
  return (
    <Container>
      <Wrapper>
        {/* <p className="header">Lorem, ipsum.</p>

        <p className="info">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem
          facere illo aliquid enim. Officiis, eum.
        </p> */}
        {/* <div className="discription">
          <ul>
           <li>5% of total sales will be used for charity</li>
           <li>50% of our royalties will be redistributed to holders</li>
           <li>Every FTM.Shrooms holder gets a free FTM.Shroomies NFT airdrop (2nd gen collection)
              <ul>
                <li>25% of Shroomies sales royalties will be used for charity</li>
                <li>50% of Shroomies sales royalties will be redistributed to holders of at least 1 <br/>
                FTM.Shroom & 1 FTM.Shroomie via raffles</li>
                <li>will be utilized in different ways</li>
              </ul>
           </li>
           
          </ul>
        </div> */}
        {/* <div className ="footerbar"> */}
          <div className="socials">
            <IconButton>
              <a
                href="https://twitter.com/FantomShrooms"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="./twitter.png"
                  data-nsfw-filter-status=""
                  alt=""
                />
              </a>
            </IconButton>

            <IconButton>
              <a href="http://discord.gg/KvvrWgAzD4" target="_blank" rel="noreferrer">
                <img
                  src="./discord.svg"
                  alt=""
                  data-nsfw-filter-status=""
                />
              </a>
            </IconButton>
            
            <IconButton>
              <a href="https://ftmshrooms.io/" target="_blank" rel="noreferrer">
                <img
                  src="./5.png"
                  alt=" "
                  data-nsfw-filter-status=""
                />
              </a>
            </IconButton>

          </div>
      
      </Wrapper>
    </Container>
  );
};

export default Info;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  padding-top: 10px;

  margin: 0 auto;

  z-index: 2;
  position: relative;

  //
  width: 800px;
  @media only screen and (max-width: 850px) {
    width: 100%;
  }
  //
  .header {
    font-size: 1.5rem;
    font-style: italic;
    color: #fff;
  }
  .footerbar{
    display:flex;
  }
  .link{
    margin-left:30px;
    margin-top:13px;
    background: none!important;
    color:white;
  }
  ul {
    display: block;
    font-size: 18px;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }
  ul ul {
    font-size: 15px;
    list-style-type: disc;
    margin-block-start: 0px;
    margin-block-end: 0px;
  }
  li{
    margin-top:5px;
  }
  .info {
    color: #eee;
    font-size: 1rem;
    font-family: "Roboto", sans-serif;
  }
  .dicsription{
      fontFamily: "Roboto Slab",
  }

  .socials {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    a {
      background: #fff;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      padding: 5px;
      display: flex;
      align-items: center;
      img {
        width: 30px;
      }
    }
  }
  padding-bottom: 25px;
`;
