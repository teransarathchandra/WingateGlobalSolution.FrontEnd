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
import whoWeAreCardImage01 from "../assets/images/satellite-dish.png";
import flightImage from "../assets/images/plane.png";
import whoWeAreCardImage02 from "../assets/images/cogwheel.png";
import logo from "../assets/images/logo-min.jpg";
import floatAnimation from "../common/animations/floatAnimation";
import SignUp from "../components/forms/SignUp";
import fadeInOut from "../common/animations/fadeInOutAnimation";
import Navbar from "../components/shared/Navbar";
import { WhoCard } from "../styles/shared/card.styles";
import { WhoWeAreCard } from "../styles/shared/card.styles";
import { WeatherCard } from "../styles/shared/card.styles";
import { FlightCard } from "../styles/shared/card.styles";
import { FlexRow } from "../styles/signForm.styles";
import { BrownCard } from "../styles/shared/card.styles";
import { FlightContainer } from "../styles/shared/card.styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faMotorcycle, faMoneyBills, faTruck, faMagnifyingGlassLocation, faCity, faShieldHalved } from '@fortawesome/free-solid-svg-icons';import { ContactUsSection, HeadingSection, ContactsSection, ContactsList, Contact, Element } from "../styles/contactUs.styles";
import { GetInTouchSection, GetForm, FieldGroup, SubmitBtn, Footer,Text, Logo, Container, List, Item } from "../styles/getInTouchForm.styles"
import { TextField } from "@mui/material";


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
      </HomePageBackground>
      <ContactUsSection>
        <HeadingSection> Contact Us </HeadingSection>
        <ContactsSection>
          <ContactsList>
            <Contact>Phone</Contact>
            <Contact>Email</Contact>
            <Contact>Address</Contact>
          </ContactsList>
          <ContactsList>
            <Element>(+94)11 273 1967</Element>
            <Element>wingsolution@gmail.com</Element>
            <Element>No 359, Galle Road, Mount Lavinia</Element>
          </ContactsList>
        </ContactsSection>
        <GetInTouchSection>
          Get in touch
          <GetForm>
            <FieldGroup>
              <TextField
                label="Name"
                defaultValue=""
                size="small"
                placeholder="Dasuni"
                type="text"
                
                style={{ 
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  margin: "20px",
                  width: "250px",
                  marginRight: "50px",
                
                }}
              />
              <TextField
                label="Surname"
                defaultValue=""
                size="small"
                placeholder="Premasinghe"
                type="text"
                
                style={{
                   backgroundColor: "#fff",
                   borderRadius: "5px",
                   margin: "20px",
                   width: "250px",
                  }}
              />
              <TextField
                label="Mail"
                defaultValue=""
                size="small"
                placeholder="someone@gmail.com"
                type="text"
                fullWidth
                style={{
                   backgroundColor: "#fff",
                   borderRadius: "5px",
                   margin: "20px",
                  }}
              />
              <TextField
                label="Address"
                defaultValue=""
                size="small"
                placeholder="No 34, Mount Lavinia, Sri Lanka"
                type="text"
                fullWidth
                style={{ 
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  margin: "20px",
                }}
              />
              <TextField
                label="Description"
                defaultValue=""
                // size="small"
                placeholder=""
                type="text-area"
                fullWidth
                style={{ 
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  margin: "20px",
                  
                }}
              />
              <SubmitBtn>Submit</SubmitBtn>
            </FieldGroup>
          </GetForm>
        </GetInTouchSection>
                <Footer>
                  <Container>
                    <Logo src={logo} alt="logo"/>
                    <Text>Wingate Global Solutions</Text>
                  </Container>
                  <List>
                    <Item>Categories</Item>
                    <Item>Shopping</Item>
                    <Item>Customer Care</Item>
                    <Item>Pages</Item>
                  </List>
                </Footer>
      </ContactUsSection>
    </>
  );
};

export default Home;
