<template>
  <div class="comment-block">
    <div class="comment-input">
      <img
        src="https://secure.gravatar.com/avatar/2095bd5cedab25e46d4eb8eb40cc4a2b?s=64&d=mm&r=g"
        alt="avatar"
        class="avatar"
      />
      <textarea v-model="comment" rows="1" class="textarea" />
      <span class="btn" @click="cancelComment"
        ><font-awesome-icon :icon="cancelIcon" class="icon"></font-awesome-icon
      ></span>
      <span class="btn"
        ><font-awesome-icon :icon="sendIcon" class="icon"></font-awesome-icon
      ></span>
    </div>
    <ul class="list">
      <div class="comment-content">
        <img
          src="https://secure.gravatar.com/avatar/2095bd5cedab25e46d4eb8eb40cc4a2b?s=64&d=mm&r=g"
          alt="avatar"
          class="avatar"
        />
        <div class="content">
          <span class="name">Hoang</span>
          <span class="time">2 giờ trước</span>
          <p class="text">Hay quá!</p>
          <div class="actions">
            <font-awesome-icon
              :icon="likeIcon"
              class="icon"
            ></font-awesome-icon>
            <span class="number">30</span>
            <font-awesome-icon :icon="dislikeIcon" class="icon"
              >30</font-awesome-icon
            >
            <span class="number">10</span>
            <button class="reply" @click="showReplyInput = !showReplyInput">
              Trả lời
            </button>
          </div>
          <div v-if="showReplyInput" class="comment-input -child">
            <img
              src="https://secure.gravatar.com/avatar/2095bd5cedab25e46d4eb8eb40cc4a2b?s=64&d=mm&r=g"
              alt="avatar"
              class="avatar"
            />
            <textarea rows="1" class="textarea" />
            <span class="btn"
              ><font-awesome-icon
                :icon="cancelIcon"
                class="icon"
                @click="showReplyInput = false"
              ></font-awesome-icon
            ></span>
            <span class="btn"
              ><font-awesome-icon
                :icon="sendIcon"
                class="icon"
              ></font-awesome-icon
            ></span>
          </div>
          <button v-if="!showReplies" class="btn" @click="showReplies = !showReplies">
            <font-awesome-icon :icon="angleDownIcon"></font-awesome-icon> Xem 4
            câu trả lời
          </button>
          <button v-if="showReplies" class="btn" @click="showReplies = !showReplies">
            <font-awesome-icon :icon="angleUpIcon"></font-awesome-icon> Ẩn 4
            câu trả lời
          </button>
          <div v-if="showReplies" class="replies">
            <div class="comment-content -reply">
              <img
                src="https://secure.gravatar.com/avatar/2095bd5cedab25e46d4eb8eb40cc4a2b?s=64&d=mm&r=g"
                alt="avatar"
                class="avatar"
              />
              <div class="content">
                <span class="name">Hoang</span>
                <span class="time">2 giờ trước</span>
                <p class="text">Hay quá!</p>
                <div class="actions">
                  <font-awesome-icon
                    :icon="likeIcon"
                    class="icon"
                  ></font-awesome-icon>
                  <span class="number">30</span>
                  <font-awesome-icon :icon="dislikeIcon" class="icon"
                    >30</font-awesome-icon
                  >
                  <span class="number">10</span>
                  <button
                    class="reply"
                    @click="showReplyInput = !showReplyInput"
                  >
                    Trả lời
                  </button>
                </div>
              </div>
            </div>
            <div class="comment-content -reply">
              <img
                src="https://secure.gravatar.com/avatar/2095bd5cedab25e46d4eb8eb40cc4a2b?s=64&d=mm&r=g"
                alt="avatar"
                class="avatar"
              />
              <div class="content">
                <span class="name">Hoang</span>
                <span class="time">2 giờ trước</span>
                <p class="text">Hay quá!</p>
                <div class="actions">
                  <font-awesome-icon
                    :icon="likeIcon"
                    class="icon"
                  ></font-awesome-icon>
                  <span class="number">30</span>
                  <font-awesome-icon :icon="dislikeIcon" class="icon"
                    >30</font-awesome-icon
                  >
                  <span class="number">10</span>
                  <button
                    class="reply"
                    @click="showReplyInput = !showReplyInput"
                  >
                    Trả lời
                  </button>
                </div>
              </div>
            </div>
            <div class="comment-content -reply">
              <img
                src="https://secure.gravatar.com/avatar/2095bd5cedab25e46d4eb8eb40cc4a2b?s=64&d=mm&r=g"
                alt="avatar"
                class="avatar"
              />
              <div class="content">
                <span class="name">Hoang</span>
                <span class="time">2 giờ trước</span>
                <p class="text">Hay quá!</p>
                <div class="actions">
                  <font-awesome-icon
                    :icon="likeIcon"
                    class="icon"
                  ></font-awesome-icon>
                  <span class="number">30</span>
                  <font-awesome-icon :icon="dislikeIcon" class="icon"
                    >30</font-awesome-icon
                  >
                  <span class="number">10</span>
                  <button
                    class="reply"
                    @click="showReplyInput = !showReplyInput"
                  >
                    Trả lời
                  </button>
                </div>
              </div>
            </div>
            <div class="comment-content -reply">
              <img
                src="https://secure.gravatar.com/avatar/2095bd5cedab25e46d4eb8eb40cc4a2b?s=64&d=mm&r=g"
                alt="avatar"
                class="avatar"
              />
              <div class="content">
                <span class="name">Hoang</span>
                <span class="time">2 giờ trước</span>
                <p class="text">Hay quá!</p>
                <div class="actions">
                  <font-awesome-icon
                    :icon="likeIcon"
                    class="icon"
                  ></font-awesome-icon>
                  <span class="number">30</span>
                  <font-awesome-icon :icon="dislikeIcon" class="icon"
                    >30</font-awesome-icon
                  >
                  <span class="number">10</span>
                  <button
                    class="reply"
                    @click="showReplyInput = !showReplyInput"
                  >
                    Trả lời
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ul>
  </div>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faPaperPlane,
  faThumbsUp,
  faThumbsDown,
  faBackspace,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons'
