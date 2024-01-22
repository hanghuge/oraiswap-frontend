class Config {
  chainId: string;
  chainName: string;
  stakingUrl: string;
  rpcUrl: string;
  restUrl: string;
  relayerUrl: string;

  constructor() {
    if (process.env.REACT_APP_ORAIBTC_NETWORK === 'testnet') {
      this.chainId = 'oraibtc-subnet-1';
      this.chainName = 'OraiBtcSubnet';
      this.rpcUrl = 'https://oraibtc.rpc.orai.io';
      this.restUrl = 'https://oraibtc.lcd.orai.io';
      this.relayerUrl = 'https://oraibtc.relayer.orai.io';
    } else {
      this.chainId = 'oraibtc-mainnet-1';
      this.chainName = 'OraiBtcMainnet';
      this.stakingUrl = '';
      this.rpcUrl = 'https://btc.rpc.orai.io';
      this.restUrl = 'https://btc.lcd.orai.io';
      this.relayerUrl = 'https://btc.relayer.orai.io';
    }
  }
}

export const config = new Config();
