type CurrentUser = {
  avatar?: string;
  userid?: string;
  email?: string;
  nickName?: string;
  archiveId?: string;
  deptId?: string;
  gender?: number;
  perms?: string[];
  phoneNumber?: string;
  token?: string;
  permissions?: [];
};

type R<T = any> = {
  success: boolean;
  message: string;
  data?: T | undefined;
  total?: number;
};
