import { useMutation, useQuery } from "@tanstack/react-query";
import accountApiRequest from "../apiRequests/account";

export const useAccountMe = () => {
  return useQuery({
    queryKey: ["account-me"],
    queryFn: accountApiRequest.me,
  });
};

export const useUpdateAccountProfileMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.updateMe,
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.changePassword,
  });
};

export const useListAccount = () => {
  return useQuery({
    queryKey: ["list-account"],
    queryFn: accountApiRequest.listAccount,
  });
};
