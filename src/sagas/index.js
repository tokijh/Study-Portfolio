import { all } from "redux-saga/effects";
import { watchFetchData } from "./FetchSaga";
import { watchCommentSend } from "./CommentSendSaga";
import { watchCommentReceive } from "./CommentReceiveSaga";

export default function* rootSaga () {
    yield all([
        watchCommentSend(),
        watchFetchData(),
        watchCommentReceive()
    ])
}

