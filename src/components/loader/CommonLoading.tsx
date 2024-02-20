/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ScaleLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { SpinnerOverlay } from "../../styles/shared/spinnerOverlay.styles";
import { square } from "ldrs";
square.register();
const CommonLoading = ({ loading }) => {
  const isLoadingRedux = useSelector((state: any) => state.loading.isLoading);
  const isLoading = loading || isLoadingRedux;

  if (!isLoading) return null;

  return (
    // <SpinnerOverlay>
    //   <ScaleLoader color="#36d6c4" height={30} width={3} />
    // </SpinnerOverlay>

    // Default values shown
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
