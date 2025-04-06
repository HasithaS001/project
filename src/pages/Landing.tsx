import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Paper,
  useTheme,
} from "@mui/material";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import {
  Spellcheck,
  AutoAwesome,
  Summarize,
  Translate,
  Psychology,
  Speed,
  TouchApp,
  Savings,
  Cloud,
  Security,
  Language,
  CheckCircle,
  Cancel,
  Style,
  Star,
} from "@mui/icons-material";

const FeatureCard = ({
  icon: Icon,
  title,
  path,
  description,
}: {
  icon: any;
  title: string;
  path: string;
  description: string;
}) => {
  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        onClick={() => navigate(`${path}`)}
      >
        <Icon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
        <Typography variant="h5" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Paper>
  );
};

const PricingCard = ({
  title,
  price,
  period,
  features,
  isPopular,
  ctaText,
}: {
  title: string;
  price: string;
  period: string;
  features: { text: string; included: boolean }[];
  isPopular?: boolean;
  ctaText: string;
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        height: "100%",
        position: "relative",
        transition: "all 0.3s ease-in-out",
        border: isPopular ? `2px solid ${theme.palette.primary.main}` : "none",
        borderRadius: "24px",
        background: isPopular
          ? "linear-gradient(145deg, #ffffff 0%, #f8faff 100%)"
          : "#ffffff",
        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: "0 20px 40px rgba(0, 100, 191, 0.12)",
        },
      }}
    >
      {isPopular && (
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            bgcolor: "primary.main",
            color: "white",
            px: 2,
            py: 0.5,
            borderRadius: "16px",
            fontSize: "0.875rem",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0, 100, 191, 0.15)",
          }}
        >
          Most Popular
        </Box>
      )}
      <Typography
        variant="h5"
        component="h3"
        fontWeight="bold"
        gutterBottom
        sx={{
          fontSize: "1.0rem",
          background: isPopular
            ? "linear-gradient(45deg, #0064bf, #0091ff)"
            : "inherit",
          backgroundClip: isPopular ? "text" : "inherit",
          WebkitBackgroundClip: isPopular ? "text" : "inherit",
          WebkitTextFillColor: isPopular ? "transparent" : "inherit",
        }}
      >
        {title}
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h3"
          component="span"
          fontWeight="bold"
          sx={{
            fontSize: "1rem",
            background: isPopular
              ? "linear-gradient(45deg, #0064bf, #0091ff)"
              : "inherit",
            backgroundClip: isPopular ? "text" : "inherit",
            WebkitBackgroundClip: isPopular ? "text" : "inherit",
            WebkitTextFillColor: isPopular ? "transparent" : "inherit",
          }}
        >
          {price}
        </Typography>
        <Typography variant="h6" component="span" color="text.secondary">
          {period}
        </Typography>
      </Box>
      <Box sx={{ mb: 4 }}>
        {features.map((feature, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1.5,
              color: feature.included ? "text.primary" : "text.disabled",
            }}
          >
            {feature.included ? (
              <CheckCircle
                sx={{ mr: 1.5, color: "#0064bf", fontSize: "1.2rem" }}
              />
            ) : (
              <Cancel
                sx={{ mr: 1.5, color: "text.disabled", fontSize: "1.2rem" }}
              />
            )}
            <Typography
              variant="body1"
              sx={{
                fontSize: "0.95rem",
                fontWeight: feature.included ? 500 : 400,
              }}
            >
              {feature.text}
            </Typography>
          </Box>
        ))}
      </Box>
      <Button
        variant={isPopular ? "contained" : "outlined"}
        fullWidth
        size="large"
        sx={{
          mt: "auto",
          py: 1.5,
          borderRadius: "50px",
          textTransform: "none",
          fontSize: "1.1rem",
          fontWeight: 600,
          background: isPopular
            ? "linear-gradient(45deg, #0064bf, #0091ff)"
            : "transparent",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: isPopular
              ? "0 8px 20px rgba(0, 100, 191, 0.25)"
              : "none",
            background: isPopular
              ? "linear-gradient(45deg, #0064bf, #0091ff)"
              : "transparent",
          },
        }}
      >
        {ctaText}
      </Button>
    </Paper>
  );
};

