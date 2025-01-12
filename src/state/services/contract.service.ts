import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import Web3VotingContractArtifact from "../../common/Web3/artifacts/Web3Voting.json";
import { JsonRpcApiProvider,ethers } from 'ethers';
import { RootState } from '@reduxjs/toolkit/query';
import {BrowserProvider, JsonRpcSigner} from 'ethers';
import { getSigner } from './wallet.service';

let contractABI = Web3VotingContractArtifact.abi;

let contractAddress = "0x2a3f73A8d951CD79f222432C67B780AC3b7CE2d6";

const getContract = (signer:JsonRpcSigner) => new ethers.Contract(contractAddress,contractABI,signer) as any


interface contractState {
    isLoading: boolean,
    isLoaded: boolean,
    errorLoading:boolean,
    errorVoting:boolean,

    isVoted:boolean,
    isVoting:boolean,
    candidates: {
        name: string,
        voteCounter: number,
        avatarURL: string,
        candidateId: number
    }[],
    contractAddress: string,
}


const initialState = { 
    isLoading: false,
    isLoaded: false,
    errorLoading: false,
    errorVoting: false,
    
    isVoted:false,
    isVoting: false,
    candidates: [
        {name: "Kathy Hochul",
            avatarURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Kathy_Hochul_March_2024.jpg/220px-Kathy_Hochul_March_2024.jpg",
            voteCounter:  0,
            candidateId: 1,
        } ,{name: "Bruce Blakeman",
        avatarURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Blakeman_Profile_Picture.jpg/220px-Blakeman_Profile_Picture.jpg",
        voteCounter:  0,
        candidateId: 2,
        },   
],
    contractAddress
} as contractState;

export const fetchVoteState = createAsyncThunk<boolean ,number,{state:RootState}>(
    'contract/fetchVoteState',
    async (_, {getState}) => {
        let state = getState();
        let signer = getSigner();
        if(signer == undefined || contractAddress == undefined) throw "Wallet not connected";
        let contract = getContract(signer);
        let isVoted = await contract.voters(state.wallet.accountAddress);
        return isVoted;
    },
)

export const voteForCandidate = createAsyncThunk<void ,number,{state:RootState}>(
    'contract/voteForCandidate',
    async (_, {getState}) => {
        let state = getState();
        let signer = getSigner();
        if(signer == undefined || contractAddress == undefined) throw "Wallet not connected";
        let contract = getContract(signer);
        await contract.vote();
       
    },
)


export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(fetchVoteState.pending, (state,action) => {
        state.isLoading = true;
        state.isLoaded= false;
        state.errorLoading=false;
    }).addCase(fetchVoteState.fulfilled, (state,action) => {
        state.isLoading=false;
        state.isLoaded= true;
        state.isVoted=action.payload;
    }).addCase(fetchVoteState.rejected, (state,action) => {
        state.isLoading = false;
        state.isLoaded= false;
        state.errorLoading=true;
    }).addCase(voteForCandidate.pending, (state,action) => {
        state.isLoading = true;
        state.isLoaded= false;
        state.errorVoting=true;
    }).addCase(voteForCandidate.fulfilled, (state,action) => {
        state.isVoting=false;
        state.isVoted= true;
    }).addCase(voteForCandidate.rejected, (state,action) => {
        state.isLoading = false;
        state.isLoaded= false;
        state.errorVoting=true;
    })
  },
})

export const {  } = contractSlice.actions
export default contractSlice.reducer