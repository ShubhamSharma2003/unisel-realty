export type FooterMenuItem = {
  label: string;
  href: string;
};

export type FooterMenu = {
  _id: string;
  title: string;
  order: number;
  items: FooterMenuItem[];
};
