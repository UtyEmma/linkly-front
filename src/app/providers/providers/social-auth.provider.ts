import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider, SocialAuthServiceConfig } from "@abacritt/angularx-social-login";
import { environment } from "src/environments/environment";

const SocialAuthConfig =  {
    provide: 'SocialAuthServiceConfig',
    
    useValue: {
        autoLogin: false,
        providers: [
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientID)
        },
        {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
        }
        ],
        onError: (err) => {
            console.error(err);
        }
    } as SocialAuthServiceConfig,
}

export default SocialAuthConfig