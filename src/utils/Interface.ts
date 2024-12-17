import { linkType } from "@/utils/Enum";

export interface SidebarBody {
  name: string;
  icon?: string;
  type: linkType;
  datas?: any;
  url?: string;
  child?: SidebarBody[];
}

export interface selectedBedType {
  roomCategory: string;
  roomClass: string;
  room: string;
  bed: number;
}

export interface ListMenu {
  title: string;
  icon: string;
  iconWeight?: string;
  url: string;
}

export interface FilterAdmisi {
  q?: string;
  paymentMethod?: string;
  page?: number;
  limit?: number;
  platform?: string;
  poly?: string[];
  startDate?: string;
  endDate?: string;
  dpjp?: string;
  status?: string;
  room?: string[];
  withoutIdentity?: string;
}

export interface Allow {
  name: string;
  checked: boolean;
}

export interface Feature {
  name: string;
  checked: boolean;
  allows: Allow[];
}

export interface SubModule {
  name: string;
  checked: boolean;
  features: Feature[];
  allows: Allow[];
}

export interface Module {
  module: string;
  checked: boolean;
  subModules: SubModule[];
}