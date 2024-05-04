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
                    <UserInfoSection>
                        <InfoBlock>
                            <InfoLabel>First Name</InfoLabel>
                            <EditLink>Edit</EditLink>
                            <InfoValue className="Firstname">David</InfoValue>
                            <StyledInput type="text" />
                        </InfoBlock>

                        <InfoBlock01>
                            <InfoLabel>Last Name</InfoLabel>
                            <EditLink>Edit</EditLink>
                            <InfoValue className="Lastname">Christopher</InfoValue>
                            <StyledInput type="text" />
                        </InfoBlock01>

                        <InfoBlock02>
                            <InfoLabel>Email</InfoLabel>
                            <EditLink>Edit</EditLink>
                            <InfoValue className="email">david@gmail.com</InfoValue>
                            <StyledInput type="email" />
                        </InfoBlock02>

                        <InfoBlock04>
                            <InfoLabel>Phone Number</InfoLabel>
                            <EditLink>Edit</EditLink>
                            <InfoValue className="phoneNumber">+94 1230123</InfoValue>
                            <StyledInput type="text" />
                        </InfoBlock04>

                        <InfoBlock05>
                            <InfoLabel>Username</InfoLabel>
                            <EditLink>Edit</EditLink>
                            <InfoValue className="username">david</InfoValue>
                            <StyledInput type="text" />
                        </InfoBlock05>

                        <InfoBlock06>
                            <InfoLabel>Street Address</InfoLabel>
                            <EditLink>Edit</EditLink>
                            <InfoValue className="street">1st Street</InfoValue>
                            <StyledInput type="text" />
                        </InfoBlock06>

                        <InfoBlock07>
                            <InfoLabel>City</InfoLabel>
                            <EditLink>Edit</EditLink>
                            <InfoValue className="city">Kalutara</InfoValue>
                            <StyledInput type="text" />
                        </InfoBlock07>

                        <InfoBlock08>
                            <InfoLabel>State</InfoLabel>
                            <EditLink>Edit</EditLink>
                            <InfoValue className="state">West</InfoValue>
                            <StyledInput type="text" />
                        </InfoBlock08>

                    </UserInfoSection>
                    <StyledButton>save</StyledButton>
                </UserInfoContainer>

            </InfoContainer>


        </>
    );
};

export default UserSettings;
