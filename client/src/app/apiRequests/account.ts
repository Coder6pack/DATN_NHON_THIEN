import http from "@/lib/http";
import {
  ChangePasswordBodyType,
  UpdateMeBodyType,
} from "@/schemaValidations/profile.model";
import { GetUsersResType } from "@/schemaValidations/user.model";
import { MessageResType } from "@/shared/models/response.model";
import {
  GetProfileType,
  UpdateUserProfileResType,
} from "@/shared/models/shared-user.model";

const accountApiRequest = {
  me: () => http.get<GetProfileType>("/profile"),
  sMe: (accessToken: string) =>
    http.get<GetProfileType>("/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  updateMe: (body: UpdateMeBodyType) =>
    http.put<UpdateUserProfileResType>("/profile", body),
  changePassword: (body: ChangePasswordBodyType) =>
    http.put<MessageResType>("/profile/change-password", body),
  listAccount: () => http.get<GetUsersResType>("/user"),
};

export default accountApiRequest;
