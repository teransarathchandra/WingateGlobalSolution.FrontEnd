import { useState } from "react";
import SignIn from "../components/forms/SignIn";
import { motion } from "framer-motion";
import {
  HomeSection,
  BlobImageBackground,
  WelcomeImage,
} from "../styles/home.styles"; // Import from where you defined them
import welcomeImage from "../assets/images/man-carrying-a-package.png";
import logo from "../assets/images/logo-min.jpg";
import floatAnimation from "../common/animations/floatAnimation";
import SignUp from "../components/forms/SignUp";
import fadeInOut from "../common/animations/fadeInOutAnimation";
import { ContactUsSection, HeadingSection, ContactsSection, ContactsList, Contact, Element } from "../styles/contactUs.styles";
import { GetInTouchSection, GetForm, FieldGroup, SubmitBtn, Footer,Text, Logo, Container, List, Item } from "../styles/getInTouchForm.styles"
import { TextField } from "@mui/material";


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
