import React, { useState } from "react";
import { Link } from "react-router-dom";
import Text from "./Text";
import {
    Box,
    Typography,
    useMediaQuery,
    TextField,
    Button,
} from "@mui/material";

const Summary = () => {
    //media
    const isNotMobile = useMediaQuery("(min-width: 1000px)");
    // states
    const [text, settext] = useState("");
    const [summary, setSummary] = useState("");
    //register ctrl
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSummary(text);
    };
    return (
        <Box
            width={isNotMobile ? "40%" : "80%"}
            p={"2rem"}
            m={"2rem auto"}
            borderRadius={5}
            sx={{
                boxShadow: 5,
                background: `linear-gradient(to  bottom,#1877f2, #42a5f5)`,
            }}
        >
            <form onSubmit={handleSubmit}>
                <Typography
                    variant="h3"
                    color="white"
                    sx={{
                        textTransform: "uppercase",

                        textAlign: "center",
                    }}
                >
                    Summarize Text
                </Typography>

                <TextField
                    placeholder="add your text"
                    type="text"
                    multiline={true}
                    required
                    margin="normal"
                    fullWidth
                    value={text}
                    onChange={(e) => {
                        settext(e.target.value);
                    }}
                    sx={{
                        bgcolor: "white",
                        borderRadius: 1,
                    }}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                        color: "white",
                        textDecoration: "none",
                        height: "50px",
                        fontSize: "25px",
                        mt: 2,
                        borderRadius: "4px",
                        background: "green",
                        "&:hover": {
                            background: "darkgreen",
                        },
                    }}
                >
                    Submit
                </Button>
                <Typography mt={2}>
                    not this tool ?{" "}
                    <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                            color: "white",
                        }}
                    >
                        GO BACK
                    </Link>
                </Typography>
            </form>

            <Text
                generated={summary}
                text={"Generated Summary Will Appear Here"}
                link={
                    "https://genie-prompt.vercel.app/api/v1/huggingface/summary"
                }
            />
        </Box>
    );
};

export default Summary;