const Landing = () => {
  const features = [
    {
      icon: Spellcheck,
      title: "Grammar Checker",
      path: "/tools/grammar",
      description:
        "Perfect your writing with advanced grammar and spelling corrections.",
    },
    {
      icon: AutoAwesome,
      title: "Paraphraser",
      path: "/tools/paraphrase",
      description:
        "Rewrite your content while maintaining its original meaning.",
    },
    {
      icon: Style,
      title: "Tone Converter",
      path: "/tools/tone",
      description:
        "Analyze and adjust your writing tone to match any context perfectly.",
    },
    {
      icon: Summarize,
      title: "Summarizer",
      path: "/tools/summarize",
      description: "Create concise summaries of long texts automatically.",
    },
    {
      icon: Translate,
      title: "Translator",
      path: "/tools/translate",
      description: "Translate your text into multiple languages accurately.",
    },
    {
      icon: Psychology,
      title: "AI Humanizer",
      path: "/tools/humanize",
      description:
        "Transform AI text into natural, human-like content with emotional depth.",
    },
    {
      icon: Psychology,
      title: "AI Detector",
      path: "/tools/ai-content-detector",
      description:
        "Instantly detect AI-generated content with high accuracy and detailed analysis.",
    },
    {
      icon: Speed,
      title: "Readability Checker",
      path: "/tools/grammar",
      description:
        "Analyze and improve your text for better clarity, engagement, and comprehension.",
    },
  ];

  return (
    <>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <Container maxWidth="lg" sx={{ pt: 10 }}>
          {/* Hero Section */}
          <Box
            sx={{
              pt: 12,
              pb: 6,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: "linear-gradient(45deg, #2196F3 30%, #673AB7 90%)",
                backgroundClip: "text",
                textFillColor: "transparent",
                mb: 4,
              }}
            >
              Transform Your Writing with AI
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              paragraph
              sx={{ mb: 6 }}
            >
              🚀 Your Ultimate Writing Companion – Whether you're a student 📚,
              professional 💼, or content creator 📝, our AI-powered tools help
              you craft flawless, engaging, and original content in seconds. Say
              goodbye to grammar mistakes 🙅‍♀️, AI-detection issues 🤖, and
              plagiarism 🚫—our writing assistant has you covered! ✨
            </Typography>
            <Button
              component={RouterLink}
              to="/tools/grammar"
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "50px",
                textTransform: "none",
                fontSize: "1.1rem",
                fontWeight: 600,
                boxShadow: "0 4px 14px rgba(0, 100, 191, 0.25)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(0, 100, 191, 0.35)",
                },
              }}
            >
              Get Started 🌟
            </Button>

            {/* Social Proof Section */}
            <Box
              sx={{
                mt: 8,
                mb: 6,
                py: 4,
                borderTop: "1px solid",
                borderBottom: "1px solid",
                borderColor: "divider",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-around",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ fontWeight: 700, mb: 1 }}
                >
                  50K+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Active Users
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ fontWeight: 700, mb: 1 }}
                >
                  4.9/5
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Average Rating
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ fontWeight: 700, mb: 1 }}
                >
                  1M+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Documents Enhanced
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ fontWeight: 700, mb: 1 }}
                >
                  150+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Countries Served
                </Typography>
              </Box>
            </Box>

            {/* Trusted By Section */}
            <Box sx={{ mt: 4, mb: 8 }}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Trusted by leading companies
              </Typography>
              <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
              >
                {["Microsoft", "Adobe", "IBM", "Oracle", "Intel"].map(
                  (company) => (
                    <Grid item key={company}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "text.secondary",
                          fontWeight: 500,
                          opacity: 0.7,
                          letterSpacing: 1,
                        }}
                      >
                        {company}
                      </Typography>
                    </Grid>
                  )
                )}
              </Grid>
            </Box>
          </Box>

          {/* Illustration Section */}
          <Box
            sx={{
              py: 12,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: { xs: 6, md: 12 },
              justifyContent: "space-between",
            }}
          >
            {/* Left side content */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h3"
                component="h2"
                fontWeight="bold"
                color="#0064bf"
                sx={{ mb: 3 }}
              >
                Better Writing, Every Time
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 4, lineHeight: 1.6 }}
              >
                Make your words clear, engaging, and professional. Our tools
                help improve your writing while keeping your ideas original.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {[
                  { text: "Set the Right Tone", icon: "🎯" },
                  { text: "Make Sentences Smoother", icon: "✨" },
                  { text: "Sound More Professional", icon: "📝" },
                  { text: "Summarize Easily", icon: "📋" },
                ].map((feature, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      bgcolor: "background.paper",
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "translateX(8px)",
                        bgcolor: "rgba(146, 52, 234, 0.04)",
                      },
                    }}
                  >
                    <Typography variant="h6" component="span">
                      {feature.icon}
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {feature.text}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>

            {/* Right side illustration */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Chat bubble */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  position: "absolute",
                  top: "10%",
                  right: "5%",
                  maxWidth: 300,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  zIndex: 1,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Premium
                </Typography>
                <Typography variant="subtitle1" fontWeight={500}>
                  Together we will make this work.
                </Typography>
              </Paper>

              {/* Robot SVG */}
              <Box
                component="img"
                src="/robot-writer.svg"
                alt="AI Writing Assistant"
                sx={{
                  width: "100%",
                  height: "auto",
                  maxWidth: 400,
                  display: "block",
                  margin: "0 auto",
                  position: "relative",
                  zIndex: 1,
                  borderRadius: 4,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                  transform: "perspective(1000px) rotateY(-5deg)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "perspective(1000px) rotateY(0deg)",
                  },
                }}
              />
            </Box>
          </Box>

          {/* Why Choose Us Section */}
          <Box sx={{ py: 8 }}>
            <Typography
              variant="h4"
              component="h2"
              textAlign="center"
              fontWeight="bold"
              sx={{ mb: 6 }}
              color="#0064bf"
            >
              Why Choose writeai?
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 4,
              }}
            >
              {[
                {
                  title: "AI-Powered Accuracy",
                  description: "Lightning-fast corrections and enhancements.",
                  icon: Speed,
                },
                {
                  title: "User-Friendly",
                  description:
                    "No technical skills required—just type, edit, and refine!",
                  icon: TouchApp,
                },
                {
                  title: "Affordable & Flexible",
                  description: "Get premium features at the best price.",
                  icon: Savings,
                },
                {
                  title: "Cloud-Based",
                  description: "Access anywhere, anytime, on any device.",
                  icon: Cloud,
                },
                {
                  title: "Privacy-Focused",
                  description: "Your data is 100% safe and secure.",
                  icon: Security,
                },
                {
                  title: "No Language Barrier",
                  description:
                    "Support for multiple languages to help you communicate globally.",
                  icon: Language,
                },
              ].map((item, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 3,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    transition:
                      "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: "white",
                      fontSize: "1.5rem",
                    }}
                  >
                    <item.icon />
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>

          {/* Features Grid */}
          <Grid container spacing={4} sx={{ py: 8 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FeatureCard {...feature} path={feature.path} />
              </Grid>
            ))}
          </Grid>
          {/* Fun Facts Section */}
          <Box sx={{ py: 12, bgcolor: "background.default" }}>
            <Container maxWidth="lg">
              <Grid container spacing={6} alignItems="center">
                {/* Left Column - Content */}
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography
                      variant="h3"
                      component="h2"
                      fontWeight="bold"
                      sx={{
                        mb: 3,
                        background:
                          "linear-gradient(45deg, #0064bf 30%, #0091ff 90%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Did You Know?
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        mb: 4,
                        fontWeight: 600,
                        lineHeight: 1.4,
                      }}
                    >
                      AI Writing Saves 50% of Editing Time
                    </Typography>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ mb: 4, lineHeight: 1.8 }}
                    >
                      Writers and bloggers save hours using AI-powered tools.
                      Our advanced AI technology streamlines your writing
                      process, letting you focus on what matters most - creating
                      great content.
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 3,
                        flexWrap: "wrap",
                      }}
                    >
                      {[
                        { stat: "50%", label: "Time Saved" },
                        { stat: "2x", label: "Productivity" },
                        { stat: "24/7", label: "AI Support" },
                      ].map((item, index) => (
                        <Paper
                          key={index}
                          elevation={0}
                          sx={{
                            p: 2,
                            textAlign: "center",
                            minWidth: 120,
                            bgcolor: "rgba(0, 100, 191, 0.04)",
                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              fontWeight: 700,
                              color: "primary.main",
                              mb: 1,
                            }}
                          >
                            {item.stat}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.label}
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  </Box>
                </Grid>
                {/* Right Column - Illustration */}
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: -20,
                        right: -20,
                        bottom: -20,
                        left: -20,
                        background:
                          "radial-gradient(circle, rgba(0, 100, 191, 0.04) 0%, rgba(0, 100, 191, 0) 70%)",
                        borderRadius: "50%",
                        zIndex: 0,
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/time-saving.jpg"
                      alt="Time Saving Illustration"
                      sx={{
                        width: "100%",
                        height: "auto",
                        maxWidth: 500,
                        display: "block",
                        margin: "0 auto",
                        position: "relative",
                        zIndex: 1,
                        borderRadius: 4,
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                        transform: "perspective(1000px) rotateY(-5deg)",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "perspective(1000px) rotateY(0deg)",
                        },
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Testimonials Section */}
          <Box sx={{ py: 12, bgcolor: "background.paper" }}>
            <Container maxWidth="lg">
              <Typography
                variant="h4"
                component="h2"
                textAlign="center"
                fontWeight="bold"
                color="#0064bf"
                sx={{ mb: 2 }}
              >
                ⭐ What Our Users Say
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="text.secondary"
                sx={{ mb: 8 }}
              >
                Join thousands of satisfied writers who've transformed their
                content
              </Typography>

              <Grid container spacing={4}>
                {[
                  {
                    name: "Sarah Johnson",
                    role: "Content Creator",
                    image: "/images/testimonial-1.jpg",
                    rating: 5,
                    quote:
                      "WriteAI has completely transformed my content creation process. The AI tools are incredibly accurate and save me hours of editing time!",
                  },
                  {
                    name: "Michael Chen",
                    role: "Marketing Director",
                    image: "/images/testimonial-2.jpg",
                    rating: 5,
                    quote:
                      "The AI detection and humanizing features are game-changers. Our content now perfectly balances automation with authenticity.",
                  },
                  {
                    name: "Emily Rodriguez",
                    role: "Freelance Writer",
                    image: "/images/testimonial-3.jpg",
                    rating: 5,
                    quote:
                      "As a non-native English speaker, WriteAI helps me write with confidence. The grammar checker and tone adjustments are invaluable.",
                  },
                ].map((testimonial, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        height: "100%",
                        position: "relative",
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: "divider",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 20px 40px rgba(0, 100, 191, 0.12)",
                          borderColor: "primary.main",
                        },
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 3 }}
                      >
                        <Box
                          component="img"
                          src={testimonial.image}
                          alt={testimonial.name}
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            mr: 2,
                            objectFit: "cover",
                          }}
                        />
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", mb: 2 }}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            sx={{ color: "#FFD700", fontSize: "1.2rem" }}
                          />
                        ))}
                      </Box>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          fontStyle: "italic",
                          lineHeight: 1.6,
                        }}
                      >
                        "{testimonial.quote}"
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          {/* Pricing Section */}
          <Box sx={{ py: 12, px: 4, bgcolor: "background.default" }}>
            <Container>
              <Typography
                variant="h4"
                component="h4"
                align="center"
                fontWeight="bold"
                color="#0064bf"
                sx={{ mb: 2 }}
              >
                💰 Choose Your Perfect Plan
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                AI-powered writing made simple. Pick a plan that fits your
                needs!
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                  mb: 6,
                }}
              >
                🔥 Limited-Time Offer: Get 20% Off on Annual Plans!
              </Typography>

              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={10} md={6} lg={5}>
                  <PricingCard
                    title="🚀 Free Plan"
                    price="$0"
                    period="/mo"
                    features={[
                      {
                        text: "5 AI Writing Generations per Day",
                        included: true,
                      },
                      { text: "Basic Grammar & Spell Checker", included: true },
                      { text: "Basic Paraphraser (Limited)", included: true },
                      { text: "AI Summarizer (Limited)", included: true },
                      { text: "Tone Detector (Basic)", included: true },
                      { text: "Plagiarism Checker", included: false },
                      { text: "AI Humanizer", included: false },
                    ]}
                    ctaText="Get Started Free"
                  />
                </Grid>
                <Grid item xs={12} sm={10} md={6} lg={5}>
                  <PricingCard
                    title="⭐ Pro Plan"
                    price="$19"
                    period="/mo"
                    isPopular={true}
                    features={[
                      { text: "Unlimited AI Writing", included: true },
                      {
                        text: "Advanced Grammar & Spell Checker",
                        included: true,
                      },
                      {
                        text: "Paraphraser (5+ Writing Styles)",
                        included: true,
                      },
                      { text: "AI Summarizer (Full-Length)", included: true },
                      {
                        text: "Tone Detector & Converter (All Tones)",
                        included: true,
                      },
                      {
                        text: "AI Humanizer (Bypass AI Detection)",
                        included: true,
                      },
                      {
                        text: "Plagiarism Checker (10 Scans/Month)",
                        included: true,
                      },
                      {
                        text: "SEO & Readability Score Checker",
                        included: true,
                      },
                      { text: "AI Translator (20+ Languages)", included: true },
                    ]}
                    ctaText="Start Writing Now"
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* FAQ Section */}
          <Box
            sx={{
              py: 12,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,255,0.95) 100%)",
              borderRadius: "40px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Container maxWidth="lg">
              <Box
                sx={{
                  position: "absolute",
                  top: -100,
                  left: -100,
                  width: 200,
                  height: 200,
                  background:
                    "radial-gradient(circle, rgba(103,58,183,0.1) 0%, rgba(103,58,183,0) 70%)",
                  borderRadius: "50%",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -50,
                  right: -50,
                  width: 150,
                  height: 150,
                  background:
                    "radial-gradient(circle, rgba(33,150,243,0.1) 0%, rgba(33,150,243,0) 70%)",
                  borderRadius: "50%",
                }}
              />
              <Typography
                variant="h3"
                component="h2"
                textAlign="center"
                fontWeight="bold"
                sx={{
                  mb: 3,
                  background:
                    "linear-gradient(45deg, #0064bf 30%, #673AB7 90%)",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Frequently Asked Questions
              </Typography>
              <Typography
                variant="h6"
                textAlign="center"
                color="text.secondary"
                sx={{ mb: 8, maxWidth: "800px", mx: "auto" }}
              >
                Got questions? We've got answers! Here's everything you need to
                know about our AI writing assistant.
              </Typography>
              <FAQ
                questions={[
                  {
                    question: "What is your AI Writing Assistant?",
                    answer:
                      "Our AI Writing Assistant is a powerful tool that helps you write, edit, and improve content effortlessly. It includes features like grammar checking, paraphrasing, summarizing, AI humanizing, plagiarism detection, translation, and more.",
                  },
                  {
                    question: "Is this tool free to use?",
                    answer:
                      "Yes! We offer a Free Plan with basic features. For advanced tools like AI Humanizer, Plagiarism Checker, and Unlimited Writing, you can upgrade to a Pro or Business Plan.",
                  },
                  {
                    question: "Can I use this tool for academic writing?",
                    answer:
                      "Absolutely! Our AI Writing Assistant can help with essays, research papers, and academic reports while maintaining originality and clarity.",
                  },
                  {
                    question: "Is my data safe with your AI tool?",
                    answer:
                      "Yes! We prioritize user privacy and never store or share your content. Your writing is processed securely and remains confidential.",
                  },
                  {
                    question: "What languages does your AI Translator support?",
                    answer:
                      "Our AI Translator supports 20+ languages, helping you translate and refine content with ease.",
                  },
                ]}
              />
            </Container>
          </Box>

          {/* Call to Action Section */}
          <Box
            sx={{
              py: 10,
              textAlign: "center",
              background:
                "linear-gradient(135deg, rgba(146, 52, 234, 0.05) 0%, rgba(33, 150, 243, 0.05) 100%)",
              borderRadius: 4,
              my: 8,
              px: 4,
            }}
          >
            <Typography
              variant="h4"
              component="h4"
              fontWeight="bold"
              sx={{
                mb: 3,
                background: "linear-gradient(45deg, #0064bf, #0091ff)",
                backgroundClip: "text",
                textFillColor: "transparent",
              }}
            >
              🔥 Get Started for FREE!
            </Typography>

            <Box sx={{ maxWidth: "md", mx: "auto", mb: 6 }}>
              {[
                "Sign up now and try all features for FREE—No credit card required! 🎁",
                "Limited-Time Offer: Get 20% OFF on Premium Plans! 🕒",
                "Experience the power of AI-driven writing today! 💻",
              ].map((text, index) => (
                <Typography
                  key={index}
                  variant="h6"
                  sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    color: "text.secondary",
                  }}
                >
                  <Box component="span" sx={{ color: "#2196F3" }}>
                    🔹
                  </Box>
                  {text}
                </Typography>
              ))}
            </Box>

            <Button
              component={RouterLink}
              to="/tools/grammar"
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                px: 6,
                py: 1.5,
                borderRadius: "50px",
                textTransform: "none",
                fontSize: "1.1rem",
                fontWeight: 600,
                background: "linear-gradient(45deg, #9234EA 30%, #2196F3 90%)",
                boxShadow: "0 6px 12px rgba(146, 52, 234, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 16px rgba(146, 52, 234, 0.3)",
                },
              }}
              endIcon={
                <Box component="span" sx={{ ml: 1 }}>
                  🚀
                </Box>
              }
            >
              Start Writing Now 📝
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Landing;
