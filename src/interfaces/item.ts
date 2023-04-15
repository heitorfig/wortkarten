export interface Item {
  id: string;
  image?: string;
  sound?: string;
  i18n: {
    [key: string]: {
      name: string;
      audio: string;
    };
  };
}
