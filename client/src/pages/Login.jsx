import React from "react";
import { useReducer } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Box,
    Typography,
    useMediaQuery,
    TextField,
    Button,
    Alert,
    Collapse,
} from "@mui/material";

const initialState = {
    email: "",
    password: "",
    error: "",
};
const reducer = (currentState, action) => {
    switch (action.type) {
        case "email":
            return {
                ...currentState,
                email: action.value,
            };
        case "password":
            return {
                ...currentState,
                password: action.value,
            };
        case "error":
            return {
                ...currentState,
                password: "",
                email: "",
                error: action.value,
            };
        default:
            return currentState;
    }
};
const Register = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(
                "https://genie-prompt.vercel.app/api/v1/auth/login",
                {
                    email: state.email,
                    password: state.password,
                }
            );
            if (data.token) {
                localStorage.setItem("authToken", true);
            }
            toast.success("User Login Successfull");
            navigate("/");
        } catch (err) {
            console.log(err);
            if (err.response.data.error) {
                dispatch({
                    type: "error",
                    value: err.response.data.error,
                });
            } else if (err.message) {
                dispatch({
                    type: "error",
                    value: err.message,
                });
            }
            setTimeout(() => {
                dispatch({
                    type: "error",
                    value: "",
                });
            }, 5000);
        }
    };
    const isNotMobile = useMediaQuery("(min-width:1000px)");
    return (
        <Box
            width={isNotMobile ? "40%" : "80%"}
            p={"2rem"}
            m={"2rem auto"}
            borderRadius={5}
            sx={{
                boxShadow: 5,
                background: `#42a5f5`,
            }}
        >
            <Collapse in={state.error ? true : false}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {state.error}
                </Alert>
            </Collapse>
            <form onSubmit={handleSubmit}>
                <Typography
                    textAlign={"center"}
                    sx={{
                        fontSize: "40px",
                        mb: 2,
                    }}
                    color={"white"}
                    fontWeight="bold"
                >
                    Sign In
                </Typography>
                <TextField
                    label="email"
                    type="email"
                    required
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    value={state.email}
                    onChange={(event) => {
                        dispatch({
                            type: "email",
                            value: event.target.value,
                        });
                    }}
                    InputLabelProps={{
                        style: { color: "white", fontSize: "20px" },
                    }}
                    InputProps={{
                        style: { color: "white", fontSize: "22px" },
                    }}
                />
                <TextField
                    label="password"
                    type="password"
                    required
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    value={state.password}
                    onChange={(event) => {
                        dispatch({
                            type: "password",
                            value: event.target.value,
                        });
                    }}
                    InputLabelProps={{
                        style: { color: "white", fontSize: "20px" },
                    }}
                    InputProps={{
                        style: { color: "white", fontSize: "22px" },
                    }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
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
                <Typography
                    sx={{
                        color: "white",
                        fontSize: "18px",
                        mt: 3,
                    }}
                >
                    Already have an account ?{" "}
                    <Link
                        to="/login"
                        style={{
                            color: "#1877f2",
                            textDecoration: "none",
                            fontSize: "18px",
                            "&:hover": {
                                color: "green",
                            },
                        }}
                    >
                        Please Sign Up
                    </Link>
                </Typography>
            </form>
        </Box>
    );
};

export default Register;
