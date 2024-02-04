import React, { useState, ChangeEvent } from "react";

const SpaceAddComment = () => {
  const [commentText, setCommentText] = useState(""); // State to manage the comment text

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);
  };

  const handleAddComment = () => {
    // Implement logic to add the comment using the commentText
    // For now, you can log it to the console
    console.log("Added Comment:", commentText);
    
    // Clear the comment text after adding the comment
    setCommentText("");
  };

  return (
    <>
      <div>
        <textarea
          placeholder="Type your comment here..."
          value={commentText}
          onChange={handleCommentChange}
          rows={2} // Adjust the number of rows as needed
          cols={50} // Adjust the number of columns as needed
        ></textarea>
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </>
  );
};

export default SpaceAddComment;
