export interface MemberFormData {
  fullName: string;
  birthDate: string;
  baptismDate: string;
  baptismChurch: string;
  phone: string;
  email: string;
  address: string;
  profession: string;
  maritalStatus: string;
  marriageCertificate?: File;
  identification?: File;
  pastoralInterviewer: string;
  belongsToGC: boolean;
  wantsToVolunteer: boolean;
}