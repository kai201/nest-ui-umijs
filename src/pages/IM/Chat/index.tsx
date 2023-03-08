import { Avatar, List } from 'antd';
import React, { useEffect, useState } from 'react';
// import io from '@/utils/ws';
import styles from './index.less';

const WapView: React.FC = () => {
  useEffect(() => {
    // io.on('data', (msg) => {
    //   console.log(msg);
    // });
    // io.emit('data', 'test...');
  });

  let [conList] = useState([
    {
      id: 16,
      avatar: '//game.gtimg.cn/images/lol/act/img/champion/Jinx.png',
      nickname: '金克丝',
      message: '这是一条信息',
      date: '02-11',
      desc: '一行简短的简介',
    },
    {
      id: 16,
      avatar: '//game.gtimg.cn/images/lol/act/img/champion/Jinx.png',
      nickname: '金克丝',
      message: '这是一条信息',
      date: '02-11',
      desc: '一行简短的简介',
    },
    {
      id: 16,
      avatar: '//game.gtimg.cn/images/lol/act/img/champion/Jinx.png',
      nickname: '金克丝',
      message: '这是一条信息',
      date: '02-11',
      desc: '一行简短的简介',
    },
    {
      id: 16,
      avatar: '//game.gtimg.cn/images/lol/act/img/champion/Jinx.png',
      nickname: '金克丝',
      message: '这是一条信息',
      date: '02-11',
      desc: '一行简短的简介',
    },
  ]);

  const UConversation = () => (
    <>
      <List
        dataSource={conList}
        style={{ width: '300px' }}
        renderItem={(n) => (
          <div className={styles.conversation}>
            <Avatar src={n.avatar} className={styles.avatar} />
            <div className={styles.group}>
              <div className={styles.nickname}>{n.nickname}</div>
              <div className={`${styles.desc} ${styles.ellipsis}`}>{n.desc}</div>
            </div>
            <div className={styles.datetime}>{n.date}</div>
          </div>
        )}
      />
    </>
  );

  const UHeader = () => (
    <>
      <div className={styles.conversation}>
        <Avatar className={styles.avatar} />
        <div className={styles.group}>
          <div className={styles.nickname}>wwww</div>
          <div className={`${styles.desc} ${styles.ellipsis}`}>xxxx</div>
        </div>
      </div>
    </>
  );
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
        <UConversation />
        <div style={{ border: '1px solid #f1f1f1', width: '800px' }}>
          <UHeader />
        </div>
      </div>
    </>
  );
};

export default WapView;
