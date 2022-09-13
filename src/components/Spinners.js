import { TailSpin } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const TheTailSpinner = (props) => {
  return (
    <TailSpin
      height={props.height}
      width={props.width}
      color="blue"
      ariaLabel="tail-spin-loading"
      radius="1"
      visible={props.isLoading}
    />
  );
};
