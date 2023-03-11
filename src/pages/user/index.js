import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState(false);

    const getInitialData = () => {
        let user = localStorage.getItem("user_imitation_token")
        if (user) {
            setUser(JSON.parse(user).login)
        } else {
            navigate("/")
        }        
    }

    useEffect(() => {
        getInitialData()
    }, [])

  return (
    <>
        {user && <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh"}}>
            {user}
        </div>}
    </>
  );
}

export default User;
