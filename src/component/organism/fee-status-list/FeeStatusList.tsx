import React, { ComponentProps } from "react";
import { Box, Typography } from "@mui/material";
import { useCoreTheme } from "../../../theme/core-theme";
import { Button } from "../../atom/button";

export enum FeeStatus {
  OVERDUE = "overdue",
  DUE = "due",
  PAID = "paid",
}

export interface FeeItem {
  label: string;
  value: string | React.ReactNode;
}

export interface IFeeStatusListProps {
  status: FeeStatus;
  feeItems: FeeItem[];
  onPayNow?: () => void;
}

export type FeeStatusListProps = ComponentProps<typeof Box> &
  IFeeStatusListProps;

const statusIcons = {
  [FeeStatus.OVERDUE]: "⚠️",
  [FeeStatus.DUE]: "⏳",
  [FeeStatus.PAID]: "✅",
};

const FeeStatusList: React.FC<FeeStatusListProps> = ({
  status,
  feeItems,
  onPayNow,
  ...props
}) => {
  const theme = useCoreTheme();

  const getStatusColor = (status: FeeStatus) => {
    switch (status) {
      case FeeStatus.OVERDUE:
        return theme.palette.error.main;
      case FeeStatus.DUE:
        return theme.palette.warning.main;
      case FeeStatus.PAID:
        return theme.palette.success.main;
      default:
        return theme.palette.text.primary;
    }
  };

  const statusColor = getStatusColor(status);
  const semesterItem = feeItems.find(
    (item) => item.label.toLowerCase() === "semester"
  );
  const otherItems = feeItems.filter(
    (item) => item.label.toLowerCase() !== "semester"
  );

  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(180deg, #EDDBFF 0%, #FFE6CE 100%)",
        borderRadius: "36px",
        padding: theme.spacing(10, 12),
        border: "1px solid #7B2CBF",
        position: "relative",
        width: "100%",
        ...props.sx,
      }}
    >
      {/* Status Badge */}
      <Box
        sx={{
          position: "absolute",
          top: -12,
          left: theme.spacing(10),
          backgroundColor: theme.palette.common.white,
          color: statusColor,
          padding: theme.spacing(0.5, 1.5),
          borderRadius: theme.spacing(3),
          border: `1px solid ${statusColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "124px",
          gap: theme.spacing(0.5),
          zIndex: 1,
        }}
      >
        <Box sx={{ fontSize: "0.875rem" }}>{statusIcons[status]}</Box>
        <Typography
          variant="body2"
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            fontSize: "0.75rem",
          }}
        >
          {status}
        </Typography>
      </Box>

      {/* Column 1: Semester + Icon */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: theme.spacing(3),
          minWidth: "200px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="69"
          height="69"
          viewBox="0 0 69 69"
          fill="none"
        >
          <circle
            cx="34.5"
            cy="34.5"
            r="34"
            fill="url(#paint0_linear_705_5772)"
            stroke="url(#paint1_linear_705_5772)"
          />
          <path
            d="M55.8681 28.4038L35.1036 17.3881C34.9033 17.282 34.6799 17.2266 34.453 17.2266C34.2261 17.2266 34.0027 17.282 33.8024 17.3881L13.0379 28.4038C12.8165 28.5212 12.6312 28.6963 12.5021 28.9103C12.3729 29.1243 12.3047 29.3693 12.3047 29.6189C12.3047 29.8686 12.3729 30.1135 12.5021 30.3275C12.6312 30.5416 12.8165 30.7167 13.0379 30.8341L17.8414 33.3832V41.7172C17.84 42.3935 18.0903 43.0465 18.544 43.5502C20.8108 46.0615 25.8894 50.2732 34.453 50.2732C37.2925 50.2966 40.1107 49.785 42.7588 48.7655V54.4041C42.7588 54.7693 42.9046 55.1195 43.1642 55.3777C43.4238 55.636 43.7759 55.781 44.1431 55.781C44.5102 55.781 44.8623 55.636 45.1219 55.3777C45.3815 55.1195 45.5274 54.7693 45.5274 54.4041V47.435C47.3325 46.3985 48.9637 45.0877 50.362 43.5502C50.8158 43.0465 51.066 42.3935 51.0646 41.7172V33.3832L55.8681 30.8341C56.0896 30.7167 56.2748 30.5416 56.4039 30.3275C56.5331 30.1135 56.6013 29.8686 56.6013 29.6189C56.6013 29.3693 56.5331 29.1243 56.4039 28.9103C56.2748 28.6963 56.0896 28.5212 55.8681 28.4038ZM34.453 47.5193C26.9657 47.5193 22.5619 43.8807 20.61 41.7172V34.8513L33.8024 41.8497C34.0027 41.9558 34.2261 42.0113 34.453 42.0113C34.6799 42.0113 34.9033 41.9558 35.1036 41.8497L42.7588 37.7894V45.7654C40.5785 46.7775 37.8307 47.5193 34.453 47.5193ZM48.296 41.7103C47.4662 42.6262 46.5377 43.4487 45.5274 44.163V36.3195L48.296 34.8513V41.7103ZM44.8352 33.5673L44.7972 33.545L35.1071 28.4038C34.7838 28.2395 34.4086 28.2081 34.0622 28.3164C33.7159 28.4247 33.4262 28.664 33.2556 28.9827C33.0849 29.3015 33.047 29.6741 33.1499 30.0204C33.2528 30.3667 33.4884 30.6589 33.8058 30.8341L41.8936 35.1267L34.453 39.0734L16.6302 29.6189L34.453 20.1644L52.2758 29.6189L44.8352 33.5673Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_705_5772"
              x1="81"
              y1="61.5"
              x2="-4.5"
              y2="4.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#F9F2FF" />
              <stop offset="1" stop-color="#7410CA" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_705_5772"
              x1="12"
              y1="9"
              x2="55.5"
              y2="60"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#55118F" />
              <stop offset="1" stop-color="white" />
            </linearGradient>
          </defs>
        </svg>
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            {semesterItem?.label || "Semester"}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#1E1E1E",
              fontWeight: "600",
              fontSize: "26px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "33px",
            }}
          >
            {semesterItem?.value || "Semester 1 Fees"}
          </Typography>
        </Box>
      </Box>

      {/* Individual columns for each otherItem */}
      {otherItems.map((item, index) => (
        <Box
          key={`${item.label}-${index}`}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "left",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            {item.label}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "500",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "#1E1E1E",
              fontSize: "20px",
            }}
          >
            {item.value}
          </Typography>
        </Box>
      ))}

      {/* Pay Now Button */}
      <Box>
        <Button
          variant="contained"
          onClick={onPayNow}
          sx={{
            minWidth: "250px",
          }}
        >
          Pay Now
        </Button>
      </Box>
    </Box>
  );
};

export default FeeStatusList;
