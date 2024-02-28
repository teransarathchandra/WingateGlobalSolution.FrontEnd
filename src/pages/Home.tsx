import { useState } from "react";
import SignIn from "../components/forms/SignIn";
import { motion } from "framer-motion";
import {
  HomeSection,
  BlobImageBackground,
  WelcomeImage,
  HomePageBackground,
  WhoWeAreCardImage,
  FlightImage
} from "../styles/home.styles"; // Import from where you defined them
import welcomeImage from "../assets/images/man-carrying-a-package.png";
import whoWeAreCardImage01 from "../assets/images/satellite-dish.png";
import flightImage from "../assets/images/plane.png";
import whoWeAreCardImage02 from "../assets/images/cogwheel.png";



import floatAnimation from "../common/animations/floatAnimation";
import SignUp from "../components/forms/SignUp";
import fadeInOut from "../common/animations/fadeInOutAnimation";
import { WhoCard } from "../styles/shared/card.styles";
import { WhoWeAreCard } from "../styles/shared/card.styles";
import { WeatherCard } from "../styles/shared/card.styles";
import { FlightCard } from "../styles/shared/card.styles";
import { FlexRow } from "../styles/signForm.styles";
import { BrownCard } from "../styles/shared/card.styles";
import { FlightContainer } from "../styles/shared/card.styles";


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

      <HomePageBackground>
        <div style={{ backgroundColor: '#e1bd05' }}>
          <WhoCard>
            <h1>Who We Are</h1>
          </WhoCard>
            
          <WhoWeAreCard>
         
            
            <FlexRow>
              <WeatherCard>
                <WhoWeAreCardImage src={whoWeAreCardImage01} alt="Sattellite-Dish" />
                <h4>Calculated Weather</h4>Optimize routes with precision Calculated Weather for efficient logistics
              </WeatherCard>

            <FlightContainer>
              <FlightCard>
                <FlightImage src={flightImage} alt="Flight" />
                <h4>BestFLights</h4>Reach destinations swiftly Discover Best Flights for streamlined transport.               
              </FlightCard>
              <BrownCard/>
              </FlightContainer>
              
              <WeatherCard>
                <WhoWeAreCardImage src={whoWeAreCardImage02} alt="CogWheel" />
                <h4>Customization</h4> Tailored solutions at your fingertips Customization for personalized logistics
              </WeatherCard>

            </FlexRow>
          </WhoWeAreCard>
        </div>
        <BlobImageBackground />
      </HomePageBackground>
    </>
  );
};

export default Home;
