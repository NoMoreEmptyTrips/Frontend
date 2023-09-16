import mock from "../response.json";
import { RouteMapDirections } from "../components/RouteMapDirections";

const Test = () => {
  return <RouteMapDirections stops={mock.routes[0].stops as any} />;
};

export default Test;
