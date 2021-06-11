export interface iPerson {
  id: number;
  name: string;
  age: number;
  addressOne: {
    [key: string]: iAddress;
  }
  addressTwo: {
    [key: string]: iAddress;
  }
}

export interface iAddress {
  street?: string;
  city?: string;
  region?: string;
  country?: string;
  postalCode?: string;
}

export interface iPersonListItemProps {
  person: iPerson;
  refresh: () => void;
}