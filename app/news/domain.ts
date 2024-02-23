import { ICreator } from "../gamedetails/domain";
import { CompleteCommentObj } from "../Common/CommentSection/domain";
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
  comments: CompleteCommentObj[];
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

export interface IPostCommentReqBody {
  articleId: string;
  text: string;
  parentId?: string;
}
