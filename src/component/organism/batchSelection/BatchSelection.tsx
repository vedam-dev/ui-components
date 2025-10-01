import React from "react";
import {
  Box,
  Typography,
  SxProps,
  Theme,
  styled,
  useTheme,
} from "@mui/material";

export interface BatchOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface BatchSelectionProps {
  value: string;
  onChange: (value: string) => void;
  options?: BatchOption[];
  sx?: SxProps<Theme>;
  disabled?: boolean;
}

const Outer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(11),
  borderRadius: theme.spacing(9),
  background: "#FFFFFF",
  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
  border: "none",
  width: "100%",
  minWidth: theme.spacing(300),
  boxSizing: "border-box",
}));

const Title = styled(Typography)({
  color: "#1F1F1F",
  fontFamily: "Poppins",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "normal",
});

const Subtitle = styled(Typography)({
  color: "#9CA3AF",
  fontFamily: "Poppins",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
});

const CardsRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(8.5),
  marginTop: theme.spacing(10),
  alignItems: "stretch",
}));

const Card = styled("button")<{
  selected?: boolean;
  disabled?: boolean;
}>(({ theme, selected, disabled }) => {
  const base: any = {
    display: "flex",
    gap: theme.spacing(4),
    alignItems: "center",
    flex: 1,
    minWidth: 0,
    padding: theme.spacing(6,5),
    borderRadius: theme.spacing(4),
    cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    transition: "all 200ms ease",
    textAlign: "left",
    outline: "none",
  };

  if (disabled) {
    base.opacity = 0.5;
  }

  base["&:hover"] = {
    transform: disabled ? "none" : "translateY(-1px)",
    boxShadow: disabled
      ? "0 1px 3px rgba(0,0,0,0.05)"
      : "0 4px 8px rgba(0,0,0,0.08)",
  };

  return base;
});

const Label = styled(Typography)({
  color: "#1E1E1E",
  fontFamily: "Outfit",
  fontSize: "22px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
});

const BatchSelection: React.FC<BatchSelectionProps> = ({
  value,
  onChange,
  options = [
    { value: "overall", label: "Overall" },
    { value: "batch1", label: "Batch 1" },
    { value: "batch2", label: "Batch 2" },
  ],
  sx,
  disabled = false,
}) => {
  const theme = useTheme();

  const handleClick = (opt: BatchOption) => {
    if (disabled || opt.disabled) return;
    onChange(opt.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent, opt: BatchOption) => {
    if (disabled || opt.disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(opt.value);
    }
  };

  return (
    <Outer sx={sx}>
      <Box display="flex" flexDirection="column">
        <Box
          display="flex"
          gap={2}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <div>
            <Title>Batch List</Title>
            <Subtitle>
              Choose a batch based on the semester you've chosen
            </Subtitle>
          </div>
        </Box>

        <CardsRow role="radiogroup" aria-label="Batch list">
          {options.map((opt, index) => {
            const isSelected = value === opt.value;
            const cardBackground =
              index % 2 === 0
                ? "linear-gradient(180deg, #FFF 0%, #FFF4DC 100%)"
                : "linear-gradient(180deg, #FFF 0%, #F6EDFF 100%)";
            const cardBorder =
              index % 2 === 0 ? "1px solid #FDE1AA" : "1px solid #E1BFFF";

            return (
              <Card
                key={opt.value}
                role="radio"
                aria-checked={isSelected}
                aria-disabled={disabled || opt.disabled}
                tabIndex={disabled || opt.disabled ? -1 : 0}
                selected={isSelected}
                disabled={disabled || opt.disabled}
                onClick={() => handleClick(opt)}
                onKeyDown={(e) => handleKeyDown(e, opt)}
                title={opt.label}
                style={{
                  background: cardBackground,
                  border: cardBorder,
                  maxWidth: theme.spacing(55),
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src="https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Logo.png"
                    alt="logo"
                    width="60px"
                    height="60px"
                    style={{ display: "block" }}
                  />
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  flex="1"
                  minWidth={0}
                >
                  <Label>{opt.label}</Label>
                </Box>
              </Card>
            );
          })}
        </CardsRow>
      </Box>
    </Outer>
  );
};

export default BatchSelection;