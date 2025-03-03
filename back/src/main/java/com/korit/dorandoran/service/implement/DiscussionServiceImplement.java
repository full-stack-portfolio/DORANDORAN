package com.korit.dorandoran.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.korit.dorandoran.dto.request.postDiscussion.PostDiscussionWriteRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.discussion.GetDiscussionListResponseDto;
import com.korit.dorandoran.dto.response.discussion.GetDiscussionResponseDto;
import com.korit.dorandoran.dto.response.discussion.GetSignInUserResponseDto;
import com.korit.dorandoran.dto.response.main.GetGenDiscListResponseDto;
import com.korit.dorandoran.dto.response.mypage.myInfo.GetMyDiscussionListResponseDto;
import com.korit.dorandoran.entity.DiscussionRoomEntity;
import com.korit.dorandoran.entity.PostDiscussionEntity;
import com.korit.dorandoran.entity.UserEntity;
import com.korit.dorandoran.repository.CommentsRepository;
import com.korit.dorandoran.repository.DiscussionRoomRepository;
import com.korit.dorandoran.repository.PostDiscussionRepository;
import com.korit.dorandoran.repository.UserRepository;
import com.korit.dorandoran.repository.resultset.GetCommentsResultSet;
import com.korit.dorandoran.repository.resultset.GetDetailDiscussionResultSet;
import com.korit.dorandoran.repository.resultset.GetDiscussionResultSet;
import com.korit.dorandoran.repository.resultset.GetMainGenDiscListResultSet;
import com.korit.dorandoran.repository.resultset.GetMyDiscussionResultSet;
import com.korit.dorandoran.service.DiscussionService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class DiscussionServiceImplement implements DiscussionService {

    private final DiscussionRoomRepository discussionRoomRepository;
    private final PostDiscussionRepository postDiscussionRepository;
    private final UserRepository userRepository;
    private final CommentsRepository commentsRepository;

    @Transactional
    @Override
    public ResponseEntity<ResponseDto> postDiscussionWite(PostDiscussionWriteRequestDto dto) {

        try {
            DiscussionRoomEntity discussionRoomEntity = new DiscussionRoomEntity(dto);
            discussionRoomRepository.save(discussionRoomEntity);
            discussionRoomRepository.flush();

            Integer roomId = discussionRoomEntity.getRoomId();
            if (roomId == null) {
                throw new RuntimeException("roomId가 NULL입니다.");
            }

            PostDiscussionEntity postDiscussionEntity = new PostDiscussionEntity(dto, roomId);
            postDiscussionRepository.save(postDiscussionEntity);

        } catch (Exception e) {
            throw new RuntimeException("트랜잭션 롤백 문제 발생", e);
        }
        return ResponseDto.success();

    }

    @Override
    public ResponseEntity<? super GetDiscussionListResponseDto> getDiscussionList() {
        List<GetDiscussionResultSet> resultSet = new ArrayList<>();

        try {
            resultSet = discussionRoomRepository.getList();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetDiscussionListResponseDto.success(resultSet);
    }

    @Override
    public ResponseEntity<? super GetDiscussionResponseDto> getDiscussion(Integer roomId) {
        GetDetailDiscussionResultSet discussionResultSet;
        List<GetCommentsResultSet> commentResultSets;

        try {

            boolean isExisted = discussionRoomRepository.existsByRoomId(roomId);
            if (!isExisted) {
                return ResponseDto.noExistRoom();
            }

            discussionResultSet = discussionRoomRepository.getDiscussion(roomId);
            if (discussionResultSet == null) {
                return ResponseDto.noExistRoom();
            }

            commentResultSets = commentsRepository.getComments(roomId);
            if (commentResultSets == null || commentResultSets.isEmpty()) {
                return GetDiscussionResponseDto.success(discussionResultSet, new ArrayList<>());
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetDiscussionResponseDto.success(discussionResultSet, commentResultSets);
    }

    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignIn(String userId) {
        UserEntity userEntity = null;
        try {
            userEntity = userRepository.findByUserId(userId);
            if (userEntity == null)
                return ResponseDto.noExistUserId();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetSignInUserResponseDto.success(userEntity);
    }

    @Override
    public ResponseEntity<? super GetGenDiscListResponseDto> getMainGenDiscList() {
        List<GetMainGenDiscListResultSet> resultSet = new ArrayList<>();
        try {
            resultSet = discussionRoomRepository.getMainGenDiscList();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetGenDiscListResponseDto.success(resultSet);
    }

    @Override
    public ResponseEntity<? super GetMyDiscussionListResponseDto> getMyDiscussionList(String userId) {
        List<GetMyDiscussionResultSet> resultSet = new ArrayList<>();
        UserEntity userEntity = null;
        try {
            userEntity = userRepository.findByUserId(userId);
            if (userEntity == null)
                return ResponseDto.noExistUserId();

            resultSet = discussionRoomRepository.getMyDiscussionList();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetMyDiscussionListResponseDto.success(resultSet);
    }

    @Override
    public ResponseEntity<ResponseDto> deleteDiscusstion(Integer roomId) {
        DiscussionRoomEntity discussionRoomEntity = null;
        PostDiscussionEntity postDiscussionEntity = null;
        try {
            discussionRoomEntity = discussionRoomRepository.findByRoomId(roomId);
            if (discussionRoomEntity == null)
                return ResponseDto.noExistRoom();

            postDiscussionEntity = postDiscussionRepository.findByRoomId(roomId);
            if (postDiscussionEntity == null)
                return ResponseDto.noExistRoom();

            postDiscussionRepository.delete(postDiscussionEntity);
            discussionRoomRepository.delete(discussionRoomEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }
}
