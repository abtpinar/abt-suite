export const environment = {
  production: true,
  static_files_url: 'http://suite.home/storage',
  api: 'http://suite.home/api/v1',
  jwt_whitelistedDomains: ['suite.home'],
  jwt_blacklistedRoutes: ['suite.home/api/v1/login'],
  buildVersion: '0.1',
  hideUnfinishedFeatures: true,
  companyName: 'Home Co.'
};
