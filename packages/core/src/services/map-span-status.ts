import { type StatusCode } from "../types/open-telemetry";

export const mapSpanStatus = (
  statusCode?: StatusCode,
): "success" | "error" | "running" | "warning" => {
  switch (statusCode) {
    case "STATUS_CODE_OK":
      return "success";
    case "STATUS_CODE_ERROR":
      return "error";
    default:
      return "warning";
  }
};
