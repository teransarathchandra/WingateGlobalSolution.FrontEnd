import { useSelector } from "react-redux";
import { SpinnerOverlay } from "@app_styles/shared/spinnerOverlay.styles";
// import { square } from "ldrs";
import { ring } from "ldrs";
// square.register();
ring.register();
const CommonLoading = ({ loading }) => {
  const isLoadingRedux = useSelector((state: any) => state.loading.isLoading);
  const isLoading = loading || isLoadingRedux;

  if (!isLoading) return null;

  return (
    <SpinnerOverlay>
      {/* <l-square
        size="35"
        stroke="5"
        stroke-length="0.25"
        bg-opacity="0.1"
        speed="1.2"
        color="#00ffc3"
      ></l-square> */}
      <l-ring
        size="35"
        stroke="5"
        stroke-length="0.25"
        bg-opacity="0.1"
        speed="2"
        color="#0051A2"
      ></l-ring>
    </SpinnerOverlay>
  );
};

export default CommonLoading;
