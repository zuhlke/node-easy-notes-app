const protocolString = 'http';
const hostString = 'localhost';
const portString = '8989';

module.exports = {
    protocol: protocolString,
    host: hostString,
    port: portString,
    url: protocolString + '://' + hostString + ':' + portString
};
