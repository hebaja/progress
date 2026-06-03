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

function generateTicks() {
  const ticks = [];
  for (let v = STEP; v <= TOTAL; v += STEP) {
    ticks.push(v);
  }
  return ticks;
}

const TICKS = generateTicks();

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

        <Box sx={{ position: "relative", height: 80, mt: 2, mx: 2, width: "50%" }}>
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

          {TICKS.map((tick) => (
            <Box
              key={tick}
              sx={{
                position: "absolute",
                top: "50%",
                left: `${(tick / TOTAL) * 100}%`,
                width: 2,
                height: 12,
                bgcolor: tick <= progressValue ? "gold" : "grey.400",
                transform: "translate(-50%, -50%)",
                borderRadius: 1,
              }}
            />
          ))}

          {NODES.map((node) => {
            const isCompleted = node <= progressValue;
            return (
              <Box
                key={node}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: `${(node / TOTAL) * 100}%`,
                  transform: "translate(-50%, -50%)",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: isCompleted ? "gold" : "background.paper",
                  border: (theme) =>
                    `2px solid ${isCompleted ? "gold" : theme.palette.grey[400]}`,
                  color: isCompleted ? "common.white" : "grey.500",
                  fontSize: 12,
                  fontWeight: "bold",
                  zIndex: 1,
                  transition: "all 0.2s",
                }}
              >
                {node}
              </Box>
            );
          })}
        </Box>

        <Slider
          value={progressValue}
          onChange={(_, value) => setProgressValue(value)}
          min={0}
          max={TOTAL}
          step={STEP}
          marks={NODES.map((v) => ({ value: v, label: String(v) }))}
          sx={{ mt: 6, mx: 2 }}
        />

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
