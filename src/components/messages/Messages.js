import React from "react";
import "./messages.css";
// import WebFont from "webfontloader";

const data = [3, 10, "Someone's Username", "01-18-2023 0100"];

const end = {
  textAlign: "end",
  display: "inline-block",
};

const Messages = () => {
  // useEffect(() => {
  //   WebFont.load({
  //     google: {
  //       families: ["Press Start 2P"],
  //     },
  //   });
  // }, []);

  return (
    <div className="container messages">
      <div className="summary-content">
        <p className="messages">
          <b>Total Users:</b>
          <p style={end}>{data[0]}</p>
        </p>
        <p className="messages">
          <b>Total Posts:</b>
          <p style={end}>{data[1]}</p>
        </p>
        {/* <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p> */}
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
          <h1>{data[2]}</h1>
          <form action="">
            <label className="post-cont">
              <textarea
                name="post"
                rows="3"
                placeholder="Leave me a message"
              ></textarea>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
