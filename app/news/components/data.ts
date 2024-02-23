import { CompleteCommentObj } from "../../Common/CommentSection/domain";

export let CommentData: CompleteCommentObj[] = [
  {
    commentId: "1",
    text: "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
    commentBy: {
      _id: "nwenfkwfewf",
      fullName: "Tathagata Mondal",
      profilePictureURL: "Tathagata_Mondal_2024-02-18_17%3A41%3A58.480Z",
    },
    replyComments: [
      {
        commentId: "1",
        text: "Very good Analysis",
        commentBy: {
          _id: "nwenfkwfewf",
          fullName: "Asamanja Kasundi",
          profilePictureURL: "Asamanja_Kasundi_2024-02-12_19%3A18%3A21.534Z",
        },
      },
    ],
  },
  {
    commentId: "2",
    text: "I got orgasam by reading your blog",
    commentBy: {
      _id: "nwenfkwffgewf",
      fullName: "Tuhin Kundu",
      profilePictureURL: "Tuhin_Kundu_2024-02-13_17%3A14%3A00.064Z",
    },
    replyComments: [
      {
        commentId: "1",
        text: "So sexy of you",
        commentBy: {
          _id: "nwenfkwfewf",
          fullName: "Dipak Shaw",
          profilePictureURL: "Dipak_Shaw_2024-02-16_09%3A48%3A31.212Z",
        },
      },
      {
        commentId: "2",
        text: "Nice to hear",
        commentBy: {
          _id: "nwenfkwfewf",
          fullName: "Niladri Chakraborty",
          profilePictureURL: "Niladri_Chakraborty_2024-02-16_18%3A03%3A00.968Z",
        },
      },
    ],
  },
];
