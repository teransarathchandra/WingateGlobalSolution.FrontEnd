import { HomePageBackground } from "@app_styles/home.styles"; // Import from where you defined them
import {
    HeaderContainer,
    SecHeadContainer,
    InfoContainer,
    UserImgContainer,
    UserInfoContainer,
    UserInfoSection,
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
    InfoLabel,
    InfoValue,
    EditLink,
    StyledInput,
    StyledButton
} from "@app_styles/userProfile.styles";
import Navbar from "@app_components/shared/Navbar";
import wgs_logo from "@app_assets/images/wgs_logo.png";
import { WgsLogo } from "@app_styles/userProfile.styles";
import userImg from "@app_assets/images/user-Img.png";
import { UserImg } from "@app_styles/userProfile.styles";
import UserNavbar from "@app_components/shared/UserNavbar";


const UserSettings = () => {
    return (
        <>
            <HeaderContainer>
                <WgsLogo src={wgs_logo} alt="WGS Logo" />
                <Navbar
                    isVisible
                    homeRef
                    servicesRef
                    aboutUsRef
                    contactUsRef
                />
            </HeaderContainer>
            <SecHeadContainer>
                <h1>Settings</h1>
                <UserNavbar />
            </SecHeadContainer>
            <InfoContainer>
                <UserImgContainer>
                    <UserImg src={userImg} alt="User Image" />
                    <h3>Name</h3>
                    <h3>user name</h3>
                </UserImgContainer>

                <VerticalLine />

                <UserInfoContainer>
                    <h2>Basic Info</h2>
                    <HorizontalLine />
                    <UserInfoSection >
                        <InfoBlock className="i">
                            <InfoLabel className="a">First Name</InfoLabel>
                            <EditLink className="b">Edit</EditLink>
                            <InfoValue className="c">David</InfoValue>
                            <StyledInput className="d" type="text" />
                        </InfoBlock>

                        <InfoBlock01 className="j">
                            <InfoLabel className="a">Last Name</InfoLabel>
                            <EditLink className="b">Edit</EditLink>
                            <InfoValue className="c">Christopher</InfoValue>
                            <StyledInput className="d" type="text" />
                        </InfoBlock01>

                        <InfoBlock02 className="k">
                            <InfoLabel className="a">Email</InfoLabel>
                            <EditLink className="b">Edit</EditLink>
                            <InfoValue className="c">david@gmail.com</InfoValue>
                            <StyledInput className="d" type="email" />
                        </InfoBlock02>

                        <InfoBlock04 className="l">
                            <InfoLabel className="a">Phone Number</InfoLabel>
                            <EditLink className="b">Edit</EditLink>
                            <InfoValue className="c">+94 1230123</InfoValue>
                            <StyledInput className="d" type="text" />
                        </InfoBlock04>

                        <InfoBlock05 className="m">
                            <InfoLabel className="a">Username</InfoLabel>
                            <EditLink className="b">Edit</EditLink>
                            <InfoValue className="c">david</InfoValue>
                            <StyledInput className="d" type="text" />
                        </InfoBlock05>

                        <InfoBlock06 className="n">
                            <InfoLabel className="a">Street Address</InfoLabel>
                            <EditLink className="b">Edit</EditLink>
                            <InfoValue className="c">1st Street</InfoValue>
                            <StyledInput className="d" type="text" />
                        </InfoBlock06>

                        <InfoBlock07 className="o">
                            <InfoLabel className="a">City</InfoLabel>
                            <EditLink className="b">Edit</EditLink>
                            <InfoValue className="c">Kalutara</InfoValue>
                            <StyledInput className="d" type="text" />
                        </InfoBlock07>

                        <InfoBlock08 className="p">
                            <InfoLabel className="a">State</InfoLabel>
                            <EditLink className="b">Edit</EditLink>
                            <InfoValue className="c">West</InfoValue>
                            <StyledInput className="d" type="text" />
                        </InfoBlock08>

                    </UserInfoSection>
                    <StyledButton>save</StyledButton>
                </UserInfoContainer>

            </InfoContainer>


        </>
    );
};

export default UserSettings;
