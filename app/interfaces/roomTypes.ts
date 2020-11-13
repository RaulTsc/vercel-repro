import { IRoom, ITimestamps } from "./";
import { IFile } from "@raultom/react-file-upload/lib/interfaces";

export type IRoomTypeAmenity = {
  locale?: string | null;
  text?: string | null;
  isSelected?: boolean;
};

export interface IRoomType extends ITimestamps {
  id: string;
  companyId?: string;
  name: string;
  rate?: number;
  maxNumberOfGuests?: number;
  description?: string;
  rooms?: IRoom[];
  images?: IFile[];
  amenities?: IRoomTypeAmenity[];
}
