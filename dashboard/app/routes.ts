import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "routes/privateRoute.tsx", [
        index("routes/dashboard.tsx"),
        route("/upload-images/", "routes/uploadimages.tsx"),
        route("/images/", "routes/images.tsx"),
        route("/approved-images/", "routes/approved.tsx"),
        route("/pending-images/", "routes/pending.tsx"),
        route("/rejected-images/", "routes/rejected.tsx"),
        route("/profile/", "routes/profile.tsx"),
        route("/chnage-password/", "routes/password_change.tsx"),
        route("/users/", "routes/users.tsx"),
    ]),
    route("/login/", "routes/login.tsx"),
] satisfies RouteConfig;
