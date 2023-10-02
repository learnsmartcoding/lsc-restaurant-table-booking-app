/**
 * This file contains authentication parameters. Contents of this file
 * is roughly the same across other MSAL.js libraries. These parameters
 * are used to initialize Angular and MSAL Angular configurations in
 * in app.module.ts file.
 */

import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

/**
 * Enter here the user flows and custom policies for your B2C application,
 * To learn more about user flows, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
    names: {
        signUpSignIn: 'B2C_1_susi',
        resetPassword: 'B2C_1_password_reset',
        editProfile: 'B2C_1_profile_edit',
    },
    authorities: {
        signUpSignIn: {
            authority: 'https://learnsmartcoding.b2clogin.com/learnsmartcoding.onmicrosoft.com/B2C_1_susi',
        },
        resetPassword: {
            authority: 'https://learnsmartcoding.b2clogin.com/learnsmartcoding.onmicrosoft.com/B2C_1_password_reset',
        },
        editProfile: {
            authority: 'https://learnsmartcoding.b2clogin.com/learnsmartcoding.onmicrosoft.com/B2C_1_profile_edit',
        },
    },
    authorityDomain: 'learnsmartcoding.b2clogin.com',
};

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig: Configuration = {
    auth: {
        clientId: environment.adb2cConfig.clientId, // This is the ONLY mandatory field that you need to supply.
        authority: b2cPolicies.authorities.signUpSignIn.authority, // Defaults to "https://login.microsoftonline.com/common"
        knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
        redirectUri: '/', // Points to window.location.origin by default. You must register this URI on Azure portal/App Registration.
        postLogoutRedirectUri: '/', // Points to window.location.origin by default.
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge. Remove this line to use Angular Universal
    },
    system: {
        /**
         * Below you can configure MSAL.js logs. For more information, visit:
         * https://docs.microsoft.com/azure/active-directory/develop/msal-logging-js
         */
        loggerOptions: {
            loggerCallback(logLevel: LogLevel, message: string) {
                console.log(message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false
        }
    }
}

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
 export const protectedResources = {
    api: {
      endpoint: environment.adb2cConfig.apiEndpointUrl,
      scopes: {
          read: [environment.adb2cConfig.readScopeUrl],
          write: [environment.adb2cConfig.writeScopeUrl]
      }
  }
}

/**
* Scopes you add here will be prompted for user consent during sign-in.
* By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
* For more information about OIDC scopes, visit:
* https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
*/
export const loginRequest = {
  scopes: []
};

