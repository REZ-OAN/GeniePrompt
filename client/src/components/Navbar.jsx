import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Navbar = () => {
    const navigate = useNavigate();
    const loggedIn = JSON.parse(localStorage.getItem("authToken"));
    const handleLogout = async () => {
        try {
            localStorage.removeItem("authToken");
            await axios.post("/api/v1/auth/logout");
            toast.success("logout successfull");
            navigate("/login");
        } catch (err) {}
    };
    return (
        <Box
            width={"100%"}
            p="1rem 6%"
            textAlign={"center"}
            sx={{
                boxShadow: 3,
                mb: 5,
                background: `linear-gradient(to  bottom,#1877f2, #42a5f5)`,
                color: "white",
            }}
        >
            <Typography
                sx={{
                    fontSize: "80px",
                    mb: 2,
                }}
                color={"white"}
                fontWeight="bold"
            >
                GeniePrompt
            </Typography>
            {loggedIn ? (
                ""
            ) : (
                <Link
                    to="/register"
                    style={{
                        color: "white",
                        textDecoration: "none",
                        padding: "8px 12px",
                        margin: "0px 15px",
                        borderRadius: "4px",
                        background: "green",
                        "&:hover": {
                            background: "darkgreen",
                        },
                    }}
                >
                    Sign Up
                </Link>
            )}
            {loggedIn ? (
                ""
            ) : (
                <Link
                    to="/login"
                    style={{
                        color: "white",
                        textDecoration: "none",
                        padding: "8px 12px",
                        margin: "0px 15px",
                        borderRadius: "4px",
                        background: "green",
                        "&:hover": {
                            background: "darkgreen",
                        },
                    }}
                >
                    Sign In
                </Link>
            )}
            {loggedIn ? (
                <Link
                    to="/login"
                    onClick={handleLogout}
                    style={{
                        color: "white",
                        textDecoration: "none",
                        padding: "8px 12px",
                        margin: "0px 15px",
                        borderRadius: "4px",
                        background: "green",
                        "&:hover": {
                            background: "darkgreen",
                        },
                    }}
                >
                    Logout
                </Link>
            ) : (
                ""
            )}
        </Box>
    );
};

export default Navbar;
