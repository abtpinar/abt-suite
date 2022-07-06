import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeConfigServiceService {

  constructor() {}

  loadThemeConfig() {
    // if (environment.themeConfiguration) {
    //   this.setDocumentVariable('--principal-color', environment.themeConfiguration.principalColor);
    //   this.setDocumentVariable('--principal-color-hover', environment.themeConfiguration.principalColorHover);
    //   this.setDocumentVariable('--principal-color-border', environment.themeConfiguration.principalColorBorder);
    //   this.setDocumentVariable('--logo-background-color', environment.themeConfiguration.logoBackgroundColor);
    //   this.setDocumentVariable('--link-hover', environment.themeConfiguration.linkHover);
    // }
  }

  getVariable(styles, propertyName) {
    return String(styles.getPropertyValue(propertyName)).trim();
  }

  setDocumentVariable(propertyName, value) {
    document.documentElement.style.setProperty(propertyName, value);
  }
}
