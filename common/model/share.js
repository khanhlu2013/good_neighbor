import _ from "underscore";

class Share {
  constructor(
    id,
    borrower,
    dateCreate,
    isApprove,
    isAwareApprove,
    isReturn,
    isAwareReturn,
    dateReturn,
    post
  ) {
    if (id) {
      //when id is truthy, it is not being temporary constructed in the front end and need to be validated
      if (!_.isDate(dateCreate)) {
        throw Error(`dateCreate '${dateCreate}' is not a Date`);
      }
    }

    Object.assign(this, {
      id,
      borrower,
      dateCreate,
      isApprove,
      isAwareApprove,
      isReturn,
      isAwareReturn,
      dateReturn,
      post
    });
  }

  setDateReturn(date) {
    this.dateReturn = date;
  }

  setPost(post) {
    this.post = post;
  }

  get isRequest() {
    return this.isApprove === undefined;
  }

  isCurrentlyBorrow() {
    return this.isApprove === true && this.isReturn === false;
  }

  get isDenied() {
    return this.isApprove === false;
  }
}

export default Share;
