package com.korit.dorandoran.common.object;

import java.util.ArrayList;
import java.util.List;

import com.korit.dorandoran.repository.resultset.GetMainGenDiscListResultSet;

import lombok.Getter;

@Getter
public class MainGenDisc {
    private Integer roomId;
    private String tag;
    private String title;
    private String content;
    private String imgSrc;

    private MainGenDisc(GetMainGenDiscListResultSet resultSet) {
        this.tag = resultSet.getDiscussionType();
        this.title = resultSet.getRoomTitle();
        this.content = resultSet.getRoomDescription();
        this.imgSrc = resultSet.getDiscussionImage();
        this.roomId = resultSet.getRoomId();
    }

    public static List<MainGenDisc> getList(List<GetMainGenDiscListResultSet> resultSets) {
        List<MainGenDisc> mainGenDiscs = new ArrayList<>();
        for (GetMainGenDiscListResultSet mainGenDiscResultSet : resultSets) {
            MainGenDisc mainGenDisc = new MainGenDisc(mainGenDiscResultSet);
            mainGenDiscs.add(mainGenDisc);
        }
        return mainGenDiscs;
    }
}
