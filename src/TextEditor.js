import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faCode,
  faFileCode,
  faFilm,
  faImage,
  faItalic,
  faLink,
  faList,
  faListOl,
  faQuoteRight,
  faStrikethrough,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import "./textEditor.css";

const TextEditor = () => {
  const [content, setContent] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikeThrough, setStrikeThrough] = useState(false);
  const [isBlockquote, setIsBlockquote] = useState(false);
  const [isHeading1, setIsHeading1] = useState(false);
  const [isHeading2, setIsHeading2] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [isInlineCode, setIsInlineCode] = useState(false);
  const [isCodeBlock, setIsCodeBlock] = useState(false);

  const handleFormat = (style, value = null) => {
    // Toggle the state for the corresponding style
    switch (style) {
      case "bold":
        setIsBold(!isBold);
        break;
      case "italic":
        setIsItalic(!isItalic);
        break;
      case "underline":
        setIsUnderline(!isUnderline);
        break;
      case "strikeThrough":
        setStrikeThrough(!isStrikeThrough);
        break;
      case "formatBlock":
        // Handle specific cases for formatBlock
        if (value === "<blockquote>") {
          setIsBlockquote(!isBlockquote);
          value = isBlockquote ? "<p>" : "<blockquote>";
        } else if (value === "<h1>") {
          setIsHeading1(!isHeading1);
          value = isHeading1 ? "<p>" : "<h1>";
        } else if (value === "<h2>") {
          setIsHeading2(!isHeading2);
          value = isHeading2 ? "<p>" : "<h2>";
        } else if (value === "<pre>") {
          setIsCodeBlock(!isCodeBlock);
          value = isCodeBlock ? "<p>" : "<pre>";
        }
        break;
      case "insertOrderedList":
        setIsOrderedList(!isOrderedList);
        break;
      case "insertUnorderedList":
        setIsUnorderedList(!isUnorderedList);
        break;
      case "code":
        setIsInlineCode(!isInlineCode);
        break;

      case "createLink":
        const url = prompt("Enter the link URL:");
        document.execCommand("createLink", false, url);
        break;

      default:
        break;
    }

    // Check the current state before applying the style
    document.execCommand(style, false, value);



  };

  function focus() {
    const contentEle = document.getElementById('content');
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(contentEle, contentEle.childNodes.length);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  useEffect(() => {
    focus();
  }, [content]);

  return (
    <div className="editor-wrapper">
      <div className="editor">
        <div className="toolbar">
          <button className="editor-btn" onClick={() => handleFormat("bold")}>
            <FontAwesomeIcon icon={faBold} />
          </button>

          <button
            className="editor-btn"
            onClick={() => handleFormat("underline")}
          >
            <FontAwesomeIcon icon={faUnderline} />
          </button>

          <button className="editor-btn" onClick={() => handleFormat("italic")}>
            <FontAwesomeIcon icon={faItalic} />
          </button>

          <button
            className="editor-btn"
            onClick={() => handleFormat("strikeThrough")}
          >
            <FontAwesomeIcon icon={faStrikethrough} />
          </button>

          <button
            className="editor-btn"
            onClick={() => handleFormat("formatBlock", "<blockquote>")}
          >
            <FontAwesomeIcon icon={faQuoteRight} />
          </button>

          <button
            className="editor-btn"
            style={{ fontWeight: "bold" }}
            onClick={() => handleFormat("formatBlock", "<h1>")}
          >
            H1
          </button>

          <button
            className="editor-btn"
            style={{ fontWeight: "bold" }}
            onClick={() => handleFormat("formatBlock", "<h2>")}
          >
            H2
          </button>

          <button
            className="editor-btn"
            onClick={() => handleFormat("insertUnorderedList")}
          >
            <FontAwesomeIcon icon={faList} />
          </button>

          <button
            className="editor-btn"
            onClick={() => handleFormat("insertOrderedList")}
          >
            <FontAwesomeIcon icon={faListOl} />
          </button>

          <button className="editor-btn" onClick={() => handleFormat("code")}>
            <FontAwesomeIcon icon={faCode} />
          </button>

          <button
            className="editor-btn"
            onClick={() => handleFormat("formatBlock", "<pre>")}
          >
            <FontAwesomeIcon icon={faFileCode} />
          </button>

          <button
            className="editor-btn"
            onClick={() => handleFormat("createLink")}
          >
            <FontAwesomeIcon icon={faLink} />
          </button>
          <button
            className="editor-btn"
            onClick={() =>
              handleFormat("insertImage", prompt("Enter image URL:"))
            }
          >
            <FontAwesomeIcon icon={faImage} />
          </button>

          <button
            className="editor-btn"
            onClick={() =>
              handleFormat(
                "insertHTML",
                '<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>'
              )
            }
          >
            <FontAwesomeIcon icon={faFilm} />
          </button>
        </div>
        <div
          id="content"
          className="text-editor"
          contentEditable="true"
          dir="ltr"
          dangerouslySetInnerHTML={{ __html: content }}
          onInput={(e) => {
            setContent(e.target.innerHTML);
            e.target.focus();
          }}

        />
        <br />
      </div>

      <button onClick={focus}>test123</button>

    </div>
  );
};

export default TextEditor;