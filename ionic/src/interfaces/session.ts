import { DeviceInfo, Session, NameStructure,
          Address, ContactInfo, PrivacyOption, User } from "./app";





//Responses
export interface ResLogin {
    successfully: boolean,
    data: User
}
export interface ResLogout {
    successfully : boolean,
    data : null
}

//Requests
export interface ReqLogin {
  usernameOrMobile : string,
  password: string,
  appVersion: number,
  localRnd: string,
  appType: string,
  deviceInfo : DeviceInfo
}
