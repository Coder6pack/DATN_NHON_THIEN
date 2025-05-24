import jwt from "jsonwebtoken";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { UseFormSetError } from "react-hook-form";
import { EntityError } from "./http";
import { toast } from "@/hooks/use-toast";
import { authApiRequest } from "@/app/apiRequests/auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const decodeExpiresToken = (token: string) => {
  const { exp } = jwt.decode(token) as { exp: number };
  return exp;
};

export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const handleHttpErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error?.payload?.errors?.forEach((error) => {
      setError(error.field, {
        type: "server",
        message: error?.message,
      });
    });
  } else {
    toast({
      title: "Lỗi",
      description: error?.payload?.message ?? "Lỗi không xác định",
      variant: "destructive",
      duration: duration ?? 5000,
    });
  }
};

const isBrowser = typeof window !== "undefined";

export const getAccessTokenFormLocalStorage = () =>
  isBrowser ? localStorage.getItem("accessToken") : null;

export const getRefreshTokenFormLocalStorage = () =>
  isBrowser ? localStorage.getItem("refreshToken") : null;
export const setAccessTokenToLocalStorage = (value: string) =>
  isBrowser && localStorage.setItem("accessToken", value);

export const setRefreshTokenToLocalStorage = (value: string) =>
  isBrowser && localStorage.setItem("refreshToken", value);
export const removeTokensFromLocalStorage = () => {
  isBrowser && localStorage.removeItem("accessToken");
  isBrowser && localStorage.removeItem("refreshToken");
};
export const checkAndRefreshToken = async (param?: {
  onError?: () => void;
  onSuccess?: () => void;
}) => {
  const accessToken = getAccessTokenFormLocalStorage();
  const refreshToken = getRefreshTokenFormLocalStorage();
  // Chưa đăng nhập thì cũng không cho chạy
  if (!accessToken || !refreshToken) return;
  const decodedAccessToken = jwt.decode(accessToken) as {
    exp: number;
    iat: number;
  };
  const decodedRefreshToken = jwt.decode(refreshToken) as {
    exp: number;
    iat: number;
  };
  const now = new Date().getTime() / 1000 - 1;
  // trường hợp refresh token hết hạn thì không xử lý nữa
  if (decodedRefreshToken.exp <= now) {
    console.log("Refresh token hết hạn");
    removeTokensFromLocalStorage();
    return param?.onError && param.onError();
  }
  // kiểm tra còn 1/3 thời gian (3s) thì mình sẽ cho refresh token lại
  if (
    decodedAccessToken.exp - now <
    (decodedAccessToken.exp - decodedAccessToken.iat) / 3
  ) {
    // Gọi API refresh token
    try {
      const res = await authApiRequest.refreshToken();
      setAccessTokenToLocalStorage(res.payload.accessToken);
      setRefreshTokenToLocalStorage(res.payload.refreshToken);
      param?.onSuccess && param.onSuccess();
    } catch (error) {
      param?.onError && param.onError();
    }
  }
};
