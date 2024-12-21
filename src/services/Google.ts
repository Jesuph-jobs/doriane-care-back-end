/* import { google, type oauth2_v2 } from 'googleapis';

import { cLogger } from '$server/console';

import {
	FY_GOOGLE_LINK_REDIRECT_URI,
	FY_GOOGLE_OAUTH2_CLIENT_ID,
	FY_GOOGLE_OAUTH2_CLIENT_SECRET,
	FY_GOOGLE_OAUTH2_REDIRECT_URI,
} from '&server/env';

const googleDefaultId = 'google-oauth2-service';

export default class GoogleOAuth2Service {
	id: string;
	name = 'Google OAuth2 Service';
	category = 'Auth';
	description = 'A service to handle Google OAuth2 authentication.';
	authorizationUrl: string;
	linkingUrl: string;

	constructor(id: string = googleDefaultId) {
		this.id = id;
		this.authorizationUrl = this.getAuthorizationUrl();
		this.linkingUrl = this.getLinkingUrl();
		cLogger.info(`🌐 Google OAuth2 Service initialized with id: ${this.id}`);
	}
	public getGoogleClient(redirect: string) {
		return new google.auth.OAuth2(FY_GOOGLE_OAUTH2_CLIENT_ID, FY_GOOGLE_OAUTH2_CLIENT_SECRET, redirect);
	}
	public getAuthorizationUrl() {
		const client = this.getGoogleClient(FY_GOOGLE_OAUTH2_REDIRECT_URI);
		return client.generateAuthUrl({
			access_type: 'offline',
			scope: ['profile', 'email'],
		});
	}
	public getLinkingUrl() {
		const client = this.getGoogleClient(FY_GOOGLE_LINK_REDIRECT_URI);
		return client.generateAuthUrl({
			access_type: 'offline',
			scope: ['profile', 'email'],
		});
	}
	public async link(code: string): Promise<UserGoogleRegistrationI> {
		const oAuth2Client = this.getGoogleClient(FY_GOOGLE_LINK_REDIRECT_URI);
		const { tokens } = await oAuth2Client.getToken(code);

		oAuth2Client.setCredentials(tokens);
		const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });
		const { data } = await oauth2.userinfo.get();

		return this.toUser(data);
	}
	public async logOn(code: string): Promise<UserGoogleRegistrationI> {
		const oAuth2Client = this.getGoogleClient(FY_GOOGLE_OAUTH2_REDIRECT_URI);
		const { tokens } = await oAuth2Client.getToken(code);

		oAuth2Client.setCredentials(tokens);
		const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });
		const { data } = await oauth2.userinfo.get();

		return this.toUser(data);
	}
	public toUser(data: oauth2_v2.Schema$Userinfo): UserGoogleRegistrationI {
		if (!data.id || !data.email || !data.given_name || !data.family_name)
			throw new Error('Invalid user data from Google.');
		return {
			id: data.id,
			username: data.email || data.id,
		};
	}
	public stop(): Promise<void> {
		return Promise.resolve();
	}
}
 */
