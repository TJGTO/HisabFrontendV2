export interface IsatsCard {
  id: string;
  statsText: string;
  secondaryText: string;
  icon: string;
  subject: string;
}

export const dataForStatisticsSection: IsatsCard[] = [
  {
    id: "1",
    statsText: "1.5k",
    secondaryText: "Menbers",
    icon: "/assets/facebookicon.png",
    subject: "Facebook",
  },
  {
    id: "2",
    statsText: "500",
    secondaryText: "Active Players",
    icon: "/assets/playerIcon.png",
    subject: "Players",
  },
  {
    id: "3",
    statsText: "280",
    secondaryText: "Subscribers",
    icon: "/assets/youtubeIcon.png",
    subject: "Youtube",
  },
  {
    id: "4",
    statsText: "120",
    secondaryText: "Followers",
    icon: "/assets/InstaIcon.png",
    subject: "Instagram",
  },
];