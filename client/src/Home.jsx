import { useNavigate } from "react-router-dom"








function Home(){


    const navigate = useNavigate()
    const loggedIn = false;

    return(
        <>
            <div>
                {!loggedIn? (<button onClick={() => navigate("/login")}>Go To Login</button>):
                (<button>Log Out</button>)}
                <button>Go To Marketplace</button>
                <button>List Item</button>
            </div>
        </>
    )
}


export default Home