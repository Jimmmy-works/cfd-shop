import React from "react";
import { Spin } from "antd";
import { styled } from "styled-components";

const LoadingSpin = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 10000;
  background-color: #fff;
  opacity: 1;
`;
const Loading = () => {
  return (
    <LoadingSpin className="loading">
      <Spin size="large"></Spin>
    </LoadingSpin>
  );
};

export default Loading;
