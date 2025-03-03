import React, { useEffect, useState } from 'react';
import './style.css';
import AccuseModal from '../../../components/modal/accuse';
import { deleteCommentRequest, deleteLikeRequest, getDiscussionRequest, getVoteResultRequest, patchCommentRequest, postCommentRequest, postLikeRequest, postVoteRequest } from '../../../apis';
import Comment from '../../../types/Comment.interface';
import { usePagination } from '../../../hooks';
import PostCommentRequestDto from '../../../apis/dto/request/comment/post-comment.request.dto';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, GEN_DISC_ABSOLUTE_PATH } from '../../../constants';
import ResponseDto from '../../../apis/dto/response/response.dto';
import { GetDiscussionResponseDto } from '../../../apis/dto/response/gd_discussion';
import DiscussionData from '../../../types/discussionData.interface';
import { useCategoryStore, useSignInUserStore } from '../../../stores';
import PatchCommentRequestDto from '../../../apis/dto/request/comment/patch-comment.request.dto';
import PostVoteRequestDto from '../../../apis/dto/request/vote/post-vote.request.dto';
import GetVoteResultResponseDto from '../../../apis/dto/response/vote/get-vote-result.response.dto';
import useLikeStore from '../../../stores/like-state.store';


// interface: 댓글 Props //
interface commentProps {
    comment: Comment
    depth: number
    getDiscussion:()=>void;
    postLike:(targetId:number, userId:string ,likeType:string)=>void
    click: {[key: number]: boolean}
    
}
function Comments({ comment, depth, getDiscussion, postLike, click}: commentProps) {

    const { roomId } = useParams();
    const [cookies] = useCookies();
    const [commentOptions, setCommentOptions] = useState<{ [key: number]: boolean }>({});
    const [newReply, setNewReply] = useState<string>('');
    const [replyTo, setReplyTo] = useState<number | null>(null);
    const [subReplyTo, setSubReplyTo] = useState<number | null>(null);
    const [nestedReplyTo, setNestedReplyTo] = useState<number | null>(null);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [editCotents, setEditContents] = useState<{ [key: number]: boolean }>({});
    const { signInUser } = useSignInUserStore();
    
    const discussionId = signInUser?.userId ?? "";


    const editContentsHandler = (commentId:number) =>{
        setEditContents((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
        setCommentOptions((prev) => ({
            ...prev,
            [commentId]: false,
        }));
        setNewReply('');
    }
    const openReportModal = () => {
        setIsReportModalOpen(!isReportModalOpen);
    };

    const closeReportModal = () => {
        setIsReportModalOpen(!isReportModalOpen);
    };

    // function: 대댓글 수정 response 처리 //
    const patchCommentResponse = (responseBody:ResponseDto | null) => {
        const message =
        !responseBody ? '서버에 문제가 있습니다. ' :
            responseBody.code === 'AF' ? '접근이 잘못되었습니다. ' :
                responseBody.code === 'NC' ? '존재하지 않는 댓글입니다. ' :
                    responseBody.code ==='NP' ? '잘못된 접근입니다. ' :
                        responseBody.code === 'DBE' ? '서버에 문제가 있습니다. ' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
        alert(message);
        return;
    }
    }
    // event handler: 댓글 수정 이벤트 처리 //
    const handleEditComment = (commentId: number) => {
        const accessToken = cookies[ACCESS_TOKEN];
        if (!roomId || !accessToken || !commentId) return;
        const requestBody :PatchCommentRequestDto = { contents:newReply};
        patchCommentRequest(requestBody,roomId,commentId,accessToken).then(patchCommentResponse);

        setEditContents((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
        setCommentOptions((prev) => ({
            ...prev,
            [commentId]: false,
        }));
    };

    // function: 댓글 삭제 response 처리 //
    const deleteCommentResponse = (responseBody:ResponseDto | null) => {
        const message =
        !responseBody ? '서버에 문제가 있습니다. ' :
            responseBody.code === 'AF' ? '접근이 잘못되었습니다. ' :
                responseBody.code === 'NC' ? '존재하지 않는 댓글입니다. ' :
                    responseBody.code ==='NP' ? '잘못된 접근입니다. ' :
                        responseBody.code === 'DBE' ? '서버에 문제가 있습니다. ' : '';
        
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }
    }

    // event handler: 댓글 삭제 이벤트 처리 //
    const handleDeleteComment = (commentId: number) => {
        const accessToken = cookies[ACCESS_TOKEN];
        
        if (!discussionId || !roomId || !commentId || !accessToken) return;

        deleteCommentRequest(roomId,commentId,discussionId,accessToken).then(deleteCommentResponse);
        setCommentOptions((prev) => ({
            ...prev,
            [commentId]: false,
        }));
    };

    const toggleCommentOptions = (commentId: number) => {
        setCommentOptions((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    // function: post comment response 처리 함수 //
    const postCommentResponse = (responseBody: ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다. ' :
                responseBody.code === 'AF' ? '접근이 잘못되었습니다. ' :
                    responseBody.code === 'NR' ? '존재하지 않는 토론방입니다. ' :
                        responseBody.code === 'DBE' ? '서버에 문제가 있습니다. ' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }
    }

    // event handler: 대댓글 작성하기 버튼 클릭 이벤트 처리 //
    const handleReplySubmit = async(commentId: number) => {

        const accessToken = cookies[ACCESS_TOKEN];
        if (!roomId || !accessToken || !discussionId) return;
        const requestBody: PostCommentRequestDto = {
            userId: discussionId, contents: newReply, discussionType: '찬성', parentId: commentId
        }

        await postCommentRequest(requestBody, roomId, accessToken).then(postCommentResponse);
        setNewReply('');
        
        if(replyTo || subReplyTo || nestedReplyTo){
            setReplyTo(null);
            setSubReplyTo(null);
            setNestedReplyTo(null);
        }
        await getDiscussion();
    };


    return (
        <div>
            <div key={comment.commentId} className='comment-info'>
                {!editCotents[comment.commentId] ? <div className='comment-item-box'>
                    <div className="comment-user-info">
                        <div className='comment-user'>
                            <div className="profile-image" 
                                style={{backgroundImage: `url(${comment.profileImage ? 
                                comment.profileImage : '/defaultProfile.png'})`}}>
                            </div>
                            <div>
                                <div className='comment-user-nickname'>{comment.nickName}</div>
                                <div className='comment-date-and-modify'>
                                    <div className="comment-date">{comment.createdAt}</div>
                                    <div className="modify">{comment.updateStatus ? '(수정됨)' : ''}</div>
                                </div>
                            </div>
                        </div>
                        {!comment.deleteStatus && <div className='reply-option'>
                            <div className='comment-recommendation-icon-and-count'>
                                <div className={`recommendation-icon ${ click[comment.commentId] ? 'active' : ''}`} onClick={()=>postLike(comment.commentId,discussionId,'COMMENT')}></div>
                                <div className='recommendation-count'>{comment.likeCount}</div>
                                {discussionId === comment.userId ? (
                                    <div className='comment-option' onClick={() => toggleCommentOptions(comment.commentId)}>⋮</div>
                                ) : (
                                    <div className='siren-button' onClick={() => openReportModal()}></div>
                                )}
                            </div>
                            {commentOptions[comment.commentId] && (
                                <div className='dropdown-menu-box'>
                                    <div className='dropdown-menu'>
                                        <div className='dropdown-item' onClick={() => editContentsHandler(comment.commentId)}>수정하기</div>
                                        <div className='dropdown-item' onClick={() => handleDeleteComment(comment.commentId)}>삭제하기</div>
                                    </div>
                                </div>
                            )}
                        </div>}
                    </div>
                        <div className="comment-content">{comment.deleteStatus ? '삭제된 메세지 입니다. ' : comment.contents}</div>
                        {!comment.deleteStatus && <div className="reply"><span onClick={() => setReplyTo(comment.commentId)}>댓글 쓰기</span></div>}
                    <hr />
                </div> : 
                <div className='reply-box' style={{ marginLeft: '20px', marginRight: '0' }}>
                        <div className='reply-textarea-and-button'>
                            <textarea
                                className='input-reply-text'
                                placeholder={comment.contents}
                                value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                            />
                            <div className='comment-button-box'>
                                <button className='comment-button' type='button' onClick={() => editContentsHandler(comment.commentId)}>취소</button>
                                <button className='comment-button' type='button' onClick={() => handleEditComment(comment.commentId)}>수정하기</button>
                            </div>
                        </div>
                </div>}
                {replyTo === comment.commentId && (
                    <div className='reply-box' style={{ marginLeft: '20px', marginRight: '0' }}>
                        <div className='reply-textarea-and-button'>
                            <textarea
                                className='input-reply-text'
                                placeholder='댓글을 입력해주세요. '
                                onChange={(e) => setNewReply(e.target.value)}
                            />
                            <div className='comment-button-box'>
                                <button className='comment-button' type='button' onClick={()=>setReplyTo(null)}>취소</button>
                                <button className='comment-button' type='button' onClick={() => handleReplySubmit(comment.commentId)}>작성하기</button>
                            </div>
                        </div>
                    </div>
                )}
                {comment.replies && comment.replies.filter(reply => reply.parentId === comment.commentId).map((reply, index) => (
                    <div key={index} className="reply" style={{ marginLeft: (reply.depth ?? 1) * 20 + "px" }}>
                        {!editCotents[reply.commentId] ? <div className='reply-item-box'>
                            <div className="comment-user-info">
                                <div className='comment-user'>
                                <div className="profile-image" 
                                style={{backgroundImage: `url(${reply.profileImage ? 
                                    reply.profileImage : '/defaultProfile.png'})`}}>
                                </div>
                                    <div>
                                        <div className='comment-user-nickname'>{reply.nickName}</div>
                                        <div className='comment-date-and-modify'>
                                            <div className="comment-date">{reply.createdAt}</div>
                                            <div className="modify">(수정됨)</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {!reply.deleteStatus && <div className='reply-option'>
                                        <div className='comment-recommendation-icon-and-count'>
                                            <div className={`recommendation-icon ${click[reply.commentId] ? 'active' : ''}`} onClick={()=>postLike(reply.commentId,discussionId,'COMMENT')}></div>
                                            <div className='recommendation-count'>{reply.likeCount}</div>
                                        </div>
                                        {discussionId === reply.userId ? (
                                            <div className='comment-option' onClick={() => toggleCommentOptions(reply.commentId)}>⋮</div>
                                        ) : (
                                            <div className='siren-button' onClick={() => openReportModal()}></div>
                                        )}
                                        {commentOptions[reply.commentId] && (
                                            <div className='dropdown-menu-box'>
                                                <div className='dropdown-menu'>
                                                    <div className='dropdown-item' onClick={() => editContentsHandler(reply.commentId)}>수정하기</div>
                                                    <div className='dropdown-item' onClick={() => handleDeleteComment(reply.commentId)}>삭제하기</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>}
                            </div>
                            </div>
                            <div className="comment-content">{reply.deleteStatus ? '삭제된 메세지 입니다. ': reply.contents}</div>
                            {!reply.deleteStatus && <div className="reply"><span onClick={() => setSubReplyTo(reply.commentId)}>댓글 쓰기</span></div> }
                            <hr />
                        </div> : 
                            <div className='reply-box' style={{ marginLeft: '20px', marginRight: '0' }}>
                                <div className='reply-textarea-and-button'>
                                    <textarea
                                        className='input-reply-text'
                                        placeholder={reply.contents}
                                        onChange={(e) => setNewReply(e.target.value)}
                                    />
                                    <div className='comment-button-box'>
                                        <button className='comment-button' type='button' onClick={() => editContentsHandler(reply.commentId)}>취소</button>
                                        <button className='comment-button' type='button' onClick={() => handleEditComment(reply.commentId)}>수정하기</button>
                                    </div>
                                </div>
                            </div>}
                        {subReplyTo === reply.commentId && (
                            <div className='reply-box' style={{ marginLeft: (reply.depth) * 20 + "px", marginRight: '0' }}>
                                <div className='reply-textarea-and-button'>
                                    <textarea
                                        className='input-reply-text'
                                        placeholder='댓글을 입력해주세요. '
                                        onChange={(e) => setNewReply(e.target.value)}
                                    />
                                    <div className='comment-button-box'>
                                        <button className='comment-button' type='button' onClick={() => setSubReplyTo(null)}>취소</button>
                                        <button className='comment-button' type='button' onClick={() => handleReplySubmit(reply.commentId)}>작성하기</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {reply.replies && reply.replies.map((nestedReply) => (
                            <div key={nestedReply.commentId} className="reply" style={{ marginLeft: (nestedReply.depth) * 20 + "px" }}>
                                {!editCotents[nestedReply.commentId] ? <div className='reply-item-box'>
                                    <div className="comment-user-info">
                                        <div className='comment-user'>
                                            <div className="profile-image"
                                                style={{backgroundImage: `url(${nestedReply.profileImage ? 
                                                    nestedReply.profileImage : '/defaultProfile.png'})`}}
                                            ></div>
                                            <div>
                                                <div className='comment-user-nickname'>{nestedReply.nickName}</div>
                                                <div className='comment-date-and-modify'>
                                                    <div className="comment-date">{nestedReply.createdAt}</div>
                                                    <div className="modify">{nestedReply.updateStatus ? '(수정됨)' : ''}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {!nestedReply.deleteStatus && <div className='reply-option'>
                                                <div className='comment-recommendation-icon-and-count'>
                                                    <div className={`recommendation-icon ${click[nestedReply.commentId] ? 'active' : ''}`} onClick={()=>postLike(nestedReply.commentId,discussionId,'COMMENT')}></div>
                                                    <div className='recommendation-count'>{nestedReply.likeCount}</div>
                                                </div>
                                                {discussionId === nestedReply.userId ? (
                                                    <div className='comment-option' onClick={() => toggleCommentOptions(nestedReply.commentId)}>⋮</div>
                                                ) : (
                                                    <div className='siren-button' onClick={() => openReportModal()}></div>
                                                )}
                                                {commentOptions[nestedReply.commentId] && (
                                                    <div className='dropdown-menu-box'>
                                                        <div className='dropdown-menu'>
                                                            <div className='dropdown-item' onClick={() => editContentsHandler(nestedReply.commentId)}>수정하기</div>
                                                            <div className='dropdown-item' onClick={() => handleDeleteComment(nestedReply.commentId)}>삭제하기</div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="comment-content">{nestedReply.deleteStatus ? '삭제된 메세지 입니다. ' : nestedReply.contents}</div>
                                    {!nestedReply.deleteStatus && <div className="reply"><span onClick={() => setNestedReplyTo(nestedReply.commentId)}>댓글 쓰기</span></div>}
                                    <hr />
                                </div>:
                                    <div className='reply-box' style={{ marginLeft: '20px', marginRight: '0' }}>
                                        <div className='reply-textarea-and-button'>
                                            <textarea
                                                className='input-reply-text'
                                                placeholder={nestedReply.contents}
                                                value={newReply}
                                                onChange={(e) => setNewReply(e.target.value)}
                                            />
                                            <div className='comment-button-box'>
                                                <button className='comment-button' type='button' onClick={() => editContentsHandler(nestedReply.commentId)}>취소</button>
                                                <button className='comment-button' type='button' onClick={() => handleEditComment(nestedReply.commentId)}>수정하기</button>
                                            </div>
                                        </div>
                                    </div>}
                                {nestedReplyTo === nestedReply.commentId && (
                                    <div className='reply-box' style={{ marginLeft: (nestedReply.depth ?? 1) * 20 + "px", marginRight: '0' }}>
                                        <div className='reply-textarea-and-button'>
                                            <textarea
                                                className='input-reply-text'
                                                placeholder='댓글을 입력해주세요. '
                                                onChange={(e) => setNewReply(e.target.value)}
                                            />
                                            <div className='comment-button-box'>
                                                <button className='comment-button' type='button' onClick={()=>setNestedReplyTo(null)}>취소</button>
                                                <button className='comment-button' type='button' onClick={() => handleReplySubmit(nestedReply.commentId)}>작성하기</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

// interface: 투표 Props//
interface voteProps {
    agreeOpinion: string | undefined;
    oppositeOpinion: string | undefined;
    opinionAgreeUsers: number;
    opinionOppositeUsers: number;
    getVoteResult:()=>void;
}

// component: 찬/반 의견 선택 컴포넌트 //
function OpinionSelector({ agreeOpinion, oppositeOpinion, opinionAgreeUsers, opinionOppositeUsers,getVoteResult }: voteProps) {
    const [selectedOpinion, setSelectedOpinion] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [cookies] = useCookies();
    const {roomId} = useParams();
    const {signInUser} = useSignInUserStore();
    const discussionId = Number(roomId);
    const isVoted = signInUser?.isVoted.find((room) => {return room.roomId === discussionId && room.isVoted === true})

    const handleOpinionChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setSelectedOpinion(event.target.value);
    };

    // function: 투표하기 post vote response 처리 //
    const postVoteResponse = (responseBody:ResponseDto | null) => {
        const message = !responseBody ? '서버에 문제가 있습니다.' :
                    responseBody.code === 'VF' ? '투표를 해주세요. ':
                    responseBody.code === 'DV' ? '이미 처리된 투표 입니다. ':
                    responseBody.code === 'NR' ? '존재하지 않는 토론방 입니다. ':
                    responseBody.code === 'NP' ? '잘못된 접근입니다. ':
                    responseBody.code === 'AF' ? '잘못된 접근입니다.  ': 
                    responseBody.code === 'DBE' ? '서버에 문제가 있습니다. ': '';
        const isSuccessd = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessd) {
            alert(message);
            return;
        }
    };

    // event handler: 찬`반 투표하기 이벤트 처리 //
    const handleSubmit = async() => {
        
        const accessToken = cookies[ACCESS_TOKEN];
        const userId = signInUser?.userId;
        if (!roomId || !accessToken || !userId) return;
        const requestBody:PostVoteRequestDto = {voteChoice:selectedOpinion};

        if (selectedOpinion) {
            await postVoteRequest(requestBody, userId, roomId, accessToken).then(postVoteResponse);
            setSubmitted(!submitted);
        } else {
            alert("의견을 선택해 주세요.");
        }
        await getVoteResult();
        
    };

    return (
        <div>
            <div className='vote-opinions'>
                <div>
                    <label>
                        {<input
                            type="radio"
                            value={agreeOpinion}
                            checked={selectedOpinion === agreeOpinion}
                            onChange={handleOpinionChange}
                        />}
                        {agreeOpinion}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={oppositeOpinion}
                            checked={selectedOpinion === oppositeOpinion}
                            onChange={handleOpinionChange}
                        />
                        {oppositeOpinion}
                    </label>
                </div>
                {!isVoted && <button className='vote-select-button' onClick={handleSubmit}>선택 완료하기</button>}
            </div>
            {(submitted || isVoted) && (
                <div className="bar-container">
                    <div className="bar">
                        <div className="bar-a" style={{ width: `${opinionAgreeUsers}%` }} />
                        <div className="bar-b" style={{ width: `${opinionOppositeUsers}%` }} />
                    </div>
                    <div className="percentage-labels">
                        <span className="label-a">{opinionAgreeUsers}%</span>
                        <span className="label-b">{opinionOppositeUsers}%</span>
                    </div>
                </div>
            )}
        </div>
    );
};

// component: 일반 토론방 컴포넌트 //
export default function GDDetail() {

    // state: 로그인 유저 정보 상태 //
    const { signInUser } = useSignInUserStore();
    

    const { roomId } = useParams();
    
    const roomIdNumber = Number(roomId);
    const discussionId = signInUser?.userId ?? "";

    
    
    const [discussionData, setDiscussionData] = useState<DiscussionData | null>(null);
    const [cookies] = useCookies();

    const [opinionAgreeUsers, setOpinionAgreeUsers] = useState<number>(0);
    const [opinionOppositeUsers, setOpinionOppositeUsers] = useState<number>(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOptionOpen, setIsDropdownOptionOpen] = useState(false);
    const [isDropdownCommentOptionOpen, setIsDropdownCommentOptionOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>('정렬순');
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const {category, setCategory} = useCategoryStore();
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [commentId] = useState<number>();
    const { likeClick, setLikeClick, toggleLike } = useLikeStore();
    const [comment] = useState<Comment>();
    const commentNumber = Number(comment?.commentId);

    // variable: 좋아요 여부 상태 //
    const isLiked = !!signInUser?.isLikePost.find((like)=>{return like.roomId === roomIdNumber && like.isPostLike === true}) 
    const isLikedComment = !!signInUser?.isLikeComment.find((like)=>{return like.commentId === commentNumber && like.isCommentLike === true})
    


    // state: 원본 리스트 상태 //
    const [originalList, setOriginalList] = useState<Comment[]>([]);

    // state: 페이징 관련 상태 //
    const {
        currentPage,
        viewList,
        pageList,
        setViewList,
        setTotalList,
        initViewList } = usePagination<Comment>();
    
    // function: 네비게이션 처리 함수 //
    const navigator = useNavigate();

    // event handler: 프로필 클릭 이벤트 처리 //
    const onProfileClickHandler = () => {
        // 다른 유저 프로필 보기 화면이 있어야 구현 가능
    }

    const openReportModal = () => {
        setIsReportModalOpen(!isReportModalOpen);
    };

    const closeReportModal = () => {
        setIsReportModalOpen(!isReportModalOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleDropdownOption = () => {
        setIsDropdownOptionOpen(!isDropdownOptionOpen);
    };


    const handleOptionSelect = (option: string) => {
        if (option === '수정하기' || option === '삭제하기') {
            setIsDropdownOptionOpen(false);
            setIsDropdownCommentOptionOpen(false);

        } else {
            setSelectedOption(option);
            setIsDropdownOptionOpen(false);
            setIsDropdownCommentOptionOpen(false);

        }
    };

    // event handler: 토론방 카테고리 클릭 이벤트 처리 함수 //
    const onCategoryClickHandler = () => {
        if(!discussionData?.discussionType) return;
        navigator(GEN_DISC_ABSOLUTE_PATH);
        setCategory(discussionData.discussionType);
    }

    // function: post comment response 처리 함수 //
    const postCommentResponse = async(responseBody: ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다. ' :
                responseBody.code === 'AF' ? '접근이 잘못되었습니다. ' :
                    responseBody.code === 'NR' ? '존재하지 않는 토론방입니다. ' :
                        responseBody.code === 'DBE' ? '서버에 문제가 있습니다. ' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }
    }

    // event handler: 댓글 작성하기 버튼 클릭 이벤트 처리 //
    const handleCommentSubmit = async() => {

        const accessToken = cookies[ACCESS_TOKEN];
        if (!accessToken || !discussionId || !roomId) return;

        const requestBody: PostCommentRequestDto = {
            userId: discussionId, contents: newComment, discussionType: '찬성', parentId: commentId
        }
        await postCommentRequest(requestBody, roomId, accessToken).then(postCommentResponse);
        setNewComment('');
        await getDiscussion();
    };

    // function: get dicussion response 처리 //
    const getDiscussionResponse = (responseBody: GetDiscussionResponseDto | ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다. ' :
                responseBody.code === 'DBE' ? '서버에 문제가 있습니다. ' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }
        if ("discussionResultSet" in responseBody) {
            setDiscussionData(responseBody.discussionResultSet);
            setComments(responseBody.comments);

            setTotalList(responseBody.comments);
            setOriginalList(responseBody.comments);
            setViewList(responseBody.comments)
        } else {
            alert('서버 응답이 올바르지 않습니다.');
        }
    }

    // function: 토론 정보 불러 오기 함수 //
    const getDiscussion = async() => {

        const accessToken = cookies[ACCESS_TOKEN];
        if (!accessToken) {
            alert('토큰 오류');
            return;
        }
        await getDiscussionRequest(roomIdNumber, accessToken).then(getDiscussionResponse);
    }
    // function: 토론방 투표 결과 가져오기 response 처리 //
    const getVoteResultResponse = (responseBody:GetVoteResultResponseDto | ResponseDto | null) => {
        const message = !responseBody ? '서버에 문제가 있습니다. ':
            responseBody.code === 'AF' ? '잘못된 접근입니다. ':
            responseBody.code === 'NR' ? '존재하지 않는 토론방입니다. ':
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다. ': '';
        const isSuccessd = responseBody!== null && responseBody.code === 'SU';
        if (!isSuccessd){
            alert(message);
            return;
        }
        const {voteResult} = responseBody as GetVoteResultResponseDto;

        if (!voteResult || voteResult.length === 0) {
            setOpinionAgreeUsers(0);
            setOpinionOppositeUsers(0);
            return;
        }
        
        const agreeCount = voteResult.filter(agree => agree.voteChoice === discussionData?.agreeOpinion).length;
        const oppositeCount = voteResult.filter(opposite => opposite.voteChoice === discussionData?.oppositeOpinion).length;
        const totalVotes = voteResult.length;
        
        const agreePercentage = totalVotes > 0 ? (agreeCount / totalVotes) * 100 : 0;
        const oppositePercentage = totalVotes > 0 ? (oppositeCount / totalVotes) * 100 : 0;
        
        setOpinionAgreeUsers(Math.round(agreePercentage * 10) / 10);
        setOpinionOppositeUsers(Math.round(oppositePercentage * 10) / 10);
    }

    // function: 토론방 투표 결과 list 불러오 기 함수 // 
    const getVoteResult = async() => {
        const accessToken = cookies[ACCESS_TOKEN];
        if (!accessToken || !roomId) return;

        await getVoteResultRequest(roomId,accessToken).then(getVoteResultResponse);
    }

    // function: post like response 처리 함수 //
    const postLikeResponse = (responseBody: ResponseDto | null) => {
        const message = !responseBody ? '서버에 문제가 있습니다. ': 
            responseBody.code === 'AF' ? '잘못된 접근입니다. ':
            responseBody.code === 'DL' ? '중복된 값입니다. ':
            responseBody.code === 'NR' ? '존재하지 않는 토론방입니다. ':
            responseBody.code === 'NM' ? '존재하지 않는 댓글입니다. ':
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다. ': '';
        const isSuccessd = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessd){
            alert(message);
        }
    }

    // function: delete like response 처리 함수 //
    const deleteLikeResponse = (responseBody: ResponseDto | null) => {
        const message = !responseBody ? '서버에 문제가 있습니다. ': 
            responseBody.code === 'AF' ? '잘못된 접근입니다. ':
            responseBody.code === 'NT' ? '잘못된 게시물(댓글)입니다. ':
            responseBody.code === 'NP' ? '잘못된 접근입니다. ':
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다. ': '';
        const isSuccessd = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessd){
            alert(message);
        }
    }
    
    // event handler: 좋아요 버튼 클릭 이벤트 처리 // 
    const onLikeClickHandler = async (targetId: number, userId: string, likeType: string) => {
        const accessToken = cookies[ACCESS_TOKEN];
    
        if (!accessToken || !targetId || !likeType || !userId) return;
        toggleLike(targetId);
        
        const currentLikeClick = likeClick[targetId] ?? false;  // 상태 값 사용
        if (currentLikeClick) {
            await postLikeRequest(targetId, likeType, userId, accessToken).then(postLikeResponse);
        } else {
            await deleteLikeRequest(targetId, likeType, userId, accessToken).then(deleteLikeResponse);
        }

        await getDiscussion(); 
    };

    // Effect: 토론 정보 불러오기 //
    useEffect(() => {
        getDiscussion();
        getVoteResult();
    

    }, [roomIdNumber]);

    return (
        <div id="gd-detail-wrapper">
            <div className="gd-detail-wrapper-in">
                <div className='gd-detail-box'>
                    <div className="gd-detail-category">
                        <div className="width-line" onClick={onCategoryClickHandler}><span>{discussionData?.discussionType}</span></div>
                    </div>
                    <div className="post-info">
                        <div className="post-user-info">
                            <div className="profile-image" style={{ backgroundImage: `url(${discussionData?.profileImage || '/defaultProfile.png'})` }}></div>
                            <div>
                                <div className='user-nickname'>{discussionData?.nickName}</div>
                                <div className='post-date-and-modify'>
                                    <div className="post-date">{discussionData?.createdRoom}</div>
                                    <div className="modify">{discussionData?.updateStatus ? '(수정됨)' : ''}</div>
                                </div>
                            </div>
                        </div>
                        <div className='status-and-option'>
                            <div className='status'>진행 중</div>
                            {discussionId === discussionData?.userId ? (
                                <div className='option' onClick={toggleDropdownOption}>⋮</div>
                            ) : (
                                <div className="siren-button" onClick={() => openReportModal()}></div>
                            )}
                        </div>
                    </div>
                    {isDropdownOptionOpen && (
                        <div className='dropdown-menu-box'>
                            <div className='dropdown-menu'>
                                <div className='dropdown-item' onClick={() => handleOptionSelect('수정하기')}>수정하기</div>
                                <div className='dropdown-item' onClick={() => handleOptionSelect('삭제하기')}>삭제하기</div>
                            </div>
                        </div>
                    )}
                    {isReportModalOpen && (
                        <AccuseModal cancelHandler={closeReportModal} discussionData={discussionData} />
                    )}
                    <div className="discussion-info">
                        <div className="discussion-image" style={{ backgroundImage: `url(${discussionData?.discussionImage})` }}></div>
                        <div className="discussion-text-info">
                            <div className="discussion-title">{discussionData?.roomTitle}</div>
                            <div className="deadline">마감: {discussionData?.discussionEnd}</div>
                            <div className="discussion-content">{discussionData?.roomDescription}</div>
                        </div>
                    </div>
                    <div className="vote-info">
                        <OpinionSelector agreeOpinion={discussionData?.agreeOpinion} oppositeOpinion={discussionData?.oppositeOpinion} opinionAgreeUsers={opinionAgreeUsers} opinionOppositeUsers={opinionOppositeUsers} getVoteResult={getVoteResult}/>
                    </div>
                    <div className="comment-and-recommendation">
                        <div className="comment-icon"></div>
                        <div className="comment-count">{discussionData?.commentCount}</div> 
                        <div className={`recommendation-icon ${!!likeClick[roomIdNumber] ? 'active':''}`} onClick={()=>onLikeClickHandler(roomIdNumber, discussionId,'POST')}></div>
                        <div className="recommendation-count">{discussionData?.likeCount}</div>
                    </div>
                    <hr />
                    <div className='comment-box'>
                        <div className='comment-input-and-button'>
                            <div className='input-comment'>
                                <textarea
                                    className='input-comment-text'
                                    placeholder='댓글을 입력해주세요.'
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                            </div>
                            <div className='comment-button-box'>
                                <button className='comment-button' type='button' onClick={handleCommentSubmit}>작성하기</button>
                            </div>
                        </div>
                    </div>
                    <div className='sequence-choice'>
                        <button className='sequence-choice-button' type='button' onClick={toggleDropdown}>{selectedOption}</button>
                    </div>

                    {isDropdownOpen && (
                        <div className='dropdown-menu-box'>
                            <div className='dropdown-menu'>
                                <div className='dropdown-item' onClick={() => handleOptionSelect('최신순')}>최신순</div>
                                <div className='dropdown-item' onClick={() => handleOptionSelect('추천순')}>추천순</div>
                            </div>
                        </div>
                    )}

                    {viewList.map(comment => (
                        <Comments key={comment.commentId} comment={comment} depth={1} getDiscussion={getDiscussion} postLike={(targetId:number, userId:string, likeType:string)=>onLikeClickHandler(targetId, userId, likeType)} click={likeClick}/>
                    ))}
                </div>
            </div>
        </div>
    );
}


