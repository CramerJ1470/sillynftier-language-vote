/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type {
  ProgrammingLanguageVote,
  ProgrammingLanguageVoteInterface,
} from "../ProgrammingLanguageVote";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_candidateId",
        type: "uint256",
      },
    ],
    name: "VoteEvent",
    type: "event",
  },
  {
    inputs: [],
    name: "candidateCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "candidates",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name1",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name2",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_candidateId",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "voters",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040518060400160405280600681526020017f507974686f6e000000000000000000000000000000000000000000000000000081525060009081610055919061049d565b506040518060400160405280600a81526020017f4a617661736372697074000000000000000000000000000000000000000000008152506001908161009a919061049d565b50610134600080546100ab906102b6565b80601f01602080910402602001604051908101604052809291908181526020018280546100d7906102b6565b80156101245780601f106100f957610100808354040283529160200191610124565b820191906000526020600020905b81548152906001019060200180831161010757829003601f168201915b50505050506101d260201b60201c565b6101cd60018054610144906102b6565b80601f0160208091040260200160405190810160405280929190818152602001828054610170906102b6565b80156101bd5780601f10610192576101008083540402835291602001916101bd565b820191906000526020600020905b8154815290600101906020018083116101a057829003601f168201915b50505050506101d260201b60201c565b6105e6565b600360008154809291906101e59061059e565b919050555060405180606001604052806003548152602001828152602001600081525060026000600354815260200190815260200160002060008201518160000155602082015181600101908161023c919061049d565b506040820151816002015590505050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806102ce57607f821691505b6020821081036102e1576102e0610287565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026103497fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261030c565b610353868361030c565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600061039a6103956103908461036b565b610375565b61036b565b9050919050565b6000819050919050565b6103b48361037f565b6103c86103c0826103a1565b848454610319565b825550505050565b600090565b6103dd6103d0565b6103e88184846103ab565b505050565b5b8181101561040c576104016000826103d5565b6001810190506103ee565b5050565b601f82111561045157610422816102e7565b61042b846102fc565b8101602085101561043a578190505b61044e610446856102fc565b8301826103ed565b50505b505050565b600082821c905092915050565b600061047460001984600802610456565b1980831691505092915050565b600061048d8383610463565b9150826002028217905092915050565b6104a68261024d565b67ffffffffffffffff8111156104bf576104be610258565b5b6104c982546102b6565b6104d4828285610410565b600060209050601f83116001811461050757600084156104f5578287015190505b6104ff8582610481565b865550610567565b601f198416610515866102e7565b60005b8281101561053d57848901518255600182019150602085019450602081019050610518565b8683101561055a5784890151610556601f891682610463565b8355505b6001600288020188555050505b505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006105a98261036b565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036105db576105da61056f565b5b600182019050919050565b6108ed806105f56000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80630121b93f146100675780633477ee2e1461008357806347c8efa7146100b55780634b67f6af146100d3578063a3ec138d146100f1578063a9a981a314610121575b600080fd5b610081600480360381019061007c9190610500565b61013f565b005b61009d60048036038101906100989190610500565b6102d1565b6040516100ac939291906105cc565b60405180910390f35b6100bd610383565b6040516100ca919061060a565b60405180910390f35b6100db610411565b6040516100e8919061060a565b60405180910390f35b61010b6004803603810190610106919061068a565b61049f565b60405161011891906106d2565b60405180910390f35b6101296104bf565b60405161013691906106ed565b60405180910390f35b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16156101cc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101c390610754565b60405180910390fd5b6000811180156101de57506003548111155b61021d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610214906107c0565b60405180910390fd5b6001600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555060026000828152602001908152602001600020600201600081548092919061029c9061080f565b9190505550807fc00232df16a35660dbcdde113a8565e8848dc6202169f47b8f35e8c2511d40bc60405160405180910390a250565b60026020528060005260406000206000915090508060000154908060010180546102fa90610886565b80601f016020809104026020016040519081016040528092919081815260200182805461032690610886565b80156103735780601f1061034857610100808354040283529160200191610373565b820191906000526020600020905b81548152906001019060200180831161035657829003601f168201915b5050505050908060020154905083565b6000805461039090610886565b80601f01602080910402602001604051908101604052809291908181526020018280546103bc90610886565b80156104095780601f106103de57610100808354040283529160200191610409565b820191906000526020600020905b8154815290600101906020018083116103ec57829003601f168201915b505050505081565b6001805461041e90610886565b80601f016020809104026020016040519081016040528092919081815260200182805461044a90610886565b80156104975780601f1061046c57610100808354040283529160200191610497565b820191906000526020600020905b81548152906001019060200180831161047a57829003601f168201915b505050505081565b60046020528060005260406000206000915054906101000a900460ff1681565b60035481565b600080fd5b6000819050919050565b6104dd816104ca565b81146104e857600080fd5b50565b6000813590506104fa816104d4565b92915050565b600060208284031215610516576105156104c5565b5b6000610524848285016104eb565b91505092915050565b610536816104ca565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561057657808201518184015260208101905061055b565b60008484015250505050565b6000601f19601f8301169050919050565b600061059e8261053c565b6105a88185610547565b93506105b8818560208601610558565b6105c181610582565b840191505092915050565b60006060820190506105e1600083018661052d565b81810360208301526105f38185610593565b9050610602604083018461052d565b949350505050565b600060208201905081810360008301526106248184610593565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006106578261062c565b9050919050565b6106678161064c565b811461067257600080fd5b50565b6000813590506106848161065e565b92915050565b6000602082840312156106a05761069f6104c5565b5b60006106ae84828501610675565b91505092915050565b60008115159050919050565b6106cc816106b7565b82525050565b60006020820190506106e760008301846106c3565b92915050565b6000602082019050610702600083018461052d565b92915050565b7f596f75206861766520616c726561647920566f74656421212100000000000000600082015250565b600061073e601983610547565b915061074982610708565b602082019050919050565b6000602082019050818103600083015261076d81610731565b9050919050565b7f496e76616c69642043616e646964617465204964212121000000000000000000600082015250565b60006107aa601783610547565b91506107b582610774565b602082019050919050565b600060208201905081810360008301526107d98161079d565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061081a826104ca565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361084c5761084b6107e0565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061089e57607f821691505b6020821081036108b1576108b0610857565b5b5091905056fea26469706673582212207ff77e23d8a8cd588677c340a7b605bf69d57f276c53e96c483b58714e82a60164736f6c634300081c0033";

type ProgrammingLanguageVoteConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProgrammingLanguageVoteConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ProgrammingLanguageVote__factory extends ContractFactory {
  constructor(...args: ProgrammingLanguageVoteConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      ProgrammingLanguageVote & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): ProgrammingLanguageVote__factory {
    return super.connect(runner) as ProgrammingLanguageVote__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProgrammingLanguageVoteInterface {
    return new Interface(_abi) as ProgrammingLanguageVoteInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ProgrammingLanguageVote {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as ProgrammingLanguageVote;
  }
}
