import { SocketProvider } from "../../context/SocketProvider";
import Room from "./Room";

const RoomPage = () => {
  return (
    <SocketProvider>
      <Room />
    </SocketProvider>
  );
};

export default RoomPage;
