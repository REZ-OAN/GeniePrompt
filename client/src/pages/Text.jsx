import React, { useEffect, useState } from "react";
import { Card, Typography, Collapse, Alert } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Fetcher from "../utils/fetcher";
const Text = ({ generated, text, link }) => {
    const [prompt, setPrompt] = useState(text);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (generated) {
            setLoading(true);
            setPrompt("");
        }

        const fetcher = async () => {
            try {
                const { data, error: err } = await Fetcher(generated, link);
                setPrompt(data);
                setError(err);
                setLoading(false);
            } catch (err) {
                setPrompt(text);
                setLoading(false);
                if (err.response.data.error) {
                    setError(err.response.data.error);
                } else if (err.message) {
                    setError(err.message);
                }
            }
        };
        if (generated) {
            fetcher();
        }
    }, [generated, text, link]);
    return (
        <>
            <Collapse in={error ? true : false}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                    {(() => {
                        setTimeout(() => {
                            setError("");
                        }, 3000);
                        setPrompt(text);
                        generated = "";
                    })()}
                </Alert>
            </Collapse>
            <Card
                sx={{
                    mt: 4,
                    border: 1,
                    boxShadow: 0,
                    height: "500px",
                    borderRadius: 5,
                    borderColor: "green",
                    bgcolor: "white",
                }}
            >
                <Typography p={2} sx={{ color: "black", fontSize: "20px" }}>
                    {loading === true ? (
                        <Card>
                            <CardContent
                                style={{
                                    minHeight: "500px",
                                    position: "relative",
                                }}
                            >
                                <CircularProgress
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                    }}
                                />
                            </CardContent>
                        </Card>
                    ) : (
                        prompt
                    )}
                </Typography>
            </Card>
        </>
    );
};

export default Text;
