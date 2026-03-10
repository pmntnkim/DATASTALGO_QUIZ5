function Message({ type = 'error', text }) {
  if (!text) {
    return null;
  }

  return <div className={`message message-${type}`}>{text}</div>;
}

export default Message;
