import { useEffect, useCallback, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import services, { CreateImMessage, ImMessage } from '@/services/message.service';
// import conversationServices, { ImConversation } from '@/services/conversation.service';
import conversationServices, { ImConversationWindow } from '@/services/conversation-window.service';
import memberService, { ImMember } from '@/services/member.service';
import { filter, find, uniqBy } from 'lodash';

const usePrevious = <T>(value: T): T => {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default function imessageModel() {
  const [loading, setLoading] = useState(false);
  const [scrolledBottom, setScrolledBottom] = useState(true);
  // const [conversationId, setConversationId] = useState(0);
  const [conversation, setConversation] = useState<ImConversationWindow>();
  const [conversationList, setConversationList] = useState<ImConversationWindow[]>([]);
  const [initMessagesLoaded, setInitMessagesLoaded] = useState<{ [p: number]: boolean }>({});
  const [fetchingMessages, setFetchingMessages] = useState(false);
  const [fetchMessages, setFetchMessages] = useState(10);
  const [messageList, setMessageList] = useState<ImMessage[]>([]);
  const [messages, setMessages] = useState<ImMessage[]>([]);
  const [members, setMembers] = useState<ImMember[]>([]);
  const prevMessages = usePrevious(messages);
  const prevConversation = usePrevious(conversation);

  // const prevConversationId = usePrevious(conversationId);

  const [socket] = useState(
    io('ws://118.122.77.101:7000', {
      autoConnect: false,
      auth: (done) => {
        done({ token: localStorage.getItem('token') || '' });
      },
      transports: ['websocket'],
    }),
  );
  // const [messageList, setMessageList] = useState<{ [conversationId: number]: any[] }>({});

  const fetchConversation = useCallback(async () => {
    let resp = await conversationServices.fetchList({});
    let newConversation = resp.data || [];
    setConversationList([...conversationList, ...newConversation]);
  }, [loading]);

  const fetchHistory = useCallback(async () => {
    if (!fetchMessages) return;
    if (!conversation) return;
    setFetchingMessages(true);
    try {
      let lastMsg = messageList
        .filter((q) => q.conversationId == conversation.conversationId)
        .sort((a, b) => (a.sendTime as number) - (b.sendTime as number))?.[0];

      let params = {
        conversationId: conversation.conversationId,
        pageSize: fetchMessages,
        startTime: (lastMsg?.sendTime as number) || undefined,
      };
      let resp = await services.fetchHistory(params);
      let newMessages: ImMessage[] = resp.data || [];

      let allMessages = [...messageList, ...newMessages];
      allMessages = uniqBy([...messageList, ...newMessages], (q) => q.messageId);
      setMessageList(allMessages);
    } catch (e) {
      console.error(e);
    } finally {
      setFetchingMessages(false);
    }
  }, [setMembers, setConversation, setMessages, conversation, messages]);

  const fetchMember = useCallback(
    async (memberId: number) => {
      let resp = await memberService.fetch(memberId);
      let newMember = resp.data;
      if (newMember) setMembers([...members, newMember]);
      return newMember;
    },
    [conversation, conversationList, fetchConversation],
  );

  const connect = useCallback(() => {
    if (socket.active) return;
    socket.connect();
  }, [socket.active]);

  const sendMessage = (msg: CreateImMessage) => {
    if (!socket.active) return;
    socket.emit('data', msg);
  };

  useEffect(() => {
    if (!conversation) return;
    if (!initMessagesLoaded[conversation.conversationId]) return;
    let curMessages = messageList
      .filter((q) => q.conversationId == conversation.conversationId)
      .sort((a, b) => (a.sendTime as number) - (b.sendTime as number));
    setMessages([...curMessages]);
  }, [initMessagesLoaded, conversation, messageList]);

  useEffect(() => {
    if (!conversation) return;
    if (conversation === prevConversation) return;
    if (initMessagesLoaded[conversation.conversationId]) return;
    fetchHistory().then(() => {
      setInitMessagesLoaded((curr) => ({ ...curr, [conversation.conversationId]: true }));
      setScrolledBottom(true);
    });
  }, [fetchHistory, initMessagesLoaded, conversation]);

  // useEffect(() => {
  //   if (!messages?.length) return;
  //   if (messages.length - prevMessages.length !== 1) return;
  //   if (Number(messages.slice(-1)[0]?.sendTime) > Number(prevMessages.slice(-1)[0]?.sendTime))
  //     setUnreadMessages((unread) => unread + 1);
  // }, [messages]);

  useEffect(() => {
    if (loading) return;
    // let sock = io('ws://118.122.77.101:7000', { auth: { token }, transports: ['websocket'] });
    socket.on('connect', () => {
      fetchConversation();
      setLoading(true);
    });

    socket.on('data', (msg) => {
      console.log(`接收到新消息.... => ${msg}`);
    });
  }, [socket.active]);

  return {
    socket,
    members,
    loading,
    conversation,
    conversationList,
    prevConversation,
    fetchingMessages,
    messages,
    prevMessages,
    fetchMessages,
    scrolledBottom,
    setScrolledBottom,
    setConversation,
    setConversationList,
    setFetchMessages,
    fetchHistory,
    fetchMember,
    connect,
    sendMessage,
  };
}
