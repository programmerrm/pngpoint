import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }

  interface Future {
    unstable_middleware: false
  }
}

type Params = {
  "/": {};
  "/upload-images": {};
  "/total-images": {};
  "/approved-images": {};
  "/pending-images": {};
  "/rejected-images": {};
  "/profile": {};
  "/chnage-password": {};
  "/users": {};
  "/login": {};
};