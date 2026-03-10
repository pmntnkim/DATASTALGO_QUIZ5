import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConversationItem from '../components/ConversationItem';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { logout } from '../store/slices/authSlice';
import { clearChatError, loadFigure, sendMessage } from '../store/slices/chatSlice';

function HomeScreen() {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const { user } = useSelector((state) => state.auth);
  const { figure, messages, loadingFigure, sending, error } = useSelector(
    (state) => state.chat
  );

  useEffect(() => {
    dispatch(loadFigure());
    return () => {
      dispatch(clearChatError());
    };
  }, [dispatch]);

  const onSubmit = (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || sending) {
      return;
    }

    dispatch(sendMessage(trimmed));
    setInput('');
  };

  return (
    <div className="home-layout">
      <aside className="chat-sidebar">
        <div className="chat-sidebar-top">
          <h1>Historical Chat</h1>
          <p>
            Logged in as <strong>{user?.name}</strong>
          </p>
          {figure && (
            <p>
              Chat mode: {figure.name}
            </p>
          )}
        </div>
        <button className="button-secondary" onClick={() => dispatch(logout())}>
          Logout
        </button>
      </aside>

      <main className="chat-main">
        <div className="chat-feed-wrap">
          {loadingFigure && <Loader text="Loading historical figure..." />}
          <Message text={error} type="error" />

          <section className="conversation-box">
            {messages.length === 0 ? (
              <EmptyState figureName={figure?.name} />
            ) : (
              messages.map((item) => (
                <ConversationItem key={item.id} item={item} figureName={figure?.name} />
              ))
            )}
          </section>
        </div>

        <form className="prompt-form" onSubmit={onSubmit}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type your message"
            disabled={sending}
          />
          <button type="submit" className="button-primary" disabled={sending}>
            {sending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </main>
    </div>
  );
}

export default HomeScreen;
