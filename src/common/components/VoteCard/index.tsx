import { useEffect } from "react";
import { AppDispatch, useAppSelector } from "../../../state/store";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { updateCandidateVote, voteForCandidate } from "../../../state/services/contract.service";

export default function VoteCard({ id }: { id: number }) {
	let candidate = useAppSelector((s) => s.contract.candidates.find((x) => x.candidateId == id));
	let isConnected = useAppSelector((s) => s.wallet.isConnected);
	let isVoted = useAppSelector((s) => s.contract.isVoted);
	const dispatch: AppDispatch = useDispatch();
	useEffect(() => {
		if (isConnected && isVoted ) dispatch(updateCandidateVote(id));
	}, [id, isConnected, isVoted]);

	return (
		<>
			{candidate && (
				<div className={styles.candidate} style={{backgroundColor:"rgb(177, 27, 187)", border:"solid rgb(138, 240, 36)",borderWidth: "5px",	borderRadius: "5px"}}>
					<div className={styles.avatar} style={{  backgroundImage: `url("${candidate.avatarURL}")` }}></div>
					<div className={styles.name}>{candidate.name}</div>
                    {isVoted && <div className={styles.totalvotes}>Total Votes {candidate.voteCounter}</div>}
					
					{!isVoted && <div className={styles.voteBtn}>
						<button
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								if (candidate) {
									dispatch(voteForCandidate(candidate.candidateId));
								}
							}}
							disabled={!isConnected || isVoted}
						>
							{isConnected ? <>Vote</> : <>Please Connect To Vote</>}
						</button>
					</div>}
				</div>
			)}
		</>
	);
}
