/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.20.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { UseQueryOptions, useQuery, useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { StdFee } from "@cosmjs/amino";
import {AllowMsg, Uint128, Binary, AssetInfo, Addr, Cw20ReceiveMsg, TransferMsg, TransferBackMsg, UpdatePairMsg, DeletePairMsg, Amount, Coin, Cw20Coin, ChannelInfo, IbcEndpoint, AllowedInfo, PairQuery, MappingMetadata, ArrayOfPairQuery} from "./types";
import {InstantiateMsg, ExecuteMsg, QueryMsg, AdminResponse, AllowedResponse, ChannelResponse, ConfigResponse, ListAllowedResponse, ListChannelsResponse, PortResponse} from "./CwIcs20Latest.types";
import { CwIcs20LatestQueryClient, CwIcs20LatestClient } from "./CwIcs20Latest.client";
export interface CwIcs20LatestReactQuery<TResponse, TData = TResponse> {
  client: CwIcs20LatestQueryClient | undefined;
  options?: Omit<UseQueryOptions<TResponse, Error, TData>, "'queryKey' | 'queryFn' | 'initialData'"> & {
    initialData?: undefined;
  };
}
export interface CwIcs20LatestPairMappingsFromAssetInfoQuery<TData> extends CwIcs20LatestReactQuery<ArrayOfPairQuery, TData> {
  args: {
    assetInfo: AssetInfo;
  };
}
export function useCwIcs20LatestPairMappingsFromAssetInfoQuery<TData = ArrayOfPairQuery>({
  client,
  args,
  options
}: CwIcs20LatestPairMappingsFromAssetInfoQuery<TData>) {
  return useQuery<ArrayOfPairQuery, Error, TData>(["cwIcs20LatestPairMappingsFromAssetInfo", client?.contractAddress, JSON.stringify(args)], () => client ? client.pairMappingsFromAssetInfo({
    assetInfo: args.assetInfo
  }) : Promise.reject(new Error("Invalid client")), { ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}
export interface CwIcs20LatestPairMappingQuery<TData> extends CwIcs20LatestReactQuery<PairQuery, TData> {
  args: {
    key: string;
  };
}
export function useCwIcs20LatestPairMappingQuery<TData = PairQuery>({
  client,
  args,
  options
}: CwIcs20LatestPairMappingQuery<TData>) {
  return useQuery<PairQuery, Error, TData>(["cwIcs20LatestPairMapping", client?.contractAddress, JSON.stringify(args)], () => client ? client.pairMapping({
    key: args.key
  }) : Promise.reject(new Error("Invalid client")), { ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}
export interface CwIcs20LatestPairMappingsQuery<TData> extends CwIcs20LatestReactQuery<Addr, TData> {
  args: {
    limit?: number;
    order?: number;
    startAfter?: string;
  };
}
export function useCwIcs20LatestPairMappingsQuery<TData = Addr>({
  client,
  args,
  options
}: CwIcs20LatestPairMappingsQuery<TData>) {
  return useQuery<Addr, Error, TData>(["cwIcs20LatestPairMappings", client?.contractAddress, JSON.stringify(args)], () => client ? client.pairMappings({
    limit: args.limit,
    order: args.order,
    startAfter: args.startAfter
  }) : Promise.reject(new Error("Invalid client")), { ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}
export interface CwIcs20LatestListAllowedQuery<TData> extends CwIcs20LatestReactQuery<ListAllowedResponse, TData> {
  args: {
    limit?: number;
    order?: number;
    startAfter?: string;
  };
}
export function useCwIcs20LatestListAllowedQuery<TData = ListAllowedResponse>({
  client,
  args,
  options
}: CwIcs20LatestListAllowedQuery<TData>) {
  return useQuery<ListAllowedResponse, Error, TData>(["cwIcs20LatestListAllowed", client?.contractAddress, JSON.stringify(args)], () => client ? client.listAllowed({
    limit: args.limit,
    order: args.order,
    startAfter: args.startAfter
  }) : Promise.reject(new Error("Invalid client")), { ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}
export interface CwIcs20LatestAllowedQuery<TData> extends CwIcs20LatestReactQuery<AllowedResponse, TData> {
  args: {
    contract: string;
  };
}
export function useCwIcs20LatestAllowedQuery<TData = AllowedResponse>({
  client,
  args,
  options
}: CwIcs20LatestAllowedQuery<TData>) {
  return useQuery<AllowedResponse, Error, TData>(["cwIcs20LatestAllowed", client?.contractAddress, JSON.stringify(args)], () => client ? client.allowed({
    contract: args.contract
  }) : Promise.reject(new Error("Invalid client")), { ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}
export interface CwIcs20LatestAdminQuery<TData> extends CwIcs20LatestReactQuery<AdminResponse, TData> {}
export function useCwIcs20LatestAdminQuery<TData = AdminResponse>({
  client,
  options
}: CwIcs20LatestAdminQuery<TData>) {
  return useQuery<AdminResponse, Error, TData>(["cwIcs20LatestAdmin", client?.contractAddress], () => client ? client.admin() : Promise.reject(new Error("Invalid client")), { ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}
export interface CwIcs20LatestConfigQuery<TData> extends CwIcs20LatestReactQuery<ConfigResponse, TData> {}
export function useCwIcs20LatestConfigQuery<TData = ConfigResponse>({
  client,
  options
}: CwIcs20LatestConfigQuery<TData>) {
  return useQuery<ConfigResponse, Error, TData>(["cwIcs20LatestConfig", client?.contractAddress], () => client ? client.config() : Promise.reject(new Error("Invalid client")), { ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}
export interface CwIcs20LatestChannelQuery<TData> extends CwIcs20LatestReactQuery<ChannelResponse, TData> {
  args: {
    forward?: boolean;
    id: string;
  };
}
export function useCwIcs20LatestChannelQuery<TData = ChannelResponse>({
  client,
  args,
  options
}: CwIcs20LatestChannelQuery<TData>) {
  return useQuery<ChannelResponse, Error, TData>(["cwIcs20LatestChannel", client?.contractAddress, JSON.stringify(args)], () => client ? client.channel({
    forward: args.forward,
    id: args.id
  }) : Promise.reject(new Error("Invalid client")), { ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}
export interface CwIcs20LatestListChannelsQuery<TData> extends CwIcs20LatestReactQuery<ListChannelsResponse, TData> {}
export function useCwIcs20LatestListChannelsQuery<TData = ListChannelsResponse>({
  client,
  options
}: CwIcs20LatestListChannelsQuery<TData>) {
  return useQuery<ListChannelsResponse, Error, TData>(["cwIcs20LatestListChannels", client?.contractAddress], () => client ? client.listChannels() : Promise.reject(new Error("Invalid client")), { ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}
export interface CwIcs20LatestPortQuery<TData> extends CwIcs20LatestReactQuery<PortResponse, TData> {}
export function useCwIcs20LatestPortQuery<TData = PortResponse>({
  client,
  options
}: CwIcs20LatestPortQuery<TData>) {
  return useQuery<PortResponse, Error, TData>(["cwIcs20LatestPort", client?.contractAddress], () => client ? client.port() : Promise.reject(new Error("Invalid client")), { ...options,
    enabled: !!client && (options?.enabled != undefined ? options.enabled : true)
  });
}
export interface CwIcs20LatestUpdateAdminMutation {
  client: CwIcs20LatestClient;
  msg: {
    admin: string;
  };
  args?: {
    $fee?: number | StdFee | "auto";
    $memo?: string;
    $funds?: Coin[];
  };
}
export function useCwIcs20LatestUpdateAdminMutation(options?: Omit<UseMutationOptions<ExecuteResult, Error, CwIcs20LatestUpdateAdminMutation>, "mutationFn">) {
  return useMutation<ExecuteResult, Error, CwIcs20LatestUpdateAdminMutation>(({
    client,
    msg,
    args: {
      $fee,
      $memo,
      $funds
    } = {}
  }) => client.updateAdmin(msg, $fee, $memo, $funds), options);
}
export interface CwIcs20LatestAllowMutation {
  client: CwIcs20LatestClient;
  msg: {
    contract: string;
    gasLimit?: number;
  };
  args?: {
    $fee?: number | StdFee | "auto";
    $memo?: string;
    $funds?: Coin[];
  };
}
export function useCwIcs20LatestAllowMutation(options?: Omit<UseMutationOptions<ExecuteResult, Error, CwIcs20LatestAllowMutation>, "mutationFn">) {
  return useMutation<ExecuteResult, Error, CwIcs20LatestAllowMutation>(({
    client,
    msg,
    args: {
      $fee,
      $memo,
      $funds
    } = {}
  }) => client.allow(msg, $fee, $memo, $funds), options);
}
export interface CwIcs20LatestDeleteMappingPairMutation {
  client: CwIcs20LatestClient;
  msg: {
    denom: string;
    localChannelId: string;
  };
  args?: {
    $fee?: number | StdFee | "auto";
    $memo?: string;
    $funds?: Coin[];
  };
}
export function useCwIcs20LatestDeleteMappingPairMutation(options?: Omit<UseMutationOptions<ExecuteResult, Error, CwIcs20LatestDeleteMappingPairMutation>, "mutationFn">) {
  return useMutation<ExecuteResult, Error, CwIcs20LatestDeleteMappingPairMutation>(({
    client,
    msg,
    args: {
      $fee,
      $memo,
      $funds
    } = {}
  }) => client.deleteMappingPair(msg, $fee, $memo, $funds), options);
}
export interface CwIcs20LatestUpdateMappingPairMutation {
  client: CwIcs20LatestClient;
  msg: {
    assetInfo: AssetInfo;
    assetInfoDecimals: number;
    denom: string;
    localChannelId: string;
    remoteDecimals: number;
  };
  args?: {
    $fee?: number | StdFee | "auto";
    $memo?: string;
    $funds?: Coin[];
  };
}
export function useCwIcs20LatestUpdateMappingPairMutation(options?: Omit<UseMutationOptions<ExecuteResult, Error, CwIcs20LatestUpdateMappingPairMutation>, "mutationFn">) {
  return useMutation<ExecuteResult, Error, CwIcs20LatestUpdateMappingPairMutation>(({
    client,
    msg,
    args: {
      $fee,
      $memo,
      $funds
    } = {}
  }) => client.updateMappingPair(msg, $fee, $memo, $funds), options);
}
export interface CwIcs20LatestTransferToRemoteMutation {
  client: CwIcs20LatestClient;
  msg: {
    localChannelId: string;
    memo?: string;
    remoteAddress: string;
    remoteDenom: string;
    timeout?: number;
  };
  args?: {
    $fee?: number | StdFee | "auto";
    $memo?: string;
    $funds?: Coin[];
  };
}
export function useCwIcs20LatestTransferToRemoteMutation(options?: Omit<UseMutationOptions<ExecuteResult, Error, CwIcs20LatestTransferToRemoteMutation>, "mutationFn">) {
  return useMutation<ExecuteResult, Error, CwIcs20LatestTransferToRemoteMutation>(({
    client,
    msg,
    args: {
      $fee,
      $memo,
      $funds
    } = {}
  }) => client.transferToRemote(msg, $fee, $memo, $funds), options);
}
export interface CwIcs20LatestTransferMutation {
  client: CwIcs20LatestClient;
  msg: {
    channel: string;
    memo?: string;
    remoteAddress: string;
    timeout?: number;
  };
  args?: {
    $fee?: number | StdFee | "auto";
    $memo?: string;
    $funds?: Coin[];
  };
}
export function useCwIcs20LatestTransferMutation(options?: Omit<UseMutationOptions<ExecuteResult, Error, CwIcs20LatestTransferMutation>, "mutationFn">) {
  return useMutation<ExecuteResult, Error, CwIcs20LatestTransferMutation>(({
    client,
    msg,
    args: {
      $fee,
      $memo,
      $funds
    } = {}
  }) => client.transfer(msg, $fee, $memo, $funds), options);
}
export interface CwIcs20LatestReceiveMutation {
  client: CwIcs20LatestClient;
  msg: {
    amount: Uint128;
    msg: Binary;
    sender: string;
  };
  args?: {
    $fee?: number | StdFee | "auto";
    $memo?: string;
    $funds?: Coin[];
  };
}
export function useCwIcs20LatestReceiveMutation(options?: Omit<UseMutationOptions<ExecuteResult, Error, CwIcs20LatestReceiveMutation>, "mutationFn">) {
  return useMutation<ExecuteResult, Error, CwIcs20LatestReceiveMutation>(({
    client,
    msg,
    args: {
      $fee,
      $memo,
      $funds
    } = {}
  }) => client.receive(msg, $fee, $memo, $funds), options);
}