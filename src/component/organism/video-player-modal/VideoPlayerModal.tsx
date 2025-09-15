"use client"

import type React from "react"
import { Modal, Box, IconButton, useTheme } from "@mui/material"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"

interface VideoPlayerModalProps {
  open: boolean
  onClose: () => void
  videoUrl: string
  title?: string
  autoPlay?: boolean
  controls?: boolean
  width?: string | number
  height?: string | number
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  open,
  onClose,
  videoUrl,
  title,
  autoPlay = true,
  controls = true,
  width = "100%",
  height = "auto"
}) => {
  const theme = useTheme()

  const handleClose = () => {
    onClose()
  }

  return (
    <Modal 
      open={open} 
      onClose={handleClose} 
      aria-labelledby="video-player-modal"
      aria-describedby="video-player-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", sm: "90%", md: "80%", lg: "70%" },
          maxWidth: "1000px",
          maxHeight: "90vh",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: theme.spacing(3),
          p: 0,
          outline: "none",
          overflow: "hidden"
        }}
      >
        {/* Header with close button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            p: theme.spacing(2),
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            position: "relative",
            zIndex: 1
          }}
        >
          <IconButton 
            onClick={handleClose} 
            sx={{ 
              p: 1,
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }
            }}
          >
            <CancelOutlinedIcon sx={{ width: 24, height: 24 }} />
          </IconButton>
        </Box>

        {/* Video Container */}
        <Box
          sx={{
            position: "relative",
            paddingBottom: "56.25%", 
            height: 0,
            backgroundColor: "#000",
            "& video": {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain"
            }
          }}
        >
          <video
            key={videoUrl} 
            controls={controls}
            autoPlay={autoPlay}
            width={width}
            height={height}
            style={{
              maxWidth: "100%",
              maxHeight: "100%"
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
            <source src={videoUrl} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </Box>
    </Modal>
  )
}

export default VideoPlayerModal