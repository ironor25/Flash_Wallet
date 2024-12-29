const SepoliaETH = {
    name: 'SepoliaETH',
    hex: '0xaa36a7',
    ticker : 'SETH',
    rpcUrl: "https://site1.moralis-nodes.com/sepolia/bbf97b756b6b46db8cf2de0cdabc4ccd"
}
const PolygonAmoyTestnet = {
    name: 'PolygonAmoyTestnet',
    hex: '0x13882',
    ticker : 'POS',
    rpcUrl: "https://site1.moralis-nodes.com/amoy/2560ab001f8a41ed8bf493fe68bbd052"
}

export const Chains_Config = {
    "0xaa36a7": SepoliaETH,
    "0x13882": PolygonAmoyTestnet
};
export default Chains_Config;