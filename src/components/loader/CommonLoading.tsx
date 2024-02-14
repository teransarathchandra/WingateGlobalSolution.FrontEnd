/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScaleLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { SpinnerOverlay } from "../../styles/shared/spinnerOverlay.styles";

const CommonLoading = () => {
  const isLoading = useSelector((state: any) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <SpinnerOverlay>
      <ScaleLoader color="#36d6c4" height={30} width={3} />
    </SpinnerOverlay>
  );
};

export default CommonLoading;
