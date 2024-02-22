export type ErrorMessageObj = {
  message: string | undefined;
  color?: string;
};

export type TagsProps = {
  text: string;
  onRemove: (id: string) => void;
  keytoIdenify: string;
};
