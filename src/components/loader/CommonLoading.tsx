import { useSelector } from "react-redux";
import { SpinnerOverlay } from "../../styles/shared/spinnerOverlay.styles";
import { square } from "ldrs";
square.register();
const CommonLoading = ({ loading }) => {
  const isLoadingRedux = useSelector((state: any) => state.loading.isLoading);
  const isLoading = loading || isLoadingRedux;

  if (!isLoading) return null;

  return (
    <SpinnerOverlay>
      <l-square
        size="35"
        stroke="5"
        stroke-length="0.25"
        bg-opacity="0.1"
        speed="1.2"
        color="#00ffc3"
      ></l-square>
    </SpinnerOverlay>
  );
};

export default CommonLoading;
