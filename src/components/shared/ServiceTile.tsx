import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ServiceTileHeader, ServiceTiles } from "@app_styles/services.styles";

const ServiceTile = ({ icon, title }) => (
    <ServiceTiles>
        <FontAwesomeIcon icon={icon} />
        <ServiceTileHeader>{title}</ServiceTileHeader>
    </ServiceTiles>
);

export default ServiceTile;
