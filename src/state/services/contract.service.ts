import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Web3VotingContractArtifact from '../../common/web3/artifacts/contracts/Web3Voting.sol/Web3Voting.json'
import { JsonRpcSigner, ethers } from "ethers";
import { Web3Voting } from "../../common/web3/typechain-types";
import { RootState } from "../store";
import { getSigner } from "./wallet.service";

let contractAbi = Web3VotingContractArtifact.abi;
let contractAddress = "0x034867Cac8Dd7316ED3D3D82409b6C78dd367696";


const getContract = (signer: JsonRpcSigner) => new ethers.Contract(contractAddress, contractAbi, signer) as any as Web3Voting
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
        builder.addCase(fetchVoteState.pending, (state, action) => {
            state.isLoading = true;
            state.isLoaded = false;
            state.errorLoading = false;


        }).addCase(fetchVoteState.fulfilled, (state, action) => {
            state.isLoaded = false;
            state.isLoaded = true;
            state.isVoted = action.payload
        }).addCase(fetchVoteState.rejected, (state, action) => {
            state.isLoading = false;
            state.isLoaded = false;
            state.errorLoading = true;

        }).addCase(voteForCandidate.pending, (state, action) => {
            state.isVoting = true;
            state.errorVoting = false;

        }).addCase(voteForCandidate.fulfilled, (state, action) => {
            state.isVoting = false;
            state.isVoted = true;

        }).addCase(voteForCandidate.rejected, (state, action) => {
            state.isVoting = false;
            state.errorVoting = true;
        }).addCase(updateCandidateVote.pending, (state, action) => {
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

        }).addCase(updateCandidateVote.rejected, (state, action) => {
            state.isLoading = false;
            state.isLoaded = false;
            state.errorLoading = true;
        })
    },
})