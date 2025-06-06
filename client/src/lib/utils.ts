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

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat("de-DE").format(currency);
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(value)
    .replace(".", ",")
    .toLowerCase();
}

async function convertBlobUrlsToFileArray(
  blobUrls: string[],
  fileNamePrefix: string = "file"
): Promise<File[]> {
  const filePromises = blobUrls.map(async (url, index) => {
    // Lấy Blob từ URL blob
    const response = await fetch(url);
    const blob = await response.blob();
    // Tạo tên tệp động (hoặc lấy từ metadata nếu có)
    const fileName = `${fileNamePrefix}${index}.${
      blob.type.split("/")[1] || "bin"
    }`;
    // Tạo File từ Blob
    return new File([blob], fileName, { type: blob.type });
  });
  // Chờ tất cả các promise hoàn thành
  return Promise.all(filePromises);
}
export async function addBlobUrlsToFormData(
  blobUrls: string[]
): Promise<FormData> {
  const formData = new FormData();
  const fileArray = await convertBlobUrlsToFileArray(blobUrls);
  fileArray.forEach((file) => {
    formData.append(`files`, file, file.name);
  });
  return formData;
}

async function convertBlobUrlToFileArray(
  blobUrl: string,
  fileName: string = "files"
): Promise<File[]> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const extension = blob.type.split("/")[1] || "bin";
  const finalFileName = `${fileName}.${extension}`;
  const file = new File([blob], finalFileName, { type: blob.type });
  return [file];
}
export async function addBlobUrlToFormData(
  blobUrls: string
): Promise<FormData> {
  const formData = new FormData();
  const fileArray = await convertBlobUrlToFileArray(blobUrls);
  fileArray.forEach((file) => {
    formData.append(`files`, file, file.name);
  });
  return formData;
}
