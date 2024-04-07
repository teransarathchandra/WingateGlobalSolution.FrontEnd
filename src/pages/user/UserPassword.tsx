
import {
    HeaderContainer,
    SecHeadContainer,
    InfoContainer,
    UserInfoSection,
    UserImgContainer,
    InfoBlock06,
    InfoBlock07,
    InfoBlock08,
    InfoBlock09,
    InfoLabel,
    InfoValue,
    EditLink,
    StyledInput,
    PasswordInfo,
    StyledButton,
    VerticalLine,
    UserInfoContainer,
} from "@app_styles/userProfile.styles";
import wgs_logo from "@app_assets/images/wgs_logo.png";
import { WgsLogo } from "@app_styles/userProfile.styles";
import UserNavbar from "@app_components/shared/UserNavbar";
import userImg from "@app_assets/images/user-Img.png";
import { UserImg } from "@app_styles/userProfile.styles";


const UserPassword = () => {
    return (
        <>

            <HeaderContainer>
                <WgsLogo src={wgs_logo} alt="WGS Logo" />
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
                <UserInfoSection>
                    <InfoBlock06 className="n">
                        <InfoLabel className="a">Existing Password</InfoLabel>
                        <EditLink className="b">Edit</EditLink>
                        <StyledInput className="d" type="text" />
                    </InfoBlock06>

                    <InfoBlock09 className="q">
                        <InfoLabel className="a">New Password</InfoLabel>
                        <EditLink className="b">Edit</EditLink>
                        <StyledInput className="d" type="text" />
                        <PasswordInfo className="e">
                            <div>8-10 Characters Long</div>
                            <div>One Number</div>
                            <div>Upper And Lowercase</div>
                            <div>One Special Character
                                (!@#$%)</div>
                        </PasswordInfo>

                    </InfoBlock09>


                    <InfoBlock08 className="p">
                        <InfoLabel className="a">Re-Enter New Password</InfoLabel>
                        <EditLink className="b">Edit</EditLink>
                        <StyledInput className="d" type="text" />
                    </InfoBlock08>
                </UserInfoSection>
                <StyledButton>save</StyledButton>
                </UserInfoContainer>


            </InfoContainer>

        </>
    )
}

export default UserPassword;