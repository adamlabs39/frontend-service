import { linkType } from "@/utils/Enum";

export interface SidebarBody {
  name: string;
  icon?: string;
  type: linkType;
  url?: string;
  child?: SidebarBody[];
}

export interface selectedBedType {
  roomCategory: string;
  roomClass: string;
  room: string;
  bed: number;
}

export interface Module {
  module: string;
  subModule: SubModule[];
}

export interface SubModule {
  name: string;
  allows: [];
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
  room?: string[];
  withoutIdentity?: string;
}