import update from "immutability-helper";

import {
  informFetchOutPosts_reducerHelper,
  receiveFetchOutPosts_reducerHelper
} from "./helper/fetchOutPosts.reducerHelper";
import {
  RECIEVE_UPDATE_POST,
  RECEIVE_CREATE_POST
} from "../action/crudOutPost.action";
import {
  receiveCreatePost_reducerHelper,
  receiveUpdatePost_reducerHelper
} from "./helper/crudPost.reducerHelper";
import { RECEIVE_DECIDE_POST } from "../action/decideOutPost.action";
import {
  INFORM_AWARE_RETURN_POST,
  RECEIVE_AWARE_RETURN_POST
} from "../action/awareReturnPost.action";
import { receiveDecidePost_reducerHelper } from "./helper/decidePost.reducerHelper";
import {
  INFORM_FETCH_OUTPOSTS,
  RECEIVE_FETCH_OUTPOSTS
} from "../action/fetchOutPosts.action";
import { RECEIVE_LOGGED_OUT_SUCCESS } from "../../../app/action/auth.action";

const defaultState = {
  posts: [],
  isInitPosts: false,
  isFetchingPosts: false,
  awaringReturnPostIds: []
};
const outPostReducer = (state = defaultState, action) => {
  switch (action.type) {
    //fetch
    case INFORM_FETCH_OUTPOSTS:
      return informFetchOutPosts_reducerHelper(state);
    case RECEIVE_FETCH_OUTPOSTS:
      return receiveFetchOutPosts_reducerHelper(state, action.posts);

    case RECIEVE_UPDATE_POST:
      return receiveUpdatePost_reducerHelper(
        state,
        action.postId,
        action.updatedTitle,
        action.updatedDescription,
        action.updatedIsActive
      );
    case RECEIVE_CREATE_POST:
      return receiveCreatePost_reducerHelper(state, action.post);

    //decide
    case RECEIVE_DECIDE_POST:
      return receiveDecidePost_reducerHelper(
        state,
        action.shareId,
        action.resultIsApprove
      );
    //aware return
    case INFORM_AWARE_RETURN_POST:
      return {
        ...state,
        awaringReturnPostIds: [...state.awaringReturnPostIds, action.postId]
      };
    case RECEIVE_AWARE_RETURN_POST: {
      const { posts } = state;
      const curPost = posts.find(post => post.id === action.postId);
      const curReturnShare = curPost.unawareReturnShareLatest;
      const curReturnShare_update = update(curReturnShare, {
        isAwareReturn: { $set: true }
      });
      const shares_update = [
        ...curPost.shares.filter(
          share => share.id !== curReturnShare_update.id
        ),
        curReturnShare_update
      ];
      const curPost_update = update(curPost, {
        shares: { $set: shares_update }
      });
      const posts_update = [
        ...posts.filter(post => post.id !== curPost.id),
        curPost_update
      ];

      return {
        ...state,
        posts: posts_update,
        awaringReturnPostIds: state.awaringReturnPostIds.filter(
          id => id !== action.postId
        )
      };
    }

    case RECEIVE_LOGGED_OUT_SUCCESS:
      return defaultState;

    default:
      return state;
  }
};
export default outPostReducer;
