export const MOBILE = (typeof window !== 'undefined') ? (window.screen.availWidth < 800) : true;
// export const API_BASE_URL: string = `http://${HOST}:${PORT}`;
// export const API_BASE_URL: string = (ENV === 'production' ? `http://${HOST}:8080/` : `http://${HOST}:8080/`);
export const API_BASE_URL: string = (ENV === 'production' ? `http://prod-terminal.axonactive.vn/` : `http://192.168.70.63:8082/`);
export const APP_NAME: string = 'LivesPlay';
