import SignIn from "../components/SignIn";
import { motion } from "framer-motion";
import { HomeSection, BlobImageBackground, WelcomeImage } from '../styles/home.styles'; // Import from where you defined them
import welcomeImage from "../assets/images/man-carrying-a-package.png";
import floatAnimation from "../animations/floatAnimation";

const Home = () => {

  return (
    <>
      <HomeSection>
        <motion.div className="welcome-image" initial={floatAnimation.initial} animate={floatAnimation.animate}>
          <WelcomeImage src={welcomeImage} alt="Man carrying a package" />
        </motion.div>
        <div>
          <SignIn />
        </div>
      </HomeSection>
      <BlobImageBackground />
    </>
  );
};

export default Home;
