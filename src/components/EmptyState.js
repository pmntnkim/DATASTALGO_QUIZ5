function EmptyState({ figureName }) {
  return (
    <div className="empty-state">
      <h2>Start chatting</h2>
      <p>Ask any question to {figureName || 'the historical figure'}.</p>
    </div>
  );
}

export default EmptyState;
