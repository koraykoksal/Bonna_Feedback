// import pattern1 from "../assets/img/pattern1.png"
// import pattern2 from "../assets/img/pattern2.png"
// import pattern3 from "../assets/img/raffleBgColorPattern.png"

export const lightTheme = {
  colors: {
    navbarBgColor: "#FFFFFF",
    mainColor: "#FFFFFF",
    logoColor: "#000000",
    linkColor: "#000000",
    detailBgColor: "#e1f1dd",
    detailColor: "rgb(5,5,5)",
    linkHoverColor: "rgb(5,5,5)",
    headerFormColor: "rgba(15, 63, 42, 0.36)",
  },
  screens: {
    lg: "992px",
  }
};

export const darktheme = {
  colors: {
    navbarBgColor: "rgb(15,15,15)",
    mainColor: "rgb(15,15,15)",
    logoColor: "#FFFFFF",
    linkColor: "#FFFFFF",
    detailBgColor: "rgb(15,15,15)",
    detailColor: "white",
    linkHoverColor: "bisque",
    headerFormColor: "rgba(255, 255, 255, 0.46)",
  },
  screens: {
    lg: "992px",
  },
};


export const homeBgPattern={

  width: "100%",
  height: "900px",
  // backgroundImage: `url(${pattern1})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",


}

export const detailBgPattern={

  width: "100%",
  height: "900px",
  // backgroundImage: `url(${pattern2})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",


}

export const raffleBgPattern={

  width: "100%",
  height: "100%",
  paddingBottom:"400px",
  // backgroundColor:'#2c96df',
  backgroundColor:'#4ea3de',
  // backgroundImage: `url(${pattern3})`,
  backgroundPosition: "100% 0",
  backgroundSize: "700px",
  backgroundRepeat: "no-repeat",


}