import { useDispatch } from "react-redux";
import type { Route } from "./+types/dashboard";
import { logout } from "~/redux/features/auth/authSlice";
import { CategoryAddForm } from "~/components/forms/categoryAddForm";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "PNG - Point Dashboard" },
        { name: "description", content: "Welcome to png point dashboard!" },
    ];
}

export default function Dashboard() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <section>
            <h2>Home</h2>
            <hr />
            <CategoryAddForm />
            <hr />
            <button className="cursor-pointer" type="button" onClick={handleLogout}>Logout</button>
        </section>
    );
}
