
export interface BonusRule {
  depositAmount: number;
  bonusAmount: number;
}

export interface BonusType {
  id: string;
  title: string;
  type: 'activity' | 'monthly';
  availableAmount: number;
  rules?: BonusRule[];
}

export interface VendorBonus {
  vendorId: string;
  vendorName: string;
  bonusTypes: BonusType[];
}
