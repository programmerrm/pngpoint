import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home/index.tsx"),
    route("/image/:slug/", "routes/single/single.tsx"),
] satisfies RouteConfig;
