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
