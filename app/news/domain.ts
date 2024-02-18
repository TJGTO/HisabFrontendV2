import { ICreator } from "../gamedetails/domain";
export interface NewCardObject {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  profilePictureURL: string;
}

export interface createNewsReqBody {
  title: string;
  description: string;
}

export interface IAirticleState {
  AirticleLoader: boolean;
  AirticleMessage: string;
  AirticleFlag: string;
  activeAirticles: NewCardObject[];
  currentAirticleDetail: IAirticleObject | null;
}

export interface CreatorOfAirticle extends ICreator {
  fullName: string;
  about: string;
}
export interface IAirticleObject {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  description: string;

  creator: CreatorOfAirticle;
}
