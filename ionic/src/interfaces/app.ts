export interface App {
  countries : Country [],
  texts : Text ,
  venues : Venue [],
  privacyOptions : PrivacyOption []
}

export interface Country {
  iso: string,
  name: string,
  areaCode : number
}
export interface Text {
  tos: string,
  faq : string,
  tgc : string
}
export interface Venue {
  key: string,
  name: string,
  description : string,
  inUse?: boolean
}
export interface PrivacyOption {
  key : string,
  desc: string,
  value: number,
  availableOptions: number[],
  allowOnRegistration: boolean,
  defaultValue: number
}
export interface NameStructure {
  title : string,
  name : string
}
export interface Address {
  streetLine1 : string,
  streetLine2 : string,
  city : string,
  stateOrCounty : string,
  postCode : string,
  latitude : number,
  longitude : number,
  country : Country
}
export interface DeviceInfo {
  platformName: string,
  displayWidth: number,
  displayHeight: number
}
export interface Session {
  token: string,
  expiration: Date
}
export interface ContactInfo {
  type: string,
  value: string,
  confirmed: boolean
}
export interface User {
    type: string,
    username:string,
    uuid: string,
    name: NameStructure,
    bio: string,
    registrationDate: Date,
    status: string,
    blockedUntil: Date,
    requiresNewTosAcceptance : boolean,
    gender: string,
    birthDay: Date,
    address: Address,
    contactInfo: ContactInfo,
    venues: string[],
    customData: any,
    privacyOptions : PrivacyOption [],
    passwordMustBeChanged : boolean,
    session : Session
}
