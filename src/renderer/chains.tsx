import type { AddEthereumChainParameter } from '@web3-react/types';

const infuraKey = '84842078b09946638c03157f83405213';
const alchemyKey = '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC';
const magicKey = 'pk_live_1F99B3C570C9B08F';

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
};

const MATIC: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Matic',
  symbol: 'MATIC',
  decimals: 18,
};

interface BasicChainInformation {
  urls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency'];
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls'];
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
}

export function getAddChainParameters(
  chainId: number
): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

export const CHAINS: {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation;
} = {
  1: {
    urls: [
      `https://mainnet.infura.io/v3/${infuraKey}`,
      `https://eth-mainnet.alchemyapi.io/v2/${alchemyKey}`,
      'https://cloudflare-eth.com',
    ].filter((url) => url !== undefined),
    name: 'Mainnet',
  },
  3: {
    urls: [`https://ropsten.infura.io/v3/${infuraKey}`].filter(
      (url) => url !== undefined
    ),
    name: 'Ropsten',
  },
  4: {
    urls: [`https://rinkeby.infura.io/v3/${infuraKey}`].filter(
      (url) => url !== undefined
    ),
    name: 'Rinkeby',
  },
  5: {
    urls: [`https://goerli.infura.io/v3/${infuraKey}`].filter(
      (url) => url !== undefined
    ),
    name: 'Görli',
  },
  42: {
    urls: [`https://kovan.infura.io/v3/${infuraKey}`].filter(
      (url) => url !== undefined
    ),
    name: 'Kovan',
  },
  // Optimism
  10: {
    urls: [
      `https://optimism-mainnet.infura.io/v3/${infuraKey}`,
      'https://mainnet.optimism.io',
    ].filter((url) => url !== undefined),
    name: 'Optimistic Ethereum',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
  },
  69: {
    urls: [
      `https://optimism-kovan.infura.io/v3/${infuraKey}`,
      'https://kovan.optimism.io',
    ].filter((url) => url !== undefined),
    name: 'Optimistic Kovan',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://kovan-optimistic.etherscan.io'],
  },
  // Arbitrum
  42161: {
    urls: [
      `https://arbitrum-mainnet.infura.io/v3/${infuraKey}`,
      'https://arb1.arbitrum.io/rpc',
    ].filter((url) => url !== undefined),
    name: 'Arbitrum One',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://arbiscan.io'],
  },
  421611: {
    urls: [
      `https://arbitrum-rinkeby.infura.io/v3/${infuraKey}`,
      'https://rinkeby.arbitrum.io/rpc',
    ].filter((url) => url !== undefined),
    name: 'Arbitrum Testnet',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://testnet.arbiscan.io'],
  },
  // Polygon
  137: {
    urls: [
      `https://polygon-mainnet.infura.io/v3/${infuraKey}`,
      'https://polygon-rpc.com',
    ].filter((url) => url !== undefined),
    name: 'Polygon Mainnet',
    nativeCurrency: MATIC,
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  80001: {
    urls: [`https://polygon-mumbai.infura.io/v3/${infuraKey}`].filter(
      (url) => url !== undefined
    ),
    name: 'Polygon Mumbai',
    nativeCurrency: MATIC,
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  },
};

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});
