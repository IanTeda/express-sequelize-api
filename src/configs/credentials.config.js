import fs from 'fs';

const privateKey  = fs.readFileSync(__dirname + '/../certificates/server.key');
const certificate = fs.readFileSync(__dirname + '/../certificates/server.crt');

/**
 * HTTPS Certificate configuration 
 * @module configs/credentials
 */
const credentials = {key: privateKey, cert: certificate};

export default credentials

// https://www.akadia.com/services/ssh_test_certificate.html
