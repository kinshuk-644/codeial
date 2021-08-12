const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: "blahsomething",
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'codeialsocial@gmail.com',
            pass: 'redminote7pro'
        }
    },
    google_client_id: "170940202810-7fqtundedh130ehrbj8dkf8gn486fgep.apps.googleusercontent.com",
    google_client_secret: "9QIrxJHBl84yDY7OiBBBFM2D",
    google_call_back_url: "http://localhost:3000/users/auth/google/callback",
    jwt_secret: 'codeial'

};

const production = {
    name: 'production'
};

module.exports = development;