import {
    Address,
    Cell,
    type Contract,
    type ContractProvider,
    type Sender,
    beginCell,
    contractAddress,
} from "@ton/core";

export class Counter implements Contract {
    static createForDeploy(code: Cell, initialCounterValue: number): Counter {
        const data = beginCell().storeUint(initialCounterValue, 64).endCell();
        const workchain = 0; // deploy to workchain 0
        const address = contractAddress(workchain, { code, data });
        return new Counter(address, { code, data });
    }

    constructor(
        readonly address: Address,
        readonly init?: { code: Cell; data: Cell }
    ) {}

    async sendDeploy(provider: ContractProvider, via: Sender) {
        await provider.internal(via, {
            value: "0.01", // send 0.01 TON to contract for rent
            bounce: false,
        });
    }

    async sendIncrement(provider: ContractProvider, via: Sender) {
        const messageBody = beginCell()
            .storeUint(1, 32) // op (op #1 = increment)
            .storeUint(0, 64) // query id
            .endCell();
        await provider.internal(via, {
            value: "0.002", // send 0.002 TON for gas
            body: messageBody,
        });
    }

    async getCounter(provider: ContractProvider) {
        const { stack } = await provider.get("counter", []);
        return stack.readBigNumber();
    }
}
