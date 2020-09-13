export const wrappedUrl = (url) => {
    let baseUrl;
    if (process.env.NODE_ENV === 'production') {
        baseUrl = 'https://hms-backend-prateek.herokuapp.com';
    } else {
        baseUrl = 'http://localhost:9000'
    }
    return `${baseUrl}${url}`;
};
