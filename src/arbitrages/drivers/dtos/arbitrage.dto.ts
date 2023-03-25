export interface ArbitrageDto {
  id?: string;
  pools: string;
  accountAddress: string;
  chainId: number;
  inputAmountsByToken: {
    [key: string]: string;
  };
  outputAmountsByToken: {
    [key: string]: string;
  };
  slippagePercentage: number;
  isOutputSlippage: boolean;
  profitWithRefund: boolean;
  gasFactor: number;
  gasPriceOffset: number;
  txRevertDeadline: number;
  intraBlock: boolean;
}
