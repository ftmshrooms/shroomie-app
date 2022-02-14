import styled from "styled-components";
//   background-color: #4831d4;
export const Wrapper = styled.div`
  height: auto;
  min-height: 100% !important;
  height: 100%;
  max-height: 100%
  font-family: "Roboto Slab", serif;
  position: relative;
`;

export const Wrapper1 = styled.div`
  background-image: url("./background.png");
  background-size: auto 100%;
  min-height: 100vh;
  font-family: "Roboto Slab", serif;
  position: relative;
`;

export const Wrapper2 = styled.div`
  font-family: "Roboto Slab", serif;
  margin: auto;
  max-height: 100vh;
  width: 33%;
  min-width: 33%;
  padding: 300px 0px 0px 0px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  background-color: #0000008f;
  position: relative;
  z-index: 3;
  img {
    margin-top: 17px;
    @media (max-width: 998px) {
      height: 54px;
    }
  }
`;

export const LogoButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
`;

export const MainContent = styled.div`
  width: 700px;
  background-color: #55555599;
`;

export const PreviewImageContent = styled.div`
  width: 240px;
  display: flex;
  align-item: center;
  justify-content: center;
  position: relative;
  z-index: 3;
  @media (max-width: 998px) {
    width: 120px;
  }
`;
export const PreviewImage = styled.div`
  width: 40%;
  margin-top: 70px;
  position: relative;
  img {
    width: 100%;
    border-radius: 30px 0 30px 0;
    z-index: 2;
    position: relative;
  }
  @media (max-width: 998px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 40px;
    justify-content: center;
    display: flex;
  }
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  align-items: center;
  @media (max-width: 998px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;
export const Discription = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: white;
  @media (max-width: 998px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
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
  li {
    margin-top: 5px;
  }
`;

export const Div = styled.div`
  display: block;
`;

export const Img = styled.img`
  display: block;
`;

export const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  div {
    :first-child {
      text-align: left;
    }
    :last-child {
      text-align: right;
    }
  }
`;

export const MintForm = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-top: 50px;
  position: relative;
  z-index: 3;
  @media (max-width: 998px) {
    margin-top: 30px;
  }
`;
