export interface NavItem {
  id: string;
  title: string;
}

export interface Cocktail {
  name: string,
  country: string,
  detail: string,
  price: string
}

export interface ProfileItem {
  imgPath: string
}

export interface StoreInfo {
  heading: string,
  address: string,
  contact: {
    phone: string,
    email: string
  }
}

export interface OpeningHour {
  day: string;
  time: string;
}

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

export interface SliderItem {
  id: number;
  name: string;
  image: string;
  title: string;
  description: string;
}