import React from "react";
import { Box, Typography, Card, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";

const Home = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box p={2}>
                <Typography variant="h4" mb={2} fontWeight="bold">
                    Text Generation
                </Typography>
                <Card
                    onClick={() => navigate("/summary")}
                    sx={{
                        boxShadow: 2,
                        borderRadius: 5,
                        height: 300,
                        width: 250,
                        "&:hover": {
                            border: 2,
                            boxShadow: 0,
                            borderColor: "primary.dark",
                            cursor: "pointer",
                        },
                    }}
                >
                    <DescriptionRounded
                        sx={{
                            fontSize: 80,
                            color: "primary.main",
                            mt: 4,
                            ml: 2,
                        }}
                    />
                    <Stack p={3} pt={0}>
                        <Typography fontWeight="bold" variant="h5">
                            TEXT SUMAMRY
                        </Typography>
                        <Typography variant="h6">
                            Summarize long text into short sentences
                        </Typography>
                    </Stack>
                </Card>
            </Box>
            <Box p={2}>
                <Typography variant="h4" mb={2} fontWeight="bold">
                    Prompt Generation
                </Typography>
                <Card
                    onClick={() => navigate("/promptgen")}
                    sx={{
                        boxShadow: 2,
                        borderRadius: 5,
                        height: 300,
                        width: 250,
                        "&:hover": {
                            border: 2,
                            boxShadow: 0,
                            borderColor: "primary.dark",
                            cursor: "pointer",
                        },
                    }}
                >
                    <DescriptionRounded
                        sx={{
                            fontSize: 80,
                            color: "primary.main",
                            mt: 4,
                            ml: 2,
                        }}
                    />
                    <Stack p={3} pt={0}>
                        <Typography fontWeight="bold" variant="h5">
                            EXQUISITELY PROMPT
                        </Typography>
                        <Typography variant="h6">
                            Generates A Prompt Based On Your Query
                        </Typography>
                    </Stack>
                </Card>
            </Box>
        </Box>
    );
};

export default Home;
