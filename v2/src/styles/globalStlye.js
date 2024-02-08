import pattern2 from "../assets/img/bg2.png"
import pattern3 from "../assets/img/bg3.png"
import pattern4 from "../assets/img/bg4.png"



export const modalStyles = {

    overflow:'auto',
    backgroundImage: `url(${pattern3})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    overflow: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
}


export const reportPageStyle={
    width: "100%",
    height: "100vh",
    overflow:'auto',
    backgroundImage: `url(${pattern2})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
}

export const homePageStyle={
    width: "100%",
    height: "100vh",
    overflow:'auto',
    backgroundImage: `url(${pattern4})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
}

