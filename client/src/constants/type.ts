export const TokenType = {
  ForgotPasswordToken: "ForgotPasswordToken",
  AccessToken: "AccessToken",
  RefreshToken: "RefreshToken",
} as const;

export const Role = {
  Admin: "Admin",
  Client: "Client",
} as const;

export const RoleValues = [Role.Admin, Role.Client] as const;

export const ManagerRoom = "manager" as const;
