import React, { useState, useContext, useEffect, useReducer } from "react";
import AppContext from "../../lib/app-context";
import "./messages.css";
import axios from "../../api/axios";

// const postList = [
//   {
//     commentid: 3,
//     userid: 1,
//     username: "Yoon",
//     comments: "testing on postman 1",
//     commentedat: "2023-01-19T01:05:00.225Z",
//   },
//   {
//     commentid: 2,
//     userid: 5,
//     username: "one",
//     comments: "one says Hi again",
//     commentedat: "2023-01-19T01:04:17.880Z",
//   },
//   {
//     commentid: 1,
//     userid: 5,
//     username: "one",
//     comments: "one says hi!",
//     commentedat: "2023-01-19T01:04:03.337Z",
//   },
// ];

const end = {
  textAlign: "end",
  display: "inline-block",
};

const Messages = () => {
  const userInfo = useContext(AppContext);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const { userid, username } = userInfo.currentUser;
  const [post, setPost] = useState("");
  const [renderPosts, setRenderPosts] = useState([]);
  const [reducerVal, forceUpdate] = useReducer((x) => x + 1, 0);

  const MSG_URL = "/messages";
  const MSG_POSTS_URL = "/messages/posts";
  const MSG_USERS_URL = "/messages/users";

  useEffect(() => {
    const getPosts = async () => {
      const result = await axios.get(MSG_POSTS_URL);
      setTotalPosts(result.data.length);
      setRenderPosts(result.data);
    };

    const getUsers = async () => {
      const result = await axios.get(MSG_USERS_URL);
      setTotalUsers(result.data.count);
    };

    getPosts();
    getUsers();
  }, [reducerVal]);

  const handlePost = async (e) => {
    e.preventDefault();
    const msg = e.target.post.value;

    console.log(userid);
    console.log(username);
    console.log(msg);

    try {
      const msgPosting = await axios.post(
        MSG_URL,
        JSON.stringify({ userid, username, comments: msg }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("msgPosting: ", msgPosting.data);
    } catch (err) {
      console.error("console.error: ", err);
      console.log("console.log:", err);
    }
    setPost("");
    forceUpdate();
  };

  return (
    <div className="container messages">
      <div className="summary-content">
        <section className="messages">
          <b>Total Users:</b>
          <p style={end}>{totalUsers}</p>
        </section>
        <section className="messages">
          <b>Total Posts:</b>
          <p style={end}>{totalPosts}</p>
        </section>
      </div>
      <div className="main-container">
        <div className="main-content">
          <p>Welcome to Messages.</p>
          <p>
            You can leave a message if you wish. However, please keep online
            etiquette:
          </p>
          <ol>
            <li>Use Respectful Language.</li>
            <li>Be aware of strong languages.</li>
            <li>Be careful with humor and sarcasm.</li>
            <li>Don't post or share inappropriate material.</li>
          </ol>
        </div>
        {/* NEED TO START USING THE USER'S INFORMATIONS FOR POSTING */}
        <div className="main-content">
          <h1>{username} types...</h1>
          <form onSubmit={handlePost}>
            <label className="post-cont">
              <textarea
                name="post"
                rows="3"
                value={post}
                onChange={(e) => setPost(e.target.value)}
                placeholder="Leave me a message"
                required
              ></textarea>
              <section className="post-btn-cont messages text-right">
                <button className="post-btn">Post</button>
              </section>
            </label>
          </form>
        </div>

        <hr />

        {renderPosts.length !== 0
          ? renderPosts.map((ele) => {
              return (
                <div
                  className="main-content"
                  key={ele.commentid}
                  id={ele.commentid}
                >
                  <h1>{ele.username} said,</h1>
                  <p className="msg-font">"{ele.comments}"</p>
                  <p className="time-font">On {ele.commentedat}</p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Messages;
