"use client";
import { Button } from "@mui/material";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import Image from "next/image";
import { useState } from "react";
import { useAppStore, useChatIconStore, useLLMStore } from "@/store";
import { toast } from "react-toastify";
import CustomToast from "./CustomToast";

const Navbar = () => {
  const { hasInput, setInputError } = useAppStore();
  const { validateForm, hasLLMError } = useLLMStore();
  const { setChatEnabled } = useChatIconStore();

  // State to manage the play and deploy button states
  const [isRunDisabled, setRunDisabled] = useState(false);
  const [isDeployDisabled, setDeployDisabled] = useState(true);
  const [isDeployed, setIsDeployed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler for play button click
  const handleRunClick = () => {
    validateForm();
    if (hasInput && !hasLLMError) {
      setRunDisabled(true); // Disable play button
      setDeployDisabled(false); // Enable deploy button
      setInputError(false);
      toast.success(
        <CustomToast
          largeMessage="Flow ran successfully"
          smallMessage="Your workflow is ready to be deployed"
          color="green"
        />,
        { theme: "colored" }
      );
    } else {
      setInputError(true);
      toast.error(
        <CustomToast
          largeMessage="Error while running the flow"
          smallMessage="Please enter the input text before running the flow"
          color="green"
        />,
        { theme: "colored" }
      );
    }
  };

  // Handler for deploy/undeploy button click
  const handleDeployClick = () => {
    if (isDeployed) {
      setIsModalOpen(true); // Show confirmation modal before undeploying
    } else {
      // Proceed with deployment directly
      setIsDeployed(true);
      setChatEnabled(true);
      setRunDisabled(true);
      setDeployDisabled(false);
      toast.success(
        <CustomToast
          largeMessage="Deployed successfully"
          smallMessage="You can now chat with the AI Assistant!"
          color="green"
        />,
        { theme: "colored" }
      );
    }
  };

  // Handler for confirming undeploy action
  const handleConfirmUndeploy = () => {
    setIsDeployed(false); // Undeploy
    setChatEnabled(false);
    setRunDisabled(false); // Re-enable play button
    setDeployDisabled(true); // Disable deploy button
    setIsModalOpen(false); // Close modal
    toast.success(
      <CustomToast
        largeMessage="Undeployed successfully"
        smallMessage="Your workflow has been undeployed."
        color="green"
      />,
      { theme: "colored" }
    );
  };

  return (
    <div className="flex items-center justify-between gap-3 h-16 px-5  border-b border-gray-200">
      <div className="flex gap-3">
        <Image src="/logo.png" alt="logo" width={33} height={33} />
        <span className="font-bold text-lg">OpenAGI</span>
      </div>

      <div className="flex gap-3">
        <Button
          variant={isDeployed ? "outlined" : "contained"}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            backgroundColor: isDeployed ? "transparent" : "black", // Black when "Deploy"
            color: isDeployed ? "#FF5353" : "white", // Red text for "Undeploy", white for "Deploy"
            borderColor: isDeployed ? "#FF5353" : "transparent", // Red outline for "Undeploy"
            borderWidth: isDeployed ? "1px" : "0px",
          }}
          color={isDeployed ? "#00000030" : "#fff"} // Change color based on deploy state
          onClick={handleDeployClick}
          disabled={isDeployDisabled}
        >
          {isDeployed ? "Undeploy" : "Deploy"}
        </Button>
        <Button
          variant="outlined"
          startIcon={<PlayCircleFilledWhiteOutlinedIcon />}
          sx={{
            borderRadius: "8px",
            backgroundColor: isRunDisabled ? "#44924C33" : "#44924C",
            color: isRunDisabled ? "#000" : "#fff",
            border: "none",
            textTransform: "none",
          }}
          onClick={handleRunClick}
          disabled={isRunDisabled}
        >
          Run
        </Button>
      </div>

      {/* Full-screen Confirmation Modal */}
      {isModalOpen && (
        <div className="px-60 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-[1000] bg-black/50">
          <div className="flex flex-col gap-2 p-8 rounded-xl bg-white shadow-md">
          <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
              >
                <Image src="/x.svg" alt="" width={12} height={12} />
              </button>
            </div>
            <h2 className="font-semibold text-[20px] text-left">
              Are you sure you want to undeploy?
            </h2>
            <p className="text-base font-medium text-left">
              Undeploying will stop the app and make it unavailable to users
            </p>
            <div className="flex justify-end pt-6">
              <button
                onClick={handleConfirmUndeploy}
                className=" px-4 py-2 bg-brand_red rounded-lg text-white "
              >
                Undeploy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
