export enum EAgreementStatus {
  SIGNED = 'signed',
  PENDING = 'pending',
  AWATING = 'awating',
}

// Need change
export enum EBgStatus {
  VERIFIED = 'verified',
  NOT_REQUIRED = 'not_required',
}

export enum ECompanyDocumentStatus {
  NOT_UPLOADED = 'not_uploaded',
  UPLOADED = 'uploaded',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

export enum EModuleStatus {
  INACTIVE = 'inactive',
  REQUESTED = 'requested',
  UNDER_PROCESS = 'under_process',
  ACTIVE = 'active',
}

export enum ECommissionEcomType {
  FIXED_RATE = 'fixed_rate',
  FIXED_PERCENTAGE = 'fixed_percentage',
  MONTHLY_FIXED_RATE = 'monthly_fixed_rate',
  MONTHLY_FIXED_PERCENTAGE = 'monthly_fixed_percentage',
  RANGE = 'ranges',
}
