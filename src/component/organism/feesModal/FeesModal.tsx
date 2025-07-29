"use client"

import type React from "react"
import { Fragment } from "react"
import { Modal, Box, Typography, Card, IconButton, useTheme } from "@mui/material"
import Button from "../../../component/atom/button/Button"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"

export interface FeeItem {
  id: number 
  description: string
  amount: string
  bgColor?: string
  paid?: boolean
  status?: string
}

export interface InfoItem {
  label: string
  value: string
}

interface FeeSelectionModalProps {
  open: boolean
  onClose: () => void
  feeItems: FeeItem[]
  onPayNow: (feeId: string) => void
  title?: string
  infoItems?: InfoItem[]
  isButtonDisabled?: (feeId: string) => boolean
}

const FeeSelectionModal: React.FC<FeeSelectionModalProps> = ({
  open,
  onClose,
  feeItems,
  onPayNow,
  title = "Select Fees to Pay",
  infoItems = [],
  isButtonDisabled,
}) => {
  const theme = useTheme()

  const getItemBackgroundColor = (index: number, bgColor?: string) => {
    if (bgColor) return bgColor
    return index % 2 === 0 ? "#F6EBFF" : "#FFE8D2"
  }

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="fee-selection-modal" aria-describedby="select-fees-to-pay">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "80%", md: "775px" },
          maxHeight: "90vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: theme.spacing(10),
          px: theme.spacing(8),
          pt: theme.spacing(7),
          pb: theme.spacing(11),
          outline: "none",
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "end", mb: 5 }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#1E1E1E",
              fontFamily: "Outfit, system-ui",
              fontSize: "24px",
              fontWeight: 500,
            }}
          >
            {title}
          </Typography>
          <IconButton onClick={onClose} sx={{ p: 0, display: 'flex' }}>
            <CancelOutlinedIcon sx={{ width: 27, height: 27, fill: "#1E1E1E" }} />
          </IconButton>
        </Box>

        {infoItems.length > 0 && (
          <Box
            sx={{
              display: "flex",
              gap: theme.spacing(3),
              mb: theme.spacing(7),
            }}
          >
            {infoItems.map((item, i) => (
              <Fragment key={item.label}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.grey[500],
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>

                {i < infoItems.length - 2 ? (
                  <Box
                    sx={{
                      color: theme.palette.grey[500],
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  >
                    -
                  </Box>
                ) : i === infoItems.length - 2 ? (
                  <Box
                    sx={{
                      color: theme.palette.grey[500],
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  >
                    =
                  </Box>
                ) : null}
              </Fragment>
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {feeItems.map((fee, index) => {
            const isPaid = fee.status === "PAID"

            return (
              <Card
                key={fee.id}
                variant="outlined"
                sx={{
                  borderRadius: "20px",
                  border: `1px solid ${getItemBackgroundColor(index, fee.bgColor)}`,
                  backgroundColor: getItemBackgroundColor(index, fee.bgColor),
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                  px: theme.spacing(7),
                  py: theme.spacing(3),
                  opacity: isPaid ? 0.6 : 1, 
                }}
              >
                <Box sx={{ p: theme.spacing(3) }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          minWidth: "130px",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: 400,
                            fontSize: "16px",
                          }}
                        >
                          Description
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 400, fontSize: "20px" }}>
                          {fee.description}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          minWidth: "130px",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: 400,
                            fontSize: "16px",
                          }}
                        >
                          Amount
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 400, fontSize: "20px" }}>
                          {fee.amount}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Button
                          variant="contained"
                          onClick={() => onPayNow(fee.id.toString())}
                          disabled={isButtonDisabled?.(fee.id.toString()) || isPaid}
                          sx={{
                            backgroundColor: isPaid ? theme.palette.grey[300] : "white",
                            color: isPaid ? theme.palette.grey[500] : theme.palette.primary.dark,
                            fontWeight: "bold", 
                            px: theme.spacing(20),
                            py: theme.spacing(2),
                            textTransform: "none",
                            border: `1px solid ${isPaid ? theme.palette.grey[300] : theme.palette.primary.main}`,
                            "&:hover": {
                              backgroundColor: isPaid ? theme.palette.grey[300] : "white",
                              border: `1px solid ${isPaid ? theme.palette.grey[300] : theme.palette.primary.main}`,
                              boxShadow: "none",
                            },
                            "&:disabled": {
                              backgroundColor: theme.palette.grey[300],
                              color: theme.palette.grey[500],
                              border: `1px solid ${theme.palette.grey[300]}`,
                            },
                          }}
                        >
                          {isPaid ? "Paid" : "Pay Now"}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Card>
            )
          })}
          <Typography
            variant="h5"
            sx={{
              color: "#1E1E1E",
              fontFamily: "Outfit, system-ui",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            * Ignore if fee has been paid already, ignore
          </Typography>
        </Box>
      </Box>
    </Modal>
  )
}

export default FeeSelectionModal
