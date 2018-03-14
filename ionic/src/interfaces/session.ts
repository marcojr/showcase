import { DeviceInfo, Session, NameStructure,
         Contact, Address, ContactInfo, SocialCore,
         Service, PrivacyOption, Count,
         PendingRequests } from "./app";
//Responses
export interface ResLogin {
  type: string,
  username:string,
  uuid: string,
  name: NameStructure,
  alias: Contact[],
  flags : any,
  bio: string,
  registrationDate: Date,
  status: string,
  blockedUntil: Date,
  requiresNewTosAcceptance : boolean,
  gender: string,
  birthDay: Date,
  address: Address,
  contactInfo: ContactInfo,
  connections: Contact[],
  following: Contact[],90
  followers: Contact[],i2
  blocks: Contact[],
  socialCores: SocialCore[],
  services: string[],
  customData: any,
  counts : Count,
  privacyOptions : PrivacyOption [],
  pendingRequests : PendingRequests,
  passwordMustBeChanged : boolean,
  session : Session
}




//Requests
export interface ReqLogin {
  usernameOrMobile : string,
  password: string,
  appVersion: string,
  localRnd: string,
  appType: string,
  deviceInfo : DeviceInfo
}


export interface DeviceInfo {

}
