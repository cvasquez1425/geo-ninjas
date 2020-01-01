<template>
  <div class="view-profile container">
    <div v-if="profile" class="card">
      <h2 class="deep-purple-text center">{{ profile.alias }}'s Wall</h2>
      <ul class="comments collection">
        <!--this collection classs is a utility class provided by Materialize CSS class -->
        <li v-for="(comment, index) in comments" :key="index">
          <div class="deep-purple-text">{{ comment.from }}</div>
          <div class="grey-text text-darken-2">{{ comment.content }}</div>
        </li>
      </ul>
      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a comment</label>
          <input type="text" name="comment" v-model="newComment" />
          <p v-if="feedback" class="red-text center">{{ feedback }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "ViewProfile",
  data() {
    return {
      profile: null,
      newComment: null,
      feedback: null,
      user: null,
      comments: []
    };
  },
  created() {
    let ref = db.collection("users");

    // get current user. there should be only one, but firestore and firebase doesn't know that, we still have to cycle thru the docs.
    ref
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          (this.user = doc.data()), (this.user.id = doc.id);
        });
      });

    // profile data
    ref
      .doc(this.$route.params.id)
      .get()
      .then(user => {
        this.profile = user.data();
      });

    // comments
    db.collection("comments")
      .where("to", "==", this.$route.params.id)
      .onSnapshot(snapshot => {
        //snapshot representation of the collection at that moment in time.
        snapshot.docChanges().forEach(change => {
          // see screen shot in images on the C drive.
          if (change.type == "added") {
            this.comments.unshift({
              // unshift put it at the top, push at the bottom.
              from: change.doc.data().from,
              content: change.doc.data().content
            });
          }
        });
      }); // this function fires when something happen inside this db collection('comments')
  },
  methods: {
    addComment() {
      if (this.newComment) {
        this.feedback = null;
        db.collection("comments")
          .add({
            to: this.$route.params.id, // when you are in a profile page, you get the slug from the route, that is the id of the doc in the cloud firestore.
            from: this.user.alias, // this.user.id,
            content: this.newComment,
            time: Date.now()
          })
          .then(() => {
            this.newComment = null;
          });
      } else {
        this.feedback = "You must enter a comment to add it";
      }
    }
  }
};
</script>

<style>
.view-profile .card {
  padding: 20px;
  margin-top: 60px;
}
.view-profile h2 {
  font-size: 2em;
  margin-top: 0;
}
.view-profile li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
