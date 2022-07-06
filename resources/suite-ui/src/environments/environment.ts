// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  static_files_url: 'http://localhost:8000/storage',
  api: 'http://localhost:8000/api/v1',
  jwt_whitelistedDomains: ['localhost:8000'],
  jwt_blacklistedRoutes: ['localhost:8000/api/v1/login'],
  buildVersion: '0.1',
  hideUnfinishedFeatures: true,
  companyName: 'A.B.T. Hnos Saíz'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
