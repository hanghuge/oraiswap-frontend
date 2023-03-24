import { fromBinary, toBinary } from '@cosmjs/cosmwasm-stargate';
import { StargateClient } from '@cosmjs/stargate';
import tokenABI from 'config/abi/erc20.json';
import {
  evmChainsWithoutTron,
  evmTokens,
  filteredTokens,
  kawaiiTokens,
  TokenItemType,
  tokenMap,
  tronChain
} from 'config/bridgeTokens';
import { KAWAII_SUBNET_RPC, KWT_SUBNETWORK_CHAIN_ID, KWT_SUBNETWORK_EVM_CHAIN_ID } from 'config/constants';
import { Contract } from 'config/contracts';
import { arrayLoadToken, handleCheckWallet, tronToEthAddress } from 'helper';
import flatten from 'lodash/flatten';
import { updateAmounts } from 'reducer/token';
import { BalanceResponse } from '../libs/contracts/OraiswapToken.types';
import { ContractCallResults, Multicall } from '../libs/ethereum-multicall';
import { clearFunctionExecution, getEvmAddress, getFunctionExecution } from '../libs/utils';

import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

async function loadNativeBalance(dispatch: Dispatch, address: string, tokenInfo: { chainId: string; rpc: string }) {
  if (!address) return;
  const client = await StargateClient.connect(tokenInfo.rpc);
  const amountAll = await client.getAllBalances(address);

  let amountDetails: AmountDetails = {};

  // reset native balances
  filteredTokens
    .filter((t) => t.chainId === tokenInfo.chainId && !t.contractAddress)
    .forEach((t) => {
      amountDetails[t.denom] = '0';
    });

  Object.assign(
    amountDetails,
    Object.fromEntries(amountAll.filter((coin) => tokenMap[coin.denom]).map((coin) => [coin.denom, coin.amount]))
  );

  dispatch(updateAmounts(amountDetails));
}

async function loadTokens(
  dispatch: Dispatch,
  refresh = false,
  metamaskAddress?: string,
  cosmosAddress?: string,
  tronAddress?: string
) {
  if (refresh) {
    clearFunctionExecution(
      cosmosAddress && loadTokensCosmos,
      cosmosAddress && loadKawaiiSubnetAmount,
      cosmosAddress && loadCw20Balance,
      metamaskAddress && loadTokensEvm,
      tronAddress && loadTokensEvm
    );
  }

  const kwtSubnetAddress = getEvmAddress(await window.Keplr.getKeplrAddr(KWT_SUBNETWORK_CHAIN_ID));

  await Promise.all(
    [
      cosmosAddress && getFunctionExecution(loadTokensCosmos, [dispatch]),
      metamaskAddress && getFunctionExecution(loadTokensEvm, [dispatch, { metamaskAddress }]),
      tronAddress && getFunctionExecution(loadTokensEvm, [dispatch, { tronAddress }]),
      cosmosAddress && kwtSubnetAddress && getFunctionExecution(loadKawaiiSubnetAmount, [dispatch, kwtSubnetAddress]),
      cosmosAddress && getFunctionExecution(loadCw20Balance, [dispatch, cosmosAddress])
    ].filter(Boolean)
  );
}

async function loadTokensCosmos(dispatch: Dispatch) {
  await handleCheckWallet();
  for (const token of arrayLoadToken) {
    window.Keplr.getKeplrAddr(token.chainId).then((address) => loadNativeBalance(dispatch, address, token));
  }
}

async function loadCw20Balance(dispatch: Dispatch, address: string) {
  if (!address) return;
  // get all cw20 token contract
  const cw20Tokens = filteredTokens.filter((t) => t.contractAddress);
  const data = toBinary({
    balance: { address }
  });

  const res = await Contract.multicall.aggregate({
    queries: cw20Tokens.map((t) => ({
      address: t.contractAddress,
      data
    }))
  });

  const amountDetails = Object.fromEntries(
    cw20Tokens.map((t, ind) => {
      if (!res.return_data[ind].success) {
        return [t.denom, 0];
      }
      const balanceRes = fromBinary(res.return_data[ind].data) as BalanceResponse;
      const amount = balanceRes.balance;
      return [t.denom, amount];
    })
  );
  dispatch(updateAmounts(amountDetails));
}

async function loadEvmEntries(
  address: string,
  tokens: TokenItemType[],
  rpc: string,
  chainId: number,
  multicallCustomContractAddress?: string
): Promise<[string, string][]> {
  const multicall = new Multicall({
    nodeUrl: rpc,
    multicallCustomContractAddress,
    chainId
  });
  const input = tokens.map((token) => ({
    reference: token.denom,
    contractAddress: token.contractAddress,
    abi: tokenABI,
    calls: [
      {
        reference: token.denom,
        methodName: 'balanceOf(address)',
        methodParameters: [address]
      }
    ]
  }));

  const results: ContractCallResults = await multicall.call(input);
  return tokens.map((token) => {
    const amount = results.results[token.denom].callsReturnContext[0].returnValues[0].hex;
    return [token.denom, amount];
  });
}

async function loadTokensEvm(dispatch: Dispatch, address: { metamaskAddress?: string; tronAddress?: string }) {
  const { metamaskAddress, tronAddress } = address;
  if (metamaskAddress) loadEvmAmounts(dispatch, metamaskAddress, evmChainsWithoutTron);
  else loadEvmAmounts(dispatch, tronToEthAddress(tronAddress), tronChain);
}

async function loadEvmAmounts(dispatch: Dispatch, evmAddress: string, chains: TokenItemType[]) {
  const amountDetails = Object.fromEntries(
    flatten(
      await Promise.all(
        chains.map((chain) =>
          loadEvmEntries(
            evmAddress,
            evmTokens.filter((t) => t.chainId === chain.chainId),
            chain.rpc,
            chain.chainId as number
          )
        )
      )
    )
  );
  console.log('amount details: ', amountDetails);
  dispatch(updateAmounts(amountDetails));
}

async function loadKawaiiSubnetAmount(dispatch: Dispatch, kwtSubnetAddress: string) {
  let amountDetails = Object.fromEntries(
    await loadEvmEntries(
      kwtSubnetAddress,
      kawaiiTokens.filter((t) => !!t.contractAddress),
      KAWAII_SUBNET_RPC,
      KWT_SUBNETWORK_EVM_CHAIN_ID
    )
  );
  // update amounts
  dispatch(updateAmounts(amountDetails));
}

type LoadTokenAmounts = (
  refresh: boolean,
  metamaskAddress?: string,
  cosmosAddress?: string,
  tronAddress?: string
) => void;

export default function useLoadTokens(): LoadTokenAmounts {
  const dispatch = useDispatch();
  return loadTokens.bind(null, dispatch);
}
