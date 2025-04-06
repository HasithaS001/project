import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
  TextField,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ToneConverterTool = () => {
  const [enteredText, setEnteredText] = useState("");
  const [selectedTone, setSelectedTone] = useState<keyof typeof toneDescriptions>("Formal");
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState("");

  const toneDescriptions = {
    Formal: "Professional, respectful, and polished for business or academic use",
    Casual: "Friendly, relaxed, and conversational for everyday writing",
    Persuasive: "Convincing and compelling for marketing and sales",
    Creative: "Unique and engaging for storytelling and content writing",
    Humorous: "Witty and lighthearted for fun and entertaining content",
    Academic: "Clear, structured, and research-oriented for scholarly writing",
    Authoritative: "Confident, strong, and commanding for leadership communication",
  };

  const analyzeText = async () => {
    try {
      setLoading(true);
      const prompt = `Convert the following text to a ${selectedTone} tone: "${enteredText}". Use HTML <b><u>...</u></b> tags to underline and bold any changes made.`;
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
            Choose Your Perfect Tone
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {Object.keys(toneDescriptions).map((tone) => (
              <Chip
                key={tone}
                label={tone}
                clickable
                color={selectedTone === tone ? "primary" : "default"}
                onClick={() => setSelectedTone(tone as keyof typeof toneDescriptions)}
              />
            ))}
          </Box>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {toneDescriptions[selectedTone]}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Input
          </Typography>
          <TextField
            placeholder="Enter the text you want to convert"
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
                "Convert Tone"
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

export default ToneConverterTool;
