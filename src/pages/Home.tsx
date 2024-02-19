import { useState } from "react";
import SignIn from "../components/forms/SignIn";
import { motion } from "framer-motion";
import {
  HomeSection,
  BlobImageBackground,
  WelcomeImage,
} from "../styles/home.styles"; // Import from where you defined them
import welcomeImage from "../assets/images/man-carrying-a-package.png";
import floatAnimation from "../common/animations/floatAnimation";
import SignUp from "../components/forms/SignUp";
import fadeInOut from "../common/animations/fadeInOutAnimation";
import Navbar from "../components/shared/Navbar";

const Home = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = () => setShowSignUp(!showSignUp);

  const FormComponent = showSignUp ? SignUp : SignIn;

  return (
    <>
      <Navbar isVisible={true} />
      <HomeSection>
        {/* <motion.div
          className="welcome-image"
          initial={floatAnimation.initial}
          animate={floatAnimation.animate}
        >
          <WelcomeImage src={welcomeImage} alt="Man carrying a package" />
        </motion.div> */}
        <motion.div className="welcome-image" {...floatAnimation}>
          <WelcomeImage src={welcomeImage} alt="Man carrying a package" />
        </motion.div>
        <motion.div key={showSignUp ? "signup" : "signin"} {...fadeInOut}>
          <FormComponent onSignUpClick={toggleSignUp} />
        </motion.div>
        {/* <div>
          {showSignUp ? (
            <motion.div
              key="signup"
              initial={fadeInOut.initial}
              animate={fadeInOut.animate}
              exit={fadeInOut.exit}
              transition={fadeInOut.transition}
            >
              <SignUp onSignUpClick={toggleSignUp} />
            </motion.div>
          ) : (
            <motion.div
              key="signin"
              initial={fadeInOut.exit}
              animate={fadeInOut.animate}
              exit={fadeInOut.initial}
              transition={fadeInOut.transition}
            >
              <SignIn onSignUpClick={toggleSignUp} />
            </motion.div>
          )}
        </div> */}
      </HomeSection>
      <BlobImageBackground />
    </>
  );
};

export default Home;
