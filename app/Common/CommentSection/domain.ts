export interface Icommentor {
  _id: string;
  fullName: string;
  profilePictureURL: string;
}

export interface IcommentObj {
  commentId: string;
  text: string;
  commentBy: Icommentor;
}

export interface CompleteCommentObj extends IcommentObj {
  replyComments: IcommentObj[];
}

export interface CommentProps {
  commentData: CompleteCommentObj;
  submitComment: (text: string, parentId?: string) => void;
}
