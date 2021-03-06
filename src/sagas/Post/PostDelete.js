import { put, call, takeEvery } from "redux-saga/effects/";
import { getFirebase } from "react-redux-firebase";

export function* MakePostDelete(action) {
    // 댓글 Id 배열 생성
    const CommentsObject = yield getFirebase()
        .database()
        .ref("posts/"+action.payload)
        .once("value")
        .then(res => {
            return res.val();
        });

    const CommentsList = [];

    for(let key in CommentsObject.comments) {
        CommentsList.push(CommentsObject.comments[key]);
    }

    // 포스트에 달린 댓글 모두 삭제
    for(let i = 0; i < CommentsList.length; i++) {
        yield getFirebase()
            .database()
            .ref("comment/" + CommentsList[i])
            .remove();
    }

    // 댓글에 달린 이미지 삭제
    const RefImage = yield getFirebase()
        .database()
        .ref(`posts/${action.payload}/PostImageKey`)
        .once("value")
        .then(res => {
            return res.val();
        });

    for(let key in RefImage) {
        yield getFirebase()
            .database()
            .ref(`Images/${RefImage[key]}`)
            .remove()
    }

    // 댓글 삭제 후, 포스트 삭제
    yield getFirebase()
        .database()
        .ref("posts/"+action.payload)
        .remove();
}

export function* PostDelete (action) {
    try {
        yield call(MakePostDelete, action);
        yield put({ type: "post/post_delete_Success" });
        // 모달 내리기
        yield put({ type: "Modal/hide_Modal" });
        // 데이터 리로드
        yield put({ type: "fetch/fetch_Request" });
    } catch (error) {
        yield put({ type: "post/post_delete_Failure", payload: error })
    }
}

export function* watchPostDelete () {
    yield takeEvery("post/post_delete_Request", PostDelete)
}

