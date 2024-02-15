import { useState } from "react";
import SignIn from "../components/forms/SignIn";
import { motion } from "framer-motion";
import {
  HomeSection,
  BlobImageBackground,
  WelcomeImage,
  HomePageBackground
} from "../styles/home.styles"; // Import from where you defined them
import {
  ServiceCard,
  ServiceSubCard,
  ServiceTiles,
  ServiceTileHeader,
  ServiceImage
} from "../styles/services.styles";
import ServiceImage1 from "../assets/images/serviceImage1.jpg";
import ServiceImage2 from "../assets/images/serviceImage2.jpg";
import ServiceImage3 from "../assets/images/serviceImage3.jpg";

import welcomeImage from "../assets/images/man-carrying-a-package.png";
import floatAnimation from "../common/animations/floatAnimation";
import SignUp from "../components/forms/SignUp";
import fadeInOut from "../common/animations/fadeInOutAnimation";
import { FlexRow } from "../styles/signForm.styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faMotorcycle, faMoneyBills, faTruck, faMagnifyingGlassLocation, faCity, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
const Home = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = () => setShowSignUp(!showSignUp);

  return (
    <>
      <HomeSection>
        <motion.div
          className="welcome-image"
          initial={floatAnimation.initial}
          animate={floatAnimation.animate}
        >
          <WelcomeImage src={welcomeImage} alt="Man carrying a package" />
        </motion.div>
        <div>
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
        </div>
      </HomeSection>
      <BlobImageBackground />
      <HomePageBackground>
        <FlexRow style={{ gap: "5rem" }}>
          <FlexRow>
            <ServiceCard>
              <h1>Services</h1>
              <ServiceSubCard>
                <FlexRow style={{ justifyContent: "center" }}>
                  <ServiceTiles><FontAwesomeIcon icon={faBolt} /><ServiceTileHeader>Right on time</ServiceTileHeader></ServiceTiles>
                  <ServiceTiles><FontAwesomeIcon icon={faMotorcycle} /><ServiceTileHeader>Courier & Delivery</ServiceTileHeader></ServiceTiles>
                  <ServiceTiles><FontAwesomeIcon icon={faMoneyBills} /><ServiceTileHeader>Cost Saving</ServiceTileHeader></ServiceTiles>
                </FlexRow>
                <FlexRow style={{ justifyContent: "center" }}>
                  <ServiceTiles><FontAwesomeIcon icon={faTruck} /><ServiceTileHeader>Transportation Services</ServiceTileHeader></ServiceTiles>
                  <ServiceTiles><FontAwesomeIcon icon={faMagnifyingGlassLocation} /><ServiceTileHeader>Instant Tracker</ServiceTileHeader></ServiceTiles>
                  <ServiceTiles><FontAwesomeIcon icon={faCity} /><ServiceTileHeader>Relocation & Logistics</ServiceTileHeader></ServiceTiles>
                </FlexRow>
                <FlexRow style={{ justifyContent: "center" }}>
                  <ServiceTiles><FontAwesomeIcon icon={faShieldHalved} /><ServiceTileHeader>Safe & Secure</ServiceTileHeader></ServiceTiles>
                </FlexRow>
              </ServiceSubCard>
            </ServiceCard>
          </FlexRow>
          <FlexRow style={{ flexDirection: "column" }}>
            <FlexRow>
              <ServiceImage src={ServiceImage1} alt="service image"></ServiceImage>
              <ServiceImage src={ServiceImage2} alt="service image"></ServiceImage>
              <ServiceImage src={ServiceImage3} alt="service image"></ServiceImage>
            </FlexRow>
            <FlexRow>
              <div style={{padding:"5rem", textAlign:"justify"}}>
                <h3>Our comprehensive logistics and freight forwarding management system is built using the MERN stack,
                  which consists of MongoDB, Express.js, React.js, and Node.js.
                  Each component plays a crucial role in the development and functionality of the system.</h3>
              </div>
            </FlexRow>
          </FlexRow>
        </FlexRow>
      </HomePageBackground>
    </>
  );
};

export default Home;
