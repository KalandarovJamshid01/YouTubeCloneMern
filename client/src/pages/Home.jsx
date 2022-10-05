import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = (type) => {
  const [videos, setVideos] = useState([]);
  console.log(type);
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(
        `/videos/${type.type}`
      );
      console.log(res.data + "--------------------------------");
      setVideos(res.data);
    };
    fetchVideos();
  }, [type.type]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
