export const environment = {
  production: true,
  static_files_url: 'http://192.168.2.45/storage',
  api: 'http://192.168.2.45/api/v1',
  jwt_whitelistedDomains: ['192.168.2.45'],
  jwt_blacklistedRoutes: ['192.168.2.45/api/v1/login'],
  buildVersion: '0.1',
  hideUnfinishedFeatures: true,
  companyName: 'A.B.T. P.del Rio'
};
