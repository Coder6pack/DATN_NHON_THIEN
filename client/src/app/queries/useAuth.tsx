import { useMutation } from "@tanstack/react-query";
import { authApiRequest } from "../apiRequests/auth";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: authApiRequest.login,
  });

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: authApiRequest.logout,
  });
