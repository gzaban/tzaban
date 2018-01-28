const config = () => {
    return {
        isDebug: true,
        apiUrl: 'http://frontend.dev.panpwrws.com/',
        //apiUrl: process.env.NODE_ENV === 'production' ? 'https://app.panpwrws.com/' : '/',
        //apiUrl: 'http://192.168.10.180:8080/',
        //apiUrl: 'https://frontend.test.panpwrws.com/',
        //apiUrl: 'http://192.168.12.138:8080/',
        //apiUrl: 'https://vpc-frontend2.test.panpwrws.com',
        // apiUrl: 'http://localhost:8080/',

        client_id: 'deployapi',
        client_secret: 'deploysecret',
        version: '1.0.0'
    }
};

export default new config;