export default {
  name: 'CommentBlock',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      sendIcon: faPaperPlane,
      likeIcon: faThumbsUp,
      dislikeIcon: faThumbsDown,
      cancelIcon: faBackspace,
      angleDownIcon: faAngleDown,
      angleUpIcon: faAngleUp,
      showReplyInput: false,
      showReplies: false,
      comment: null,
    }
  },
  methods: {
    cancelComment() {
      this.comment = null
    },
  }
}
</script>
<style lang="scss" scoped>
.comment-block {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 30px 30px 20px;
  margin-bottom: 30px;
  height: auto;
}
.comment-input {
  display: flex;
  margin-bottom: 30px;
  > .avatar {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    margin-right: 10px;
  }
  > .textarea {
    width: 100%;
    height: 50%;
    overflow: auto;
    border-bottom: 1px solid black;
    &:focus-visible {
      outline: none;
      border-bottom: 3px solid #9ebaa0;
    }
  }
  > .btn {
    font-size: 17px;
    padding: 10px;
    &:hover {
      background-color: #9ebaa0;
      border-radius: 50%;
    }
  }
  &.-child {
    margin-bottom: 10px;
  }
  &.-child > .avatar {
    width: 30px;
    height: 30px;
    border-radius: 30px;
  }
}
.comment-content {
  display: flex;
  > .avatar {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    margin-right: 10px;
  }
  > .content {
    width: 100%;
  }
  > .content > .name {
    font-weight: 600;
    font-size: 14px;
    margin-right: 10px;
  }
  > .content > .time {
    font-weight: 400;
    color: gray;
  }
  > .content > .text {
    font-size: 14px;
    line-height: 1.4;
    padding: 5px 0;
  }
  > .content > .btn {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
    color: #9ebaa0;
    cursor: pointer;
    &.-hidden {
      display: none;
    }
  }
  > .content > .actions {
    margin-bottom: 5px;
  }
  > .content > .actions > .icon {
    &:hover {
      color: #9ebaa0;
    }
  }
  > .content > .actions > .number {
    margin-right: 10px;
  }
  > .content > .actions > .reply {
    font-weight: 500;
    cursor: pointer;
    &:hover {
      color: #9ebaa0;
    }
  }
  &.-reply > .avatar {
    width: 30px;
    height: 30px;
    border-radius: 30px;
  }
}
</style>