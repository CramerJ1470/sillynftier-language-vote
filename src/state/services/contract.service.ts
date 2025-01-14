import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import ProgrammingLanguageVoteArtifact from '../../common/web3/artifacts/contracts/ProgrammingLanguageVote.sol/ProgrammingLanguageVote.json'
import { JsonRpcSigner, ethers } from "ethers";
import { ProgrammingLanguageVote } from "../../common/Web3/typechain-types";
import { RootState } from "../store";
import { getSigner } from "./wallet.service";

// 
let contractAbi = ProgrammingLanguageVoteArtifact.abi;
let contractAddress ="0xfC640EA61DE61E77B687B910DB812a98Cdc32DfE";
// let contractAddress = "0x034867Cac8Dd7316ED3D3D82409b6C78dd367696";


// const getContract = (signer: JsonRpcSigner) => new ethers.Contract(contractAddress, contractAbi, signer) as any as Web3Voting
const getContract = (signer: JsonRpcSigner) => new ethers.Contract(contractAddress, contractAbi, signer) as any as ProgrammingLanguageVote;
interface contractState {
    isLoading: boolean,
    isLoaded: boolean,
    errorLoading: boolean

    isVoted: boolean,
    isVoting: boolean,
    errorVoting: boolean,
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

    isVoted: false,
    isVoting: false,
    errorVoting: false,
    candidates: [
        {name: "Python",
            avatarURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/800px-Python-logo-notext.svg.png",
            voteCounter:  0,
            candidateId: 1,
        } ,{name: "Javascript",
        avatarURL: "https://www.freepnglogos.com/uploads/javascript-png/javascript-vector-logo-yellow-png-transparent-javascript-vector-12.png",
        voteCounter:  0,
        candidateId: 2,
        },   
],
    contractAddress
} as contractState;

export const fetchVoteState = createAsyncThunk<boolean, void, { state: RootState }>(
    'contract/fetchVoteState',
    async (_, { getState }) => {
        let state = getState();
        let signer = getSigner()
        if (signer == undefined || state.wallet.accountAddress == undefined) throw "Wallet not connected";
        let contract = getContract(signer);
        let isVoted = await contract.voters(state.wallet.accountAddress)
        return isVoted
    }
)

export const voteForCandidate = createAsyncThunk<void, number, { state: RootState }>(
    'contract/voteForCandidate',
    async (condidateId, { getState }) => {
        let state = getState();
        let signer = getSigner()
        if (signer == undefined || state.wallet.accountAddress == undefined) throw "Wallet not connected";
        let contract = getContract(signer);
        await contract.vote(condidateId)
    }
)

export const updateCandidateVote = createAsyncThunk<{ id: number, voteCount: number }, number, { state: RootState }>(
    'contract/updateCandidateVote',
    async (condidateId, { getState }) => {
        let state = getState();
        let signer = getSigner()
        if (signer == undefined || state.wallet.accountAddress == undefined) throw "Wallet not connected";
        let contract = getContract(signer);
        let candidate = await contract.candidates(condidateId)
        let ret = {
            id: Number(candidate.id),
            voteCount: Number(candidate.voteCount)
        }
        return ret
    }
)

export const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchVoteState.pending, (state, ) => {
            state.isLoading = true;
            state.isLoaded = false;
            state.errorLoading = false;


        }).addCase(fetchVoteState.fulfilled, (state, action) => {
            state.isLoaded = false;
            state.isLoaded = true;
            state.isVoted = action.payload
        }).addCase(fetchVoteState.rejected, (state, ) => {
            state.isLoading = false;
            state.isLoaded = false;
            state.errorLoading = true;

        }).addCase(voteForCandidate.pending, (state, ) => {
            state.isVoting = true;
            state.errorVoting = false;

        }).addCase(voteForCandidate.fulfilled, (state, ) => {
            state.isVoting = false;
            state.isVoted = true;

        }).addCase(voteForCandidate.rejected, (state, ) => {
            state.isVoting = false;
            state.errorVoting = true;
        }).addCase(updateCandidateVote.pending, (state,) => {
            state.isLoading = true;
            state.isLoaded = false;
            state.errorVoting = false;

        }).addCase(updateCandidateVote.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoaded = true;
            let candidate = state.candidates.find(x => x.candidateId == action.payload.id)
            if (!candidate) return state
            candidate.voteCounter = action.payload.voteCount

            return state

        }).addCase(updateCandidateVote.rejected, (state,) => {
            state.isLoading = false;
            state.isLoaded = false;
            state.errorLoading = true;
        })
    },
})