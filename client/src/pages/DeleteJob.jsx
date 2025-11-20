import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { QueryClient } from "@tanstack/react-query";

export const action =
  (QueryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/jobs/${params.id}`);
      QueryClient.invalidateQueries(["jobs"]);
      toast.success("Job deleted successfully");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
    return redirect("/dashboard/all-jobs");
  };
