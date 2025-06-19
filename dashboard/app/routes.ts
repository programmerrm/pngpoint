import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "routes/privateRoute.tsx", [
        index("routes/dashboard.tsx"),
        route("/upload-images/", "routes/uploadImages/index.tsx"),
        route("/total-images/", "routes/totalImages/index.tsx"),
        route("/approved-images/", "routes/approvedImages/index.tsx"),
        route("/pending-images/", "routes/pendingImages/index.tsx"),
        route("/rejected-images/", "routes/rejectedImages/index.tsx"),
        route("/profile/", "routes/profile.tsx"),
        route("/chnage-password/", "routes/password_change.tsx"),
        route("/users/", "routes/users.tsx"),
    ]),
    route("/login/", "routes/login.tsx"),
] satisfies RouteConfig;
