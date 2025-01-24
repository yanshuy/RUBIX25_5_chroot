import React, { useEffect, useCallback, useState, useRef } from "react";
import peer from "./peer";
import { useSocket } from "../../context/SocketProvider";
import { TiVideo } from "react-icons/ti";
import { PiPhoneCallLight } from "react-icons/pi";
import {
  IoArrowUpOutline,
  IoCameraOutline,
  IoCloseOutline,
  IoMicOffOutline,
  IoMicOutline,
  IoVideocamOffOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

type Stream = MediaStream | null;
type SocketId = string | null;

const Room: React.FC = () => {
  const socket = useSocket();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [remoteSocketId, setRemoteSocketId] = useState<SocketId>(null);
  const [myStream, setMyStream] = useState<Stream>(null);
  const [remoteStream, setRemoteStream] = useState<Stream>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [screenSharing, setScreenSharing] = useState<boolean>(false);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const screenVideoRef = useRef<HTMLVideoElement | null>(null);

  const [searchParams] = useSearchParams();

  const emailId = searchParams.get("emailId");
  const { hackathonid, teamid } = useParams<{ hackathonid: string; teamid: string }>();
  const roomId = `${hackathonid}-${teamid}`;

  const handleJoinRoom = useCallback(
    (data: { email: string; room: string }) => {
      const { room } = data;
      // navigate(`/dashboard/hackathons/room/${roomId}`);
    },
    [navigate, roomId],
  );

  const handleUserJoined = useCallback(
    ({ email, id }: { email: string; id: string }) => {
      console.log(`Email ${email} joined room`);
      setRemoteSocketId(id);
    },
    [],
  );

  const handleCallUser = useCallback(async () => {
    if (!remoteSocketId) return;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket?.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({
      from,
      offer,
    }: {
      from: string;
      offer: RTCSessionDescriptionInit;
    }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket?.emit("call:accepted", { to: from, ans });
    },
    [socket],
  );

  const sendStreams = useCallback(() => {
    if (!myStream) return;
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }: { from: string; ans: RTCSessionDescriptionInit }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams],
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket?.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({
      from,
      offer,
    }: {
      from: string;
      offer: RTCSessionDescriptionInit;
    }) => {
      const ans = await peer.getAnswer(offer);
      socket?.emit("peer:nego:done", { to: from, ans });
    },
    [socket],
  );

  const handleNegoNeedFinal = useCallback(
    async ({ ans }: { ans: RTCSessionDescriptionInit }) => {
      await peer.setLocalDescription(ans);
    },
    [],
  );

  const handleToggleMute = () => {
    if (myStream) {
      myStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const handleToggleVideo = () => {
    if (myStream) {
      myStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const handleShareScreen = async () => { 
    if (!screenSharing) {
      try {
        // Get screen stream
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false // Optional: add audio if needed
        });
  
        // Replace the video track in the peer connection
        const screenTrack = screenStream.getVideoTracks()[0];
        const senders = peer.peer.getSenders();
        const videoSender = senders.find(
          (sender) => sender.track?.kind === "video"
        );
  
        if (videoSender) {
          await videoSender.replaceTrack(screenTrack);
        }
  
        // Update state to reflect screen sharing
        setScreenSharing(true);
  
        // Handle screen sharing end
        screenTrack.onended = () => {
          if (videoSender) {
            // Restore the original video track
            const originalTrack = myStream?.getVideoTracks()[0];
            if (originalTrack) {
              videoSender.replaceTrack(originalTrack);
            }
          }
          setScreenSharing(false);
        };
  
        // Display the shared screen in a new video element
        if (screenVideoRef.current) {
          screenVideoRef.current.srcObject = screenStream;
        }
      } catch (error) {
        console.error("Error sharing screen:", error);
        // Optionally, show a user-friendly error message
        // toast.error("Screen sharing failed");
      }
    }
  };

  const handleEndCall = () => {
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
    }
    setRemoteStream(null);
    socket.disconnect();
  };

  useEffect(() => {
    if (localVideoRef.current && myStream) {
      localVideoRef.current.srcObject = myStream;
    }
  }, [myStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev: RTCTrackEvent) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    if (screenVideoRef.current && screenSharing && myStream) {
      const screenTrack = myStream.getVideoTracks().find(track => track.kind === "video");
      if (screenTrack) {
        const screenStream = new MediaStream();
        screenStream.addTrack(screenTrack);
        screenVideoRef.current.srcObject = screenStream;
      }
    }
  }, [screenSharing, myStream]);

  useEffect(() => {
    if (socket) {
      setEmail(emailId);
      setRoom(roomId);
      socket.emit("room:join", { email, room });
    }
  }, [email, emailId, room, roomId, socket]);

  useEffect(() => {
    socket?.on("room:join", handleJoinRoom);
    socket?.on("user:joined", handleUserJoined);
    socket?.on("incomming:call", handleIncommingCall);
    socket?.on("call:accepted", handleCallAccepted);
    socket?.on("peer:nego:needed", handleNegoNeedIncomming);
    socket?.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket?.off("room:join", handleJoinRoom);
      socket?.off("user:joined", handleUserJoined);
      socket?.off("incomming:call", handleIncommingCall);
      socket?.off("call:accepted", handleCallAccepted);
      socket?.off("peer:nego:needed", handleNegoNeedIncomming);
      socket?.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleJoinRoom,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div className="flex h-screen w-fit flex-col justify-start gap-14 overflow-hidden bg-zinc-900 px-24 py-14">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-10">
        <div className="flex items-center gap-10">
          <div className="flex h-10 w-14 items-center justify-center rounded-xl border-2 border-white bg-blue-800 px-2 py-1">
            <TiVideo className="h-6 w-6 text-neutral-200" />
          </div>
          <p className="border-l-2 border-neutral-200 pl-10 font-mono text-lg tracking-tighter text-white">
            {remoteSocketId ? "Connected" : "No one in the room"}
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          {myStream && (
            <button
              className="mr-3 flex flex-row-reverse items-center justify-center gap-4 rounded-xl bg-neutral-100 px-3 py-[0.3rem]"
              onClick={sendStreams}
            >
              <IoCameraOutline className="h-7 w-7" />
              <p className="text-[#26262b]">Give Video Permission</p>
            </button>
          )}
          {remoteSocketId && (
            <button
              className="mr-3 flex -scale-x-100 flex-row-reverse items-center justify-center gap-4 rounded-xl bg-neutral-100 px-3 py-[0.3rem]"
              onClick={handleCallUser}
            >
              <p className="-scale-x-100 text-lg font-medium text-[#26262b]">
                Call
              </p>
              <PiPhoneCallLight className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-10">
        {myStream && (
          <div className="relative h-[23rem] w-[36rem] overflow-hidden rounded-2xl">
            <video
              ref={localVideoRef}
              autoPlay
              muted={isMuted}
              className="h-[100%] w-[100%] object-cover"
            />
          </div>
        )}
        {remoteStream && (
          <div className="relative h-[23rem] w-[36rem] overflow-hidden rounded-2xl">
            <video
              ref={remoteVideoRef}
              autoPlay
              muted={isMuted}
              className="h-[100%] w-[100%] object-cover"
            />
          </div>
        )}
        {screenSharing && (
          <div className="relative h-[23rem] w-[36rem] overflow-hidden rounded-2xl">
            <video
              ref={screenVideoRef} // Add a ref for the shared screen video
              autoPlay
              className="h-[100%] w-[100%] object-cover"
            />
          </div>
        )}
      </div>
      {myStream && (
        <>
          <div className="mt-6 flex w-full items-center justify-center gap-6 bg-transparent">
            <button onClick={handleToggleMute}>
              {isMuted ? (
                <div className="flex h-11 w-14 items-center justify-center rounded-lg border border-neutral-100 bg-[#26262b] px-3 py-2">
                  <IoMicOffOutline className="h-6 w-6 text-neutral-200" />
                </div>
              ) : (
                <div className="flex h-11 w-14 items-center justify-center rounded-lg border border-neutral-100 bg-[#26262b] px-3 py-2">
                  <IoMicOutline className="h-6 w-6 text-neutral-200" />
                </div>
              )}
            </button>
            <button onClick={handleToggleVideo}>
              {isVideoOff ? (
                <div className="flex h-11 w-14 items-center justify-center rounded-lg border border-neutral-100 bg-[#26262b] px-3 py-2">
                  <IoVideocamOffOutline className="h-6 w-6 text-neutral-200" />
                </div>
              ) : (
                <div className="flex h-11 w-14 items-center justify-center rounded-lg border border-neutral-100 bg-[#26262b] px-3 py-2">
                  <IoVideocamOutline className="h-6 w-6 text-neutral-200" />
                </div>
              )}
            </button>
            <button onClick={handleShareScreen}>
              {screenSharing ? (
                <div className="flex h-11 w-14 items-center justify-center rounded-lg border border-neutral-100 bg-[#26262b] px-3 py-2">
                  <IoCloseOutline className="h-6 w-6 text-neutral-200" />
                </div>
              ) : (
                <div className="flex h-11 w-14 items-center justify-center rounded-lg border border-neutral-100 bg-[#26262b] px-3 py-2">
                  <IoArrowUpOutline className="h-6 w-6 text-neutral-200" />
                </div>
              )}
            </button>
            <Link to={"/"}>
            <button
              className="flex items-center justify-center rounded-lg bg-[#ff0035] px-3 py-[0.3rem] font-mono text-[1.3rem] tracking-tight text-white"
              onClick={handleEndCall}
            >
              Leave
            </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Room;
