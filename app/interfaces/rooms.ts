import { IRoomType, ITimestamps, DateOrString } from "./";
import { IFile } from "@raultom/react-file-upload/lib/interfaces";

export interface IRoom extends ITimestamps {
  id?: string | null;
  companyId?: string;
  roomTypeId?: IRoomType;
  name?: string;
  roomType?: IRoomType;
  numberOfBeds?: number;
  numberOfBathrooms?: number;
  images?: IFile[];
}

export interface IRoomBlocking extends ITimestamps {
  id?: string;
  companyId?: string;
  roomId?: string;
  startDate?: DateOrString;
  endDate?: DateOrString;
}
