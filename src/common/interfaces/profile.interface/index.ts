import { EAgreementStatus, ECompanyDocumentStatus } from 'src/common/enums';

export interface IMerchantModules {
  agreementStatus: EAgreementStatus;
  bgNotRequiredReason: string;
  bgStatus: string;
  commissions?: any;
  goldLimit?: number;
  isActive: boolean;
  isOpted?: boolean;

  isLeaser?: boolean;
  leaseLimit?: number;
  isInStoreVerifier?: boolean;
}

export interface IProfile {
  _id?: string;
  name: string;
  contactNo: string;
  documentStatus: ECompanyDocumentStatus;
  email: string;
  image: string;
  isAddressCreated: boolean;
  isGstVerified: boolean;
  isProfileCreated: boolean;
  isVehicleRequested: boolean;
  mobile: string;
  modules: { [key: string]: IMerchantModules };
  createdAt?: string;
}
