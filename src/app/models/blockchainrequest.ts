export class BlockChainRequest {
   jsonrpc: string;
   method: string;
   params: Params;
   id: number;
}

export class Params{
	type: number;
	chaincodeID: ChainCodeId;
	ctorMsg: CTorMessage;
	secureContext: string;
}

export class ChainCodeId{
	name: string;
}

export class CTorMessage{
	function: string;
	args: string[];
}