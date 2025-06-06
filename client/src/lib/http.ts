import { normalizePath } from "./utils";
import envConfig from "@/config";
import { LoginResType } from "@/schemaValidations/auth.model";
import { NextResponse } from "next/server";

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
  body?: {
    refreshToken: string;
  };
};

const AUTHENTICATION_ERROR_STATUS = 401;
const ENTITY_ERROR_STATUS = 422;

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({
    status,
    payload,
    message = "Lỗi Http",
  }: {
    status: number;
    payload: any;
    message?: string;
  }) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: typeof ENTITY_ERROR_STATUS;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: typeof ENTITY_ERROR_STATUS;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload, message: "Lỗi thực thể" });
    this.status = status;
    this.payload = payload;
  }
}

let clientLogoutRequest: null | Promise<any> = null;
const isClient = () => typeof window !== "undefined";

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }

  const baseHeaders: {
    [key: string]: string;
  } =
    body instanceof FormData
      ? {}
      : {
          "Content-Type": "application/json",
        };

  if (isClient()) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      baseHeaders.Authorization = `Bearer ${accessToken}`;
    }
  }
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = `${baseUrl}/${normalizePath(url)}`;
  const newHeaders = {
    ...baseHeaders,
    ...options,
  };
  const res = await fetch(fullUrl, {
    headers: {
      ...baseHeaders,
      ...options,
    } as any,
    method,
    body,
  });

  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };

  // Interceptor
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        }
      );
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (isClient()) {
        await fetch("/api/auth/logout", {
          method: "POST",
          body: null,
          headers: {
            ...baseHeaders,
          } as any,
        });
        try {
          await clientLogoutRequest;
        } catch (error) {
        } finally {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          clientLogoutRequest = null;
          location.href = "/login";
        }
      } else {
        const accessToken = (await options?.body?.refreshToken) as string;
        NextResponse.redirect(
          `http://localhost:3000/logout?accessToken=${accessToken}`
        );
      }
    } else {
      throw new HttpError(data);
    }
  }

  // Đảm bảo login được chạy ở phía client
  if (isClient()) {
    const normalizeUrl = normalizePath(url);
    if (normalizeUrl === "api/auth/login") {
      const { accessToken, refreshToken } = payload as LoginResType;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } else if (normalizeUrl === "api/auth/logout") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }
  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
};
export default http;
