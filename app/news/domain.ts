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
}
