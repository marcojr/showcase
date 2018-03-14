export interface App {
  countries : Country [],
  texts : Text ,
  services : Service [],
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
export interface Service {
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
  first : string,
  last : string,
  displayName : string
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
  platformVersion: string,
  displayWidth: number,
  displayHeight: number
}
export interface Session {
  token: string,
  expiration: Date
}
export interface Contact {
  uuid: string,
  username: string,
  bio: string,
  status: string,
  isTest: boolean,
  type: string,
  circle?: string,
  name: NameStructure,
  followingAs?: string,
  followedAs?: string
}
export interface ContactInfo {
  type: string,
  value: string,
  confirmed: boolean
}
export interface SocialCore {
  name: string,
  uuid: string,
  users: Contact[]
}
export interface Count {
  followings: number,
  followers: number,
  connections: ConnectionCount []
}
export interface ConnectionCount {
  circle: string,
  count: number
}
export interface PendingRequests {
  connections: Contact[],
  services: Service []
}
