import { ReactNode, useCallback, useEffect, useState, useRef } from 'react';

export interface Message {
  timetoken: string | number;
}

export interface MessageRendererProps {
  isOwn: boolean;
  message: Message;
  time: string;
  editedText: string;
  // user?: UserEntity;
}

export interface MessageListProps {
  children?: ReactNode;
  /** Set this option to a non-zero value to enable fetching messages from the History API. This feature uses the infinite scrolling pattern and takes a maximum value of 25. */
  fetchMessages?: number;
  /** Option to enable rendering reactions that were added to messages. Make sure to also set up reactionsPicker when this option is enabled. */
  enableReactions?: boolean;
  /** Option to provide custom welcome messages to replace the default ones. Set to "false" to disable it. */
  welcomeMessages?: false;
  /** Option to provide an extra actions renderer to add custom action buttons to each message. */
  extraActionsRenderer?: (message: Message) => JSX.Element;
  /** Option to provide a custom message item renderer if themes and CSS variables aren't enough. */
  messageRenderer?: (props: MessageRendererProps) => JSX.Element;
  /** Option to provide a custom message bubble renderer if themes and CSS variables aren't enough. */
  bubbleRenderer?: (props: MessageRendererProps) => JSX.Element;
  /** Option to provide a custom file renderer to change how images and other files are shown. */
  fileRenderer?: (file: any) => JSX.Element;
  /** This option only works when you use either `messageRenderer` or `bubbleRenderer`. It allows you to apply one of the custom renderers only to the messages selected by the filter. */
  filter?: (message: any) => boolean;
  channel?: number;
}

export const usePrevious = <T,>(value: T): T => {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export const useMessageList = (props: MessageListProps) => {
    
  const [scrolledBottom, setScrolledBottom] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [fetchingMessages, setFetchingMessages] = useState(false);
  const [initMessagesLoaded, setInitMessagesLoaded] = useState<{ [p: number]: boolean }>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const prevMessages = usePrevious(messages);
  const prevChannel = usePrevious(props.channel);

  const getTime = (timestamp: number) => {
    const ts = String(timestamp);
    const date = new Date(parseInt(ts) / 10000);
    return date.toLocaleTimeString([], { timeStyle: 'short' });
    /* toLocaleTimeString internally uses Intl API if available
     * Otherwise the options passed to it will be ignored (e.g. on Android devices) */
  };

  const fetchHistory = useCallback(async () => {
    if (!props.fetchMessages) return;
    setFetchingMessages(true);

    try {
      let newMessages: Message[] = [];

      const allMessages = [...messages, ...newMessages].sort(
        (a, b) => (a.timetoken as number) - (b.timetoken as number),
      );
      setMessages(allMessages);
    } finally {
      setFetchingMessages(false);
    }
  }, [props.channel, props.fetchMessages, messages, setMessages]);

  useEffect(() => {
    if (!props.channel) return;
    if (props.channel === prevChannel) return;
    if (initMessagesLoaded[props.channel]) return;
    fetchHistory().then(() => {
      setInitMessagesLoaded((curr) => ({ ...curr, [props.channel!]: true }));
    });
  }, [props.channel, fetchHistory, initMessagesLoaded, messages.length, prevChannel]);

  useEffect(() => {
    if (!messages?.length || scrolledBottom) return;
    if (messages.length - prevMessages.length !== 1) return;
    if (Number(messages.slice(-1)[0]?.timetoken) > Number(prevMessages.slice(-1)[0]?.timetoken))
      setUnreadMessages((unread) => unread + 1);
  }, [messages, prevMessages, scrolledBottom]);

  return {
    initMessagesLoaded,
    unreadMessages,
    fetchingMessages,
    scrolledBottom,
    prevChannel,
    prevMessages,
    setUnreadMessages,
    setScrolledBottom,
    fetchHistory,
    getTime,
  };
};
