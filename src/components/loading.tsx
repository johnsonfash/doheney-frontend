import { Spinner } from "reactstrap";

const LoadingView = ({ height = "75vh" }: { height?: string }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height }}
    >
      <Spinner color="dark" />
    </div>);
};

export default LoadingView;
