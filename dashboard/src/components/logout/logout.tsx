import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";

interface LogoutProps {
    style?: string;
}

export const Logout: React.FC<LogoutProps> = ({ style }) => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <button
            className={`${style} cursor-pointer`}
            type="button"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}
