import {Country, Text, Service, PrivacyOption, NameStructure, Address} from "./app";

//Responses
export interface ResGetReady {
  successfully : boolean,
  data : {
    countries : Country [],
    texts : Text,
    services : Service [],
    privacyOptions: PrivacyOption []
  }
}
export interface ResSendSMS {
  successfully : boolean,
  data : null
}
export interface ResCheckAvailability {
  successfully : boolean,
  data : {
    isAvailable: boolean
  }
}
export interface ResConfirmSMS {
  successfully : boolean,
  data : {
    uuid: string
  }
}
export interface ResRegister {
  successfully : boolean,
  data : null
}


//Requests
export interface ReqConfirmSMS {
  code : string,
  mobileNumber : string
}
export interface ReqRegister {
  username : string,
  phoneUUID : string,
  phoneCode : string,
  picture : string,
  password : string,
  name : NameStructure,
  birthDay: Date,
  bio : string,
  gender : string,
  address : Address,
  services: string [],
  email : string,
  privacyOptions : PrivacyOption [],
  tos : string,
  customData : any
}

