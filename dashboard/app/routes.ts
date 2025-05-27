import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "routes/privateRoute.tsx", [
        index("routes/dashboard.tsx"),
        route("/upload-images/", "routes/images.tsx"),
        route("/profile/", "routes/profile.tsx"),
        route("/chnage-password/", "routes/password_change.tsx"),
    ]),
    route("/login/", "routes/login.tsx"),
] satisfies RouteConfig;
