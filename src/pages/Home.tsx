import { useRef, useState } from "react";
import SignIn from "@app_components/forms/user/SignIn";
import { motion } from "framer-motion";
import {
  HomeSection,
  BlobImageBackground,
  WelcomeImage,
  HomePageBackground,
  WhoWeAreCardImage,
  FlightImage,
} from "@app_styles/home.styles"; // Import from where you defined them
import {
  ServiceCard,
  ServiceSubCard,
  ServiceImage,
} from "@app_styles/services.styles";
import ServiceImage1 from "@app_assets/images/serviceImage1.jpg";
import ServiceImage2 from "@app_assets/images/serviceImage2.jpg";
import ServiceImage3 from "@app_assets/images/serviceImage3.jpg";
import welcomeImage from "@app_assets/images/man-carrying-a-package.png";
import whoWeAreCardImage01 from "@app_assets/images/satellite-dish.png";
import flightImage from "@app_assets/images/plane.png";
import whoWeAreCardImage02 from "@app_assets/images/cogwheel.png";
import logo from "@app_assets/images/logo-min.jpg";
import floatAnimation from "@app_common/animations/floatAnimation";
import SignUp from "@app_components/forms/user/SignUp";
import fadeInOutAnimation from "@app_common/animations/fadeInOutAnimation";
import Navbar from "@app_components/shared/Navbar";
import { ContactCard, WhoCard } from "@app_styles/shared/card.styles";
import { WhoWeAreCard } from "@app_styles/shared/card.styles";
import { WeatherCard } from "@app_styles/shared/card.styles";
import { FlightCard } from "@app_styles/shared/card.styles";
import { FlexRow } from "@app_styles/signForm.styles";
import { BrownCard } from "@app_styles/shared/card.styles";
import { FlightContainer } from "@app_styles/shared/card.styles";
import {
  faBolt,
  faMotorcycle,
  faMoneyBills,
  faTruck,
  faMagnifyingGlassLocation,
  faCity,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import {
  ContactUsSection,
  HeadingSection,
  ContactsSection,
  ContactsList,
  Contact,
  Element,
} from "@app_styles/contactUs.styles";
import {
  GetInTouchSection,
  GetForm,
  FieldGroup,
  SubmitBtn,
  Footer,
  Text,
  Logo,
  Container,
  List,
  Item,
} from "@app_styles/getInTouchForm.styles";
import { TextField } from "@mui/material";
import ServiceTile from "@app_components/shared/ServiceTile";

const Home = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = () => setShowSignUp(!showSignUp);

  const FormComponent = showSignUp ? SignUp : SignIn;

  const homeRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutUsRef = useRef(null);
  const contactUsRef = useRef(null);

  return (
    <>
      <Navbar
        isVisible={true}
        homeRef={homeRef}
        servicesRef={servicesRef}
        aboutUsRef={aboutUsRef}
        contactUsRef={contactUsRef}
      />
      <HomeSection ref={homeRef}>
        <motion.div className="welcome-image" {...floatAnimation}>
          <WelcomeImage src={welcomeImage} alt="Man carrying a package" />
        </motion.div>
        <motion.div key={showSignUp ? "signup" : "signin"} {...fadeInOutAnimation}>
          <FormComponent onSignUpClick={toggleSignUp} />
        </motion.div>
      </HomeSection>

      <HomePageBackground ref={servicesRef}>
        <FlexRow style={{ gap: "5rem", marginTop: "2rem" }}>
          <FlexRow>
            <ServiceCard>
              <h1>Services</h1>
              <ServiceSubCard>
                <FlexRow style={{ justifyContent: "center" }}>
                  <ServiceTile icon={faBolt} title="Right on time" />
                  <ServiceTile icon={faMotorcycle} title="Courier & Delivery" />
                  <ServiceTile icon={faMoneyBills} title="Cost Saving" />
                  <ServiceTile icon={faMotorcycle} title="Courier & Delivery" />
                </FlexRow>
                <FlexRow style={{ justifyContent: "center" }}>
                  <ServiceTile icon={faTruck} title="Transportation Services" />
                  <ServiceTile
                    icon={faMagnifyingGlassLocation}
                    title="Instant Tracker"
                  />
                  <ServiceTile icon={faCity} title="Relocation & Logistics" />
                </FlexRow>
                <FlexRow style={{ justifyContent: "center" }}>
                  <ServiceTile icon={faShieldHalved} title="Safe & Secure" />
                </FlexRow>
              </ServiceSubCard>
            </ServiceCard>
          </FlexRow>
          <FlexRow style={{ flexDirection: "column", alignItems: "center" }}>
            <FlexRow>
              <ServiceImage
                src={ServiceImage1}
                alt="service image"
              ></ServiceImage>
              <ServiceImage
                src={ServiceImage2}
                alt="service image"
              ></ServiceImage>
              <ServiceImage
                src={ServiceImage3}
                alt="service image"
              ></ServiceImage>
            </FlexRow>
            <FlexRow>
              <div style={{ padding: "5rem", textAlign: "justify" }}>
                <h3>
                  Our comprehensive logistics and freight forwarding management
                  system is built using the MERN stack, which consists of
                  MongoDB, Express.js, React.js, and Node.js. Each component
                  plays a crucial role in the development and functionality of
                  the system.
                </h3>
              </div>
            </FlexRow>
          </FlexRow>
        </FlexRow>
      </HomePageBackground>

      <HomePageBackground ref={aboutUsRef}>
        <div style={{ backgroundColor: "#e1bd05" }}>
          <WhoCard>
            <HeadingSection>Who We Are</HeadingSection>
          </WhoCard>
          <FlexRow style={{ justifyContent: "center" }}>
            <WhoWeAreCard>
              <FlexRow>
                <WeatherCard>
                  <WhoWeAreCardImage
                    src={whoWeAreCardImage01}
                    alt="Sattellite-Dish"
                  />
                  <h4>Calculated Weather</h4>Optimize routes with precision
                  Calculated Weather for efficient logistics
                </WeatherCard>
                <FlightContainer>
                  <FlightCard>
                    <FlightImage src={flightImage} alt="Flight" />
                    <h4>BestFLights</h4>Reach destinations swiftly Discover Best
                    Flights for streamlined transport.
                  </FlightCard>
                  <BrownCard />
                </FlightContainer>
                <WeatherCard>
                  <WhoWeAreCardImage src={whoWeAreCardImage02} alt="CogWheel" />
                  <h4>Customization</h4> Tailored solutions at your fingertips
                  Customization for personalized logistics
                </WeatherCard>
              </FlexRow>
            </WhoWeAreCard>
          </FlexRow>
        </div>
        <BlobImageBackground />
      </HomePageBackground>

      <ContactUsSection ref={contactUsRef}>
        <ContactCard>
          <HeadingSection> Contact Us </HeadingSection>
        </ContactCard>
        <ContactsSection>
          <ContactsList>
            <Contact>Phone</Contact>
            <Contact>Email</Contact>
            <Contact>Address</Contact>
          </ContactsList>
          <ContactsList>
            <Element>(+94)11 273 1967</Element>
            <Element>wingsolution@gmail.com</Element>
            <Element>No 34/2, Wijaya Road, Mount Lavinia</Element>
          </ContactsList>
        </ContactsSection>
        <GetInTouchSection>
          <GetForm>
            <h2
              style={{
                fontWeight: 900,
                textAlign: "left",
                paddingLeft: "2rem",
              }}
            >
              Get in touch
            </h2>
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
          <Container style={{ position: 'relative', width: '100%' }}>
            <Logo src={logo} alt="logo" />
            <Text>Wingate Global Solutions</Text>
            <button style={{ position: 'absolute', right: '0', marginRight: '100px',
                cursor: 'pointer',
                boxShadow: '0 4px 4px 0 rgba(0,0,0,0.1), 0 3px 2px 0 rgba(0,0,0,0.19)',
                backgroundColor: '#fcd703',
                border: 'none',
                color: '#000000',
                padding: '6px 20px',
                textAlign: 'center',
                fontSize: '16px',
                textDecoration: 'none',
                display: 'inline-block',
                borderRadius: '15px' }}
              onClick={() => window.location.href='http://localhost:5173/emp-checkpoint'}>
              Employee Check Point
              </button>
          </Container>
          <List>
            <Item>Home</Item>
            <Item>Services</Item>
            <Item>About Us</Item>
            <Item>Contact Us</Item>
          </List>

        </Footer>
      </ContactUsSection>
    </>
  );
};

export default Home;
