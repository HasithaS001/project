import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// console.log(API_KEY);

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const SummarizerTool = () => {
  const [enteredText, setEnteredText] = useState("");
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [resultText, setResultText] = useState("");

  const analyzeText = async () => {
    try {
      setLoading(true);
      const prompt = `Summarize the following text by extracting key points and provide them as separate bullet points, one after the other, separating with <br/> tage and each starting with a bullet symbol (•). Each bullet point should be on a new line. Keep the summary concise, clear, and coherent. Only output the bullet points without any extra explanation: "${enteredText}"`

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setResultText(text);
    } catch (error) {
      console.log("Error in content generation", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Container
        className="max-lg:flex-col"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mt: 5,
        }}
      >
        <Box sx={{ flex: 1, mr: 2, width: "100%" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Input
          </Typography>
          <TextField
            placeholder="Enter the text you want to summarize"
            multiline
            rows={14}
            fullWidth
            variant="outlined"
            value={enteredText}
            onChange={(e) => setEnteredText(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => analyzeText()}
            sx={{ mt: 2 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-x-1.5">
                  Processing <CircularProgress size={20} />
                </div>
              ) : (
                "Process Text"
              )}
            </Box>
          </Button>
        </Box>

        <Box sx={{ flex: 1, width: "100%" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Output
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              height: "400px",
              display: "flex",
              flexDirection: "column",
              p: 3,
            }}
          >
            <Box sx={{ flex: 1, overflowY: "auto" }}>
              {resultText && (
                <Typography
                  variant="body1"
                  sx={{ display: "block" }}
                  dangerouslySetInnerHTML={{ __html: resultText }}
                />
              )}
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default SummarizerTool;
