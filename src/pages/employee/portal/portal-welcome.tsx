import styled from "styled-components";
import portalBackground from "@app_assets/images/portalBackground.png";
import orderIcon from "@app_assets/images/orderIcon.png"
import restrictedIcon from "@app_assets/images/restricted.png"
import ResTypeIcon from "@app_assets/images/restrictOT.png"
import CountryInfoIcon from "@app_assets/images/countryInfo.png"
import CategoryIcon from "@app_assets/images/CategoryIcon.png"
import orderAggIcon from "@app_assets/images/orderAgg.png"
import bulkDetIcon from "@app_assets/images/bulkDetails.png"
import truckIcon from "@app_assets/images/truck.png"
import flight from "@app_assets/images/flight.png"
import airline from "@app_assets/images/airline.png"
import crmIcon from "@app_assets/images/crm.png"
import userIcon from "@app_assets/images/user.png"
import warehouseIcon from "@app_assets/images/warehouse.png"
import driverIcon from "@app_assets/images/driver.png"
import empManager from "@app_assets/images/empManager.png"
import empAccessIcon from "@app_assets/images/empAccess.png"
import { useAppNavigation } from "@app_utils/appNavigation";
import { useEmployeeAuthContext } from "@app_contexts/childContexts/authEmployeeContext";
import toastUtil from "@app_utils/toastUtil";


// ProfileImage Component
const ProfileImage = styled.img.attrs({
  src: "https://cdn.builder.io/api/v1/image/assets/TEMP/586a24e8a819d8897da2bd2e082e42316b56cba40f9e096cf913851b9ad85175?apiKey=b8067976cf2a44fabfe1f4ad3e297451&",
  alt: "Profile"
})`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  margin-top: 20px;
`;

// WelcomeMessage Component
const WelcomeMessage = styled.h1`
  color: #000000; // Changed color to black
  font-size: 36px;
  text-align: center;
  margin-top: 10px;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 991px) {
    font-size: 40px;
    margin-top: 40px;
  }
`;


// MenuItem Component
const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  padding: 10px;
  margin: 8px;
  width: 80px;
  height: 80px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    background-color: #f0f0f0;  // Optional: change background on hover

  }
  
`;
const MenuItemIcon = styled.img`
  width: 60%;
  height: 60%;
  margin-bottom: 10px;
  object-fit: contain;
`;

const MenuItemLabel = styled.span`
  font-size: 12px;
  color: #333333;
  text-align: center;
`;

// MenuSection Component
const MenuSection = styled.section`
  margin-top: 20px;
  padding: 0px;
  background: rgba(255, 255, 255, 0.1);  // Lighter background for a more glass-like effect
  backdrop-filter: blur(10px);  // Blurs any content behind the section
  border-radius: 20px;  
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);  // Subtle shadow for depth
  border: 1px solid rgba(255, 255, 255, 0.18);
`;


const GridTitle = styled.h2`
  color: #333333;
  font-size: 15px;
  margin-bottom: 0px;
  text-align: left;
  padding-left: 10px;
`;

const MenuGrid = styled.div`
  display: flex;
  flex-direction: row;
  /* flex-wrap: wrap; */
  justify-content: flex-start;
  gap: 5px;
  column-count: 5;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex-direction: row;
`;

// Container for Profile Image and Welcome Message
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

`;
const MessageContainer = styled.div`
  padding: 20px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;





// App Component
const App = () => {
    const menuItems = [
        {
            sectionName: "Transport",
            items: [
                { label: "Order Aggregation", path: "app/order-aggregation", icon: orderAggIcon },
                { label: "Bulk Details", path: "app/bulk-details", icon: bulkDetIcon },
                { label: "Bulk", path: "app/bulk", icon: truckIcon },
                { label: "Flight", path: "app/flight", icon: flight},
                { label: "Airline", path: "app/airline", icon: airline },
            ]
        },
        {
            sectionName: "Restricted Order",
            items: [
                { label: "Restricted Orders", path: "app/restricted-orders", icon: restrictedIcon },
                { label: "Restricted Order Types", path: "app/restricted-order-type", icon: ResTypeIcon },
                { label: "Country Info", path: "app/country", icon: CountryInfoIcon },
                { label: "Category Info", path: "app/category", icon: CategoryIcon },
            ]
        },
        {
            sectionName: "Warehouse",
            items: [
                { label: "Warehouse Availability", path: "app/warehouseInfo", icon: warehouseIcon },
                { label: "Assign Drivers", path: "app/assign-details", icon: driverIcon },


      ]
    },
    {
      sectionName: "Employee",
      items: [
        { label: "Employee Management", path: "app/employee-manage", icon: empManager },
        { label: "Employee Access", path: "app/employee-access", icon: empAccessIcon },


      ]
    },
    {
      sectionName: "Finance",
      items: [
        { label: "Quotation", path: "app/quotation", icon: empManager },
        { label: "Payments", path: "app/payment", icon: empAccessIcon },


      ]
    },
        {
            sectionName: "Order",
            items: [
                { label: "Order Management", path: "app/order", icon: orderIcon },

            ]
        },
        {
            sectionName: "Customer",
            items: [
                { label: "Customer Info", path: "app/crm", icon: crmIcon },
            ]
        },
        {
            sectionName: "User",
            items: [
                { label: "User Info", path: "app/user", icon: userIcon },

            ]
        },

  ];
  const { handleAppNavigation } = useAppNavigation();
  const { employee } = useEmployeeAuthContext();
  const handleSelect = async (path) => {
    if (employee) {
      const route = path;
      handleAppNavigation(route, employee.accessToken);
    } else {
      toastUtil.error("Access Denied!");
    }
  };

  return (
    <PageWrapper>
      <ProfileContainer>
        <ProfileImage />
        <MessageContainer>
          <WelcomeMessage>Welcome Back,</WelcomeMessage>
          <WelcomeMessage>{employee?.name.firstName || "User"}</WelcomeMessage>
        </MessageContainer>
      </ProfileContainer>
      {menuItems.map((section, index) => (
        <MenuSection key={index}>
          <GridTitle>{section.sectionName}</GridTitle>
          <MenuGrid>
            {section.items.map((item, idx) => (
              <MenuItem key={idx} onClick={() => handleSelect(item.path)}>
                <MenuItemIcon src={item.icon} alt={item.label} />
                <MenuItemLabel>{item.label}</MenuItemLabel>
              </MenuItem>
            ))}
          </MenuGrid>
        </MenuSection>
      ))}
    </PageWrapper>
  );
};

export default App;

// PageWrapper styled component
const PageWrapper = styled.div`
  background-image: url(${portalBackground});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 20px;
  min-height: 100vh;
`;

