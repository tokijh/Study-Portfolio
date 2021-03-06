import { all } from "redux-saga/effects";
import { watchFetchData } from "./Post/PostFetch";
import { watchCommentSend } from "./Comment/CommentSend";
import { watchCommentReceive } from "./Comment/CommentReceive";
import { watchCommentDelete } from "./Comment/CommentDelete";
import { watchPostDelete } from "./Post/PostDelete";
import { watchImageSend } from "./Image/ImageSend";
import { watchImageReceive } from "./Image/ImageReceive";
import { watchHeartSend } from "./Heart/HeartSend";
import { watchHeartDelete } from "./Heart/HeartDelete";
import { watchTopPopuReceive } from "./TopPopu/TopPopu";

export default function* rootSaga () {
    yield all([
        watchCommentSend(),
        watchFetchData(),
        watchCommentReceive(),
        watchCommentDelete(),
        watchPostDelete(),
        watchImageSend(),
        watchImageReceive(),
        watchHeartSend(),
        watchHeartDelete(),
        watchTopPopuReceive(),
    ])
}

