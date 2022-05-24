<template>
  <div class="comment-block">
    <div v-if="$auth.loggedIn" class="comment-input">
      <img
        src="https://secure.gravatar.com/avatar/2095bd5cedab25e46d4eb8eb40cc4a2b?s=64&d=mm&r=g"
        alt="avatar"
        class="avatar"
      />
      <v-textarea
        v-model="content"
        rows="1"
        auto-grow
        color="blue-grey"
      ></v-textarea>
      <v-btn class="mx-2" fab dark x-small depressed color="blue-grey">
        <v-icon dark @click="sendComment"> mdi-send </v-icon>
      </v-btn>
    </div>
    <div v-else class="mb-4 text-center">
      Bạn cần <nuxt-link to="/auth/login">đăng nhập</nuxt-link> để bình luận.
    </div>
    <div class="list">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="comment-content"
      >
        <img
          src="https://secure.gravatar.com/avatar/2095bd5cedab25e46d4eb8eb40cc4a2b?s=64&d=mm&r=g"
          alt="avatar"
          class="avatar"
        />
        <div class="content">
          <span class="name">{{ comment.username }}</span>
          <span class="time">{{ convertTime(comment.createdAt) }}</span>
          <p class="text">{{ comment.content }}</p>
          <div class="actions">
            <button
              class="reply"
              @click="comment.showReplyInput = !comment.showReplyInput"
            >
              Trả lời
            </button>
          </div>
          <div v-if="comment.showReplyInput" class="comment-input -child">
            <img
              src="https://secure.gravatar.com/avatar/2095bd5cedab25e46d4eb8eb40cc4a2b?s=64&d=mm&r=g"
              alt="avatar"
              class="avatar"
            />
            <v-textarea
              v-model="replyInput"
              rows="1"
              auto-grow
              color="blue-grey"
            ></v-textarea>
            <v-btn
              class="mx-2"
              fab
              dark
              x-small
              depressed
              color="blue-grey"
              @click="sendReply(comment.id)"
            >
              <v-icon dark> mdi-send </v-icon>
            </v-btn>
          </div>
          <button
            v-if="!comment.showReplies && comment.replies.length > 0"
            class="btn"
            @click="comment.showReplies = !comment.showReplies"
          >
            <v-icon color="blue-grey">mdi-chevron-down</v-icon> Xem
            {{ comment.replies.length }}
            câu trả lời
          </button>
          <button
            v-if="comment.showReplies"
            class="btn"
            @click="comment.showReplies = !comment.showReplies"
          >
            <v-icon color="blue-grey">mdi-chevron-up</v-icon> Ẩn
            {{ comment.replies.length }} câu trả lời
          </button>
          <div v-if="comment.showReplies" class="replies">
            <div
              v-for="reply in comment.replies"
              :key="reply.id"
              class="comment-content -reply"
            >
              <img
                src="https://secure.gravatar.com/avatar/2095bd5cedab25e46d4eb8eb40cc4a2b?s=64&d=mm&r=g"
                alt="avatar"
                class="avatar"
              />
              <div class="content">
                <span class="name">{{ reply.username }}</span>
                <span class="time">{{ convertTime(reply.createdAt) }}</span>
                <p class="text">{{ reply.content }}</p>
                <div class="actions">
                  <button
                    class="reply"
                    @click="comment.showReplyInput = !comment.showReplyInput"
                  >
                    Trả lời
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-btn
      v-if="commentPage < totalCommentPage"
      block
      depressed
      color="blue-grey"
      text
      class="mt-4"
      @click="loadMoreComments"
    >
      Xem thêm
    </v-btn>
  </div>
</template>
<script>
import moment from 'moment'
import 'moment/locale/vi'
import Comments from '@/models/comments.js'
moment.locales('vi')
export default {
  name: 'CommentBlock',
  props: ['audioId'],
  data() {
    return {
      showReplyInput: false,
      content: null,
      replyInput: null,
      comments: [],
      commentPage: 1,
      totalCommentPage: 0,
    }
  },
  async mounted() {
    await this.getComments()
  },
  methods: {
    async sendComment() {
      await Comments.saveComment({
        audioId: this.audioId,
        userId: this.$auth.user.userId,
        content: this.content,
        isReply: false,
      })
      this.content = null
      await this.getComments()
    },
    async sendReply(commentId) {
      await Comments.saveComment({
        audioId: this.audioId,
        userId: this.$auth.user.userId,
        content: this.replyInput,
        isReply: true,
        parentCommentId: commentId,
      })
      this.replyInput = null
      await this.getComments()
      const currentComment = this.comments.find(
        (comment) => comment.id === commentId
      )
      currentComment.showReplies = true
    },
    convertTime(time) {
      return moment(time).fromNow()
    },
    async loadMoreComments() {
      this.commentPage++
      const { comments } = await Comments.getComments({
        audioId: this.audioId,
        page: this.commentPage,
        perPage: 5,
      })
      this.comments = [...this.comments, ...comments]
    },
    async likeComment(commentId) {
      await Comments.like({
        commentId,
        userId: this.$auth.user.userId,
        action: 'like',
      })
    },
    async getComments() {
      const { comments, pagination } = await Comments.getComments({
        audioId: this.audioId,
        page: this.commentPage,
        perPage: 5,
      })
      this.comments = comments
      this.totalCommentPage = pagination.lastPage
      this.$emit('setCommentsAmount', pagination.total)
    },
  },
}
</script>
<style lang="scss" scoped>
.comment-block {
  @include sp {
    padding: 10px;
  }
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 30px 30px 20px;
  margin-bottom: 30px;
  height: auto;
}
.comment-input {
  display: flex;
  margin-bottom: 30px;
  align-items: center;
  > .avatar {
    @include sp {
      width: 30px;
      height: 30px;
    }
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
    @include sp {
      width: 30px;
      height: 30px;
    }
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
    margin: 0;
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