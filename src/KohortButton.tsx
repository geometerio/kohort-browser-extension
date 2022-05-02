import React from "react";
import ReactDOM from "react-dom";

const KohortButton = ({ onClick }: { onClick(): void }) => {
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      href=""
    >
      <img src={`${chrome.runtime.getURL("images/kohort-icon.png")}`} />
    </a>
  );
};

export function renderKohortButton(
  container: HTMLElement,
  sendToKohortCallback: () => void
) {
  ReactDOM.render(<KohortButton onClick={sendToKohortCallback} />, container);
}
