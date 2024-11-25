import PaticsLogo from "../assests/Patics Logo.png"; // Corrected import statement
import PCAS from "../assests/PCAS.jpg";
import HomePageHeader from "./HomePageHeader";

function Header(props) {
  var backgroundStyle = {
    backgroundImage: `url(${PCAS})`, // Using template literals for better readability
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <header style={backgroundStyle} className="shadow-stone-400 shadow-lg">
      <nav className="bg-black/75 py-5 dark:bg-gray-800 px-3 sm:px-10">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center">
            <img src={PaticsLogo} className="mr-3 h-20 sm:h-24" alt="Patics Logo" />
            <span className="self-center text-white whitespace-normal">
              <div className="font-bold sm:text-2xl">
                PATRICIAN COLLEGE OF ARTS AND SCIENCE
              </div>
              <div className="font-semibold sm:text-xl">
                Madras University, Chennai
              </div>
            </span>
          </div>
          <div className="flex items-center">
            <div className="text-white font-bold text-3xl max-[907px]:mt-5 max-[907px]:text-center">
              Campus Hall Booking
            </div>
          </div>
        </div>
        {props.data.flag && <HomePageHeader />}
      </nav>
    </header>
  );
}

export default Header;
