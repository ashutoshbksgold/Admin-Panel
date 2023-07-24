let base = '/custodian';
const CustodianApi = {
  base,
  overview: base + '/overview',
  sales: base + '/sales',
  settlementDue: base + '/settlements-due',
  custody: base + '/custody',
  custodyByCustomer: base + '/custody/by-customer',
};

export default CustodianApi;
