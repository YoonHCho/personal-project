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
  const [edit, setEdit] = useState(null);
  const [editedPost, setEditedPost] = useState("");
  const [reducerVal, forceUpdate] = useReducer((x) => x + 1, 0);

  const MSG_URL = "/messages";
  const MSG_POSTS_URL = "/messages/posts";
  const MSG_USERS_URL = "/messages/users";
  const MSG_DELETE_URL = "/messages/delete/";
  const MSG_EDIT_URL = "/messages/edit/";

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
    const date = new Date();
    const commentedat =
      date.toString().substring(4, 15) +
      ", " +
      date.toString().substring(16, 24);
    const msg = e.target.post.value;

    try {
      const msgPosting = await axios.post(
        MSG_URL,
        JSON.stringify({ userid, username, comments: msg, commentedat }),
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

  const handleDelete = async (e) => {
    const idToDelete = Number(e);

    try {
      await axios.delete(`${MSG_DELETE_URL}${idToDelete}`);
    } catch (err) {
      console.log("Something went wrong", err);
    }

    forceUpdate();
  };

  const handleEdit = async (userid, commentid, comments) => {
    if (!comments) {
      setEdit(null);
    }

    try {
      await axios.put(
        `${MSG_EDIT_URL}${commentid}`,
        JSON.stringify({ comments, userid }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setEdit(null);
    } catch (err) {
      console.log("Something went wrong: ", err);
    }

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
          <br />
          <p>
            * A User can only Edit and Delete the user's messages only, however
            I have a Master user that can Edit and/or Delete all user's
            messages. I have the Master user in order to delete any
            inappropriate messages in the future.
          </p>
        </div>
        {/* NEED TO START USING THE USER'S INFORMATIONS FOR POSTING */}
        <div className="main-content">
          <h1>{username} says...</h1>
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
              <section className="post-btn-cont time-font">
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
                  {edit === ele.commentid ? (
                    <label className="post-cont">
                      <textarea
                        name="post"
                        rows="3"
                        value={editedPost}
                        onChange={(e) => setEditedPost(e.target.value)}
                        placeholder="This field cannot be blank"
                        required
                      ></textarea>
                    </label>
                  ) : (
                    <p className="msg-font font-blue">"{ele.comments}"</p>
                  )}

                  <p className="time-font">On {ele.commentedat}</p>
                  {username === "Yoon" || userid === ele.userid ? (
                    <aside className="time-font mt-10px">
                      <button
                        className="post-btn"
                        name="edit"
                        // onClick={() =>
                        //   handleEdit(ele.commentid, ele.comments, ele.userid)
                        // }
                        onClick={() => {
                          edit === ele.commentid
                            ? setEdit(null)
                            : setEdit(ele.commentid);
                          setEditedPost(ele.comments);
                        }}
                      >
                        {edit === ele.commentid ? "Cancel" : "Edit"}
                      </button>
                      <button
                        className="post-btn ml-15px"
                        name="delete"
                        onClick={() => {
                          edit === ele.commentid
                            ? handleEdit(ele.userid, ele.commentid, editedPost)
                            : handleDelete(ele.commentid);
                        }}
                      >
                        {edit === ele.commentid ? "Confirm" : "Delete"}
                      </button>
                    </aside>
                  ) : (
                    ""
                  )}
                </div>
              );
            })
          : null}
      </div>
      {/* {edit ? (
        <div className="main-content">
          <h1>{username} says...</h1>
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
              <section className="post-btn-cont time-font">
                <button className="post-btn">Post</button>
              </section>
            </label>
          </form>
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default Messages;
