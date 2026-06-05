import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Slider,
  Box,
  Divider,
} from "@mui/material";

const theme = createTheme();

const NODES = [1, 2, 3, 4, 5];
const TOTAL = 5;
const STEP = 0.25;

export default function App() {
  const [progressValue, setProgressValue] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MUI Playground
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Linear Progression
        </Typography>

        <Typography variant="subtitle1" sx={{ mt: 4 }}>Custom Box Implementation</Typography>

        <Box sx={{ position: "relative", height: 80, mt: 2, mx: 2, width: "30%" }}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 4,
              bgcolor: "grey.300",
              transform: "translateY(-50%)",
              borderRadius: 2,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: `${(progressValue / TOTAL) * 100}%`,
              height: 4,
              bgcolor: "gold",
              transform: "translateY(-50%)",
              borderRadius: 2,
              transition: "width 0.2s",
            }}
          />

          <Box
            sx={{
              "@keyframes pop": {
                "0%": { transform: "translate(-50%, -50%) scale(1)" },
                "50%": { transform: "translate(-50%, -50%) scale(1.6)" },
                "100%": { transform: "translate(-50%, -50%) scale(1)" },
              },
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translate(-50%, -50%)",
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: progressValue > 0 ? "gold" : "grey.400",
              zIndex: 1,
              transition: "all 0.2s",
              animation: progressValue > 0 ? "pop 0.3s ease" : "none",
            }}
          />

          {NODES.map((node) => {
            const isCompleted = node <= progressValue;
            return (
              <Box
                key={node}
                sx={{
                  "@keyframes pop": {
                    "0%": { transform: "translate(-50%, -50%) scale(1)" },
                    "50%": { transform: "translate(-50%, -50%) scale(1.4)" },
                    "100%": { transform: "translate(-50%, -50%) scale(1)" },
                  },
                  position: "absolute",
                  top: "50%",
                  left: `${(node / TOTAL) * 100}%`,
                  transform: "translate(-50%, -50%)",
                  fontSize: 28,
                  color: isCompleted ? "gold" : "grey.400",
                  WebkitTextStroke: isCompleted ? "1px grey" : "none",
                  paintOrder: "stroke fill",
                  zIndex: 1,
                  transition: "all 0.2s",
                  animation: isCompleted ? "pop 0.3s ease" : "none",
                  lineHeight: 1,
                }}
              >
                {"★"}
              </Box>
            );
          })}
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="subtitle1">Slider-only Implementation</Typography>

        <Slider
          value={progressValue}
          onChange={(_, value) => setProgressValue(value)}
          min={0}
          max={TOTAL}
          step={STEP}
          marks={Array.from({ length: (TOTAL / STEP) }, (_, i) => {
            const value = STEP + i * STEP;
            const isWhole = Number.isInteger(value);
            return { value, label: isWhole ? String(value) : "" };
          })}
          sx={{ mt: 2, mx: 2 }}
        />
      </Container>
    </ThemeProvider>
  );
}
