import { Avatar, List, Typography, Image } from 'antd';
import { useModel } from '@umijs/max';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import styles from './index.less';
import VirtualList, { ListRef } from 'rc-virtual-list';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add css for snow theme

const WapView: React.FC = () => {
  const listRef = useRef<ListRef>(null);
  const [viewHeight, setViewHeight] = useState(500);
  const placeholderImage =
    'data:image/png;base64,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';

  const {
    connect,
    loading,
    messages,
    prevMessages,
    conversation,
    conversationList,
    prevConversation,
    scrolledBottom,
    setScrolledBottom,
    sendMessage,
    setConversation,
    fetchHistory,
  } = useModel('imessage');

  const modules = {
    toolbar: [['image']],
    keyboard: {
      bindings: {
        enter: {
          key: 13,
          ctrlKey: true,
          handler: function () {
            console.log('enter pressed');
            // @ts-expect-error
            sendMessage({ rawText: this.quill.getText(), senderId: 1 });
            console.log();
            // @ts-expect-error
            console.log(this.quill);
          },
        },
      },
    },
  };
  const { quill, quillRef } = useQuill({ modules });
  /*
  /* Commands
  */
  const scrollToBottom = useCallback(() => {
    if (!scrolledBottom) return;
    let o = messages.length - 1;
    listRef.current?.scrollTo({ index: o, offset: 0 });
    setScrolledBottom(false);
  }, [messages]);

  const scrollToLastTop = useCallback(() => {
    setTimeout(() => listRef.current?.scrollTo({ index: messages.length - prevMessages.length - 1, offset: 20 }), 1);
  }, [messages]);

  const onResize = (e: Event) => {};

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (e.currentTarget.scrollTop === 0) {
      fetchHistory().then(() => {
        scrollToLastTop();
        setScrolledBottom(false);
      });
    }
  };

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    console.log(
      `conversation => ${conversation?.conversationId} & prevConversation => ${prevConversation?.conversationId}`,
    );
    console.log(`messages.length => ${messages.length} & prevMessages.length => ${prevMessages.length}`);

    if (!conversation) return; 
    scrollToBottom(); 
  }, [conversation, messages, prevMessages]);

  useEffect(() => {
    console.log(window.innerHeight - 56 - 120);
    setViewHeight(window.innerHeight - 56 - 120 - 100);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      setConversation(undefined);
    };
  }, []);

  const UConversation = (
    <>
      <List>
        <VirtualList data={conversationList} height={viewHeight} itemKey={(n) => `${n.conversationId}_${n.memberId}`}>
          {(item) => (
            <List.Item onClick={() => setConversation(item)}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatarUrl} style={{ height: '50px' }} />}
                title={<>{item.conversationName}</>}
                description={item.createdTime.toString()}
              />
            </List.Item>
          )}
        </VirtualList>
      </List>
    </>
  );

  const UMessageList = (
    <>
      <List>
        <VirtualList
          data={messages}
          itemKey={'messageId'}
          height={viewHeight - 200}
          itemHeight={160}
          ref={listRef}
          onScroll={onScroll}
        >
          {(n) => (
            <List.Item>
              {n.msgType == 1 && (
                <>
                  <Typography.Text>{n.createdTime?.toString()}</Typography.Text>
                  {n.rawText}
                </>
              )}
              {n.msgType == 2 && (
                <>
                  <Typography.Text>{n.createdTime.toString()}</Typography.Text>
                  <Image
                    height={160}
                    src={`http://cdn.supoma.cn/wx/images/${n.fileUrl.replaceAll('THUMBNAIL_DIRPATH://', '')}`}
                    fallback={placeholderImage}
                    placeholder={<Image preview={false} src={placeholderImage} width={200} />}
                  />
                </>
              )}
              {n.msgType > 2 && (
                <>
                  <Typography.Text>{n.createdTime.toString()}</Typography.Text>
                </>
              )}
            </List.Item>
          )}
        </VirtualList>
      </List>
      <div style={{ width: '100%', border: '1px solid lightgray' }}>
        <div ref={quillRef} style={{ height: 180 }} />
      </div>
    </>
  );

  // const UHeader = () => (
  //   <>
  //     <div className={styles.conversation}>
  //       <Avatar className={styles.avatar} />
  //       <div className={styles.group}>
  //         <div className={styles.nickname}>wwww</div>
  //         <div className={`${styles.desc} ${styles.ellipsis}`}>xxxx</div>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
        <div style={{ width: '300px', border: '1px solid #f1f1f1', marginRight: 20 }}>{UConversation}</div>
        <div style={{ border: '1px solid #f1f1f1', width: '100%' }}>
          {/* <UHeader /> */}
          {conversation && UMessageList}
        </div>
      </div>
    </>
  );
};

export default WapView;
