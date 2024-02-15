import styled from "styled-components";

const ContactUsSection = styled.div`
    min-height: 100vh;
    background-color: #e1bd05;
    width: 100%;
    
`
const HeadingSection = styled.div`
    min-height : 10vh;
    width: 20%;
    background-color:#FFFFFF;
    padding :20px;
    font-size :50px;
    font-weight: 500;
    border-radius: 0px 70px 70px 0px;
`
const ContactsSection = styled.div`
    background-color: #e1bd05;
    font-size: 20px;
    padding: 20px;
    font-weight: 400; 
    
`
const ContactsList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: -45px;
  flex-direction: row;
`

const Contact = styled.li`
  margin: 0 5rem;
  font-weight: 700;
  width: 5%;
`;

const Element = styled.li`
    margin: 0.75rem;
    font-weight: 500;
    width: 15%;
`

const ContactUsForm = styled.form`
    padding: 20px;
    border-radius: 10px;
    background-color: #FFFFFF;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;   
`

export { 
    ContactUsSection,
    HeadingSection,
    ContactsSection,
    ContactUsForm,
    ContactsList,
    Contact,
    Element

 };