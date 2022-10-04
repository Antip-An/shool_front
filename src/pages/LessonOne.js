import { getData, postData } from "../utils/network";
import { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";

import useUser from "../hooks/useUser";

const Profile = () => {

  const {userData:user} = useUser()

  return (
    <Container>
        <h1>Урок</h1>
     
    </Container>
  );
}
export default Profile
