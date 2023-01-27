export const API_BASE_URL = "http://localhost:8443/api/oauth2/authorize/";

// export const OAUTH2_REDIRECT_URI = 'http://localhost:8443/oauth/redirect';
export const OAUTH2_REDIRECT_URI = "http://localhost:8443/oauth/redirect";

export const GOOGLE_AUTH_URL =
  API_BASE_URL + "google?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const NAVER_AUTH_URL =
  API_BASE_URL + "naver?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const KAKAO_AUTH_URL =
  API_BASE_URL + "kakao?redirect_uri=" + OAUTH2_REDIRECT_URI;

export const AWS_S3_BASE_URL =
  "https://ssafy-d204-dokdo.s3.ap-northeast-2.amazonaws.com/";
