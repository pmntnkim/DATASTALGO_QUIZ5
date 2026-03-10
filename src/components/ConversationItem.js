function ConversationItem({ item, figureName }) {
  return (
    <div
      className={`conversation-item ${
        item.role === 'user' ? 'conversation-user' : 'conversation-assistant'
      }`}
    >
      <div className="conversation-role">{item.role === 'user' ? 'You' : figureName || 'Historical Figure'}</div>
      <div className="conversation-content">{item.content}</div>
    </div>
  );
}

export default ConversationItem;
