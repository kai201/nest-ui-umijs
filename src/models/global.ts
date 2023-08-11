// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { useLocalStorageState } from 'ahooks';
import { useState } from 'react';

const useUser = () => {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  let [accessToken, setAccessToken] = useLocalStorageState<string>('token', {
    serializer: (v) => v,
    deserializer: (v) => v,
  });
  return {
    name,
    setName,
    accessToken,
    setAccessToken,
  };
};

export default useUser;
