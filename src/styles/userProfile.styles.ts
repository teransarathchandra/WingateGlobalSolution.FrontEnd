import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction:row ;
  justify-content: space-evenly; 
  align-items: flex-start;
  height: 70px;
  width: 200px;
  //background-color: #e1bd05;
  /* padding: 10px 20px; // Example padding, adjust as necessary */
`;

const WgsLogo = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 10px;
`;

const SecHeadContainer = styled.div`
  display: flex;
  flex-direction:row ;
  justify-content: flex-start; 
  align-items: flex-start;
  height: 130px;
  background-color: #FEF7D3;

  h1{
    margin-left: 30px;
    margin-top: 20px;
  }


`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction:row ;
  justify-content: flex-start; 
  align-items: flex-start;
  /* align-items: center; */
`;

const UserImgContainer = styled.div`
  display: flex;
  flex-direction:column ;
  justify-content: center; 
  align-items: center;
  width: 400px;
  height: 500px;
`;

const UserImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction:column ;
  justify-content: flex-start; 
  align-items: flex-end;

  h2{
    margin: 30px;
    align-self: flex-start;
  }
`;

const UserInfoSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
  margin: 20px 30px;
  grid-template-areas: 
  "i j"
  "k k"
  "l m"
  "n n"
  "q q"
  "o o"
  "p p"
`;

const UserInfoSection02 = styled.section`
  display: flex;
  flex-direction: column;
  //grid-template-columns: repeat(2, 1fr);
  //gap: 50px;
  margin: 20px 30px;
`;

const VerticalLine = styled.div`
  height: 800px; /* Adjust based on your requirement */
  width: 1px; /* Thickness of the line */
  background-color: #E6E6E6; /* Color of the line */
  margin: 50px 20px; /* Spacing around the line */
`;

const HorizontalLine = styled.div`
  width: 848px; /* Adjust based on your requirement */
  height: 2px; /* Thickness of the line */
  background-color: #E6E6E6; /* Color of the line */
  margin: 0 30px; /* Spacing around the line */
`;

const InfoBlock = styled.div`
height: 50px;
width: 400px;
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-area: i;
grid-template-areas: 
"a a b"
"c c c"
"d d d"
`;

const InfoBlock01 = styled.div`
height: 50px;
width: 400px;
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-area: j;
grid-template-areas: 
"a a b"
"c c c"
"d d d"
`;

const InfoBlock02 = styled.div`
width: 852px;
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-area: k;
grid-template-areas: 
"a a b"
"c c c"
"d d d"
`;

const InfoBlock04 = styled.div`
height: 50px;
width: 400px;
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-area: l;
grid-template-areas: 
"a a b"
"c c c"
"d d d"
`;

const InfoBlock05 = styled.div`
height: 50px;
width: 400px;
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-area: m;
grid-template-areas: 
"a a b"
"c c c"
"d d d"
`;

const InfoBlock06 = styled.div`
width: 852px;
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-area: n;
grid-template-areas: 
"a a b"
"c c c"
"d d d"
`;

const InfoBlock07 = styled.div`
width: 852px;
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-area: o;
grid-template-areas: 
"a a b"
"c c c"
"d d d"
`;

const InfoBlock08 = styled.div`
width: 852px;
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-area: p;
grid-template-areas: 
"a a b"
"c c c"
"d d d"
`;
const InfoBlock09 = styled.div`
width: 852px;
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-area: q;
grid-template-areas: 
"a a b"
"d d d"
"e e e"
`;

const InfoLabel = styled.span`
  font-weight: bold;
  grid-area: a;
`;

const EditLink = styled.button`
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  text-decoration: underline;
  font-weight: bold;
  font-style: italic;

  grid-area: b;
`;

const InfoValue = styled.span`
  // styles for the text display
  color: gray;
  grid-area: c;
`;

// Styled input component
const StyledInput = styled.input`
  font-weight: bold; // Match InfoLabel's font weight
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 5px 10px; // Padding inside the input
  margin: 5px 0; // Margin around the input
  width: calc(100% - 22px); // Adjust width as needed, accounting for border and padding
  grid-area: d;

  &:focus {
    outline: none;
    border-color: black; // Change border color on focus
  }
`;

const PasswordInfo = styled.div`
color: gray;
display: flex;
justify-content: space-between;
  grid-area: e;
`;

const StyledButton = styled.button`
  width: 90px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 30px 20px 0px;
  background-color: white; // Light yellow background: ;
  color: #000; // Black text color
  border: 2px solid #E1BD05; // Solid black border
  border-radius: 10px; // Rounded corners (adjust radius as needed)
  padding: 10px 20px; // Padding inside the button (adjust as needed)
  font-size: 16px; // Font size (adjust as needed)
  font-weight: bold; // Bold font weight
  cursor: pointer; // Changes the cursor on hover
  outline: none; // Removes the outline on focus for aesthetics
  transition: background-color 0.3s, transform 0.1s; // Smooth transition for visual effects

  &:hover {
    background-color: #E1BD05; // A slightly darker yellow on hover
  }

  &:active {
    transform: scale(0.98); // Slightly shrink the button when clicked
  }
`;

/* const UserHomePageBackground = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  width: 100%;
  background-color: #e1bd05;
  padding: 2rem 0;
`; */

// Styled component for a table row
const ClickableRow = styled.span`
  cursor: pointer;
  color: #007bff;
  display: block; // Make it block to fill the cell for better clickability

  &:hover {
    background-color: #f5f5f5;  // Light grey background on hover
    text-decoration: underline; // Optional: underline on hover for emphasis
  }
`


export {
  ClickableRow,
  HeaderContainer,
  WgsLogo,
  SecHeadContainer,
  InfoContainer,
  UserImgContainer,
  UserImg,
  UserInfoContainer,
  UserInfoSection,
  UserInfoSection02,
  VerticalLine,
  HorizontalLine,
  InfoBlock,
  InfoBlock01,
  InfoBlock02,
  InfoBlock04,
  InfoBlock05,
  InfoBlock06,
  InfoBlock07,
  InfoBlock08,
  InfoBlock09,
  InfoLabel,
  InfoValue,
  EditLink,
  StyledInput,
  StyledButton,
  PasswordInfo
  /* UserHomePageBackground */
};