package com.korit.dorandoran.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.korit.dorandoran.entity.DiscussionRoomEntity;
import com.korit.dorandoran.repository.resultset.GetDetailDiscussionResultSet;
import com.korit.dorandoran.repository.resultset.GetDiscussionResultSet;
import com.korit.dorandoran.repository.resultset.GetMainGenDiscListResultSet;
import com.korit.dorandoran.repository.resultset.GetMyDiscussionResultSet;

@Repository
public interface DiscussionRoomRepository extends JpaRepository<DiscussionRoomEntity, Integer> {

        boolean existsByRoomTitle(String roomTitle);

        boolean existsByRoomId(Integer roomId);

        @Query(value = "SELECT " +
                        "U.user_id," +
                        "U.nick_name," +
                        "U.profile_image," +
                        "D.room_id," +
                        "D.room_description," +
                        "D.discussion_type," +
                        "D.discussion_image," +
                        "D.created_room," +
                        "D.room_title," +
                        "D.update_status," +
                        "P.agree_opinion," +
                        "P.opposite_opinion," +
                        "P.discussion_end," +
                        "COUNT(C.room_id) as commentCount," +
                        "COUNT(distinct L.room_id) as likeCount " +
                        "FROM discussion_room D " +
                        "LEFT JOIN user U ON D.user_id = U.user_id " +
                        "LEFT JOIN post_discussion P ON D.room_id = P.room_id " +
                        "LEFT JOIN comments C ON D.room_id = C.room_id " +
                        "LEFT JOIN dorandoran.like L ON D.room_id = L.room_id " +
                        "GROUP BY D.room_id ", nativeQuery = true)
        List<GetDiscussionResultSet> getList();

        @Query(value = "SELECT " +
                        "U.user_id," +
                        "U.nick_name," +
                        "U.profile_image," +
                        "D.room_id," +
                        "D.room_description," +
                        "D.discussion_type," +
                        "D.discussion_image," +
                        "D.created_room," +
                        "D.room_title," +
                        "D.update_status," +
                        "P.agree_opinion," +
                        "P.opposite_opinion," +
                        "P.discussion_end," +
                        "COUNT(C.room_id) as commentCount," +
                        "COUNT(distinct L.room_id) as likeCount " +
                        "FROM discussion_room D " +
                        "LEFT JOIN user U ON D.user_id = U.user_id " +
                        "LEFT JOIN post_discussion P ON D.room_id = P.room_id " +
                        "LEFT JOIN comments C ON D.room_id = C.room_id " +
                        "LEFT JOIN dorandoran.like L ON D.room_id = L.room_id " +
                        "WHERE D.room_id = :roomId " +
                        "GROUP BY D.room_id ", nativeQuery = true)
        GetDetailDiscussionResultSet getDiscussion(@Param("roomId") Integer roomId);

        @Query(value = "SELECT " +
                        "d.user_id " +
                        "FROM discussion_room d " +
                        "WHERE d.room_id = :roomId", nativeQuery = true)
        String findUserIdByRoomId(@Param("roomId") Integer roomId);

        @Query(value = "SELECT t1.* " +
                        "FROM dorandoran.discussion_room t1 " +
                        "JOIN ( " +
                        "SELECT discussion_type, MAX(created_room) AS latest_created " +
                        "FROM dorandoran.discussion_room " +
                        "GROUP BY discussion_type " +
                        ") t2 " +
                        "ON t1.discussion_type = t2.discussion_type AND t1.created_room = t2.latest_created; ", nativeQuery = true)
        List<GetMainGenDiscListResultSet> getMainGenDiscList();

        @Query(value = "SELECT " +
                        "dr.room_id, " +
                        "dr.created_room, " +
                        "dr.room_title, " +
                        "dr.room_description, " +
                        "dr.discussion_image, " +
                        "dr.update_status, " +
                        "COALESCE(like_count, 0) AS like_count, " +
                        "COALESCE(comment_count, 0) AS comment_count " +
                        "FROM discussion_room dr " +
                        "LEFT JOIN ( " +
                        "SELECT room_id, COUNT(user_id) AS like_count " +
                        "FROM `like` " +
                        "GROUP BY room_id " +
                        ") l ON dr.room_id = l.room_id " +
                        "LEFT JOIN ( " +
                        "SELECT room_id, COUNT(*) AS comment_count " +
                        "FROM comments " +
                        "GROUP BY room_id " +
                        ") c ON dr.room_id = c.room_id; ", nativeQuery = true)
        List<GetMyDiscussionResultSet> getMyDiscussionList();

        DiscussionRoomEntity findByRoomId(Integer roomId);
}
