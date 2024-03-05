import { ICreator } from "../gamedetails/domain";
import { CompleteCommentObj } from "../Common/CommentSection/domain";

export const maxtitleLength: number = 70;
export interface NewCardObject {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  profilePictureURL: string;
}

export interface createNewsReqBody {
  articleId?: string;
  createdBy?: string;
  title: string;
  description: string;
}

export interface IArticlePermission {
  editArticle: boolean;
  approveOrReject: boolean;
  liked?: boolean;
  disliked?: boolean;
}

export interface IAirticleState {
  AirticleLoader: boolean;
  AirticleMessage: string;
  AirticleFlag: string;
  activeAirticles: NewCardObject[];
  comments: CompleteCommentObj[];
  permissions: IArticlePermission;
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
  likesCount: number;
  dislikesCount: number;
}

export interface IPostCommentReqBody {
  articleId: string;
  text: string;
  parentId?: string;
}

export interface IupdateLikeDislikeCountReqBody {
  articleId: string;
  flag: string;
}
export interface ICreateEditArticleProps {
  newsId?: string;
  mode?: string;
}

export interface likedislikeCompProps {
  newsId: string;
}
