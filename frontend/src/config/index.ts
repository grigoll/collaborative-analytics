/* eslint-disable @typescript-eslint/no-non-null-assertion */
const API_URL_BASE = process.env.REACT_APP_API_URL_BASE!;
const SITE_URL = process.env.REACT_APP_SITE_URL!;

const IS_DEV = process.env.NODE_ENV === 'development';

export { API_URL_BASE, IS_DEV, SITE_URL };
