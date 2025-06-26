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
  "/login": {};
  "/dashboard": {};
  "/dashboard/upload-images": {};
  "/dashboard/total-images": {};
  "/dashboard/approved-images": {};
  "/*": {
    "*": string;
  };
};