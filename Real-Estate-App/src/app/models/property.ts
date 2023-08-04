import { IPropertyBase } from "./ipropertybase";

export class Property implements IPropertyBase{
  Id!: number|null;
  SellRent!: number|null;
  Name!: string|null;
  PType!: string|null;
  FType!: string|null;
  Price!: number|null;
  BHK!: number|null;
  BuiltArea!: number|null;
  City!: string|null;
  RTM!: number|null;
  Address!: string|null;
  PostedOn!: string|null;
  PostedBy!: number|null;

  Security?: number|null;
  Maintenance?: number|null;
  CarpetArea?: number|null;
  FloorNo?: string|null;
  TotalFloor?: string|null;
  LandMark?: string|null;
  PosessionOn?: string|null;
  AOP?: string|null;
  Gated?: number|null;
  MainEntrance?: string|null;
  Description?: string|null;
  Image?: string;
}
