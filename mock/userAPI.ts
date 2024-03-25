const users = [
  { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

export default {
  'POST /api/sys/auth': (req: any, res: any) => {
    res.json({
      success: true,
      data: 'xxxxxxx',
    });
  },
  'GET /api/sys/auth/currentUser': (req: any, res: any) => {
    res.json({
      success: true,
      data: { nickName: 'ljh', avatar: 'https://cdn-gw.meb.com/UploadFiles/image/pc_logo.png' },
    });
  },
  'GET /api/sys/customer/*': (req: any, res: any) => {
    res.json({
      success: true,
      data: { customerId: 1, customerName: 'xxx' },
      total: 1,
    });
  },
  'GET /api/sys/customer': (req: any, res: any) => {
    res.json({
      success: true,
      data: [
        { customerId: 1, customerName: 'xxx' },
        { customerId: 2, customerName: '2xxx' },
      ],
      total: 1,
    });
  },

  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'PUT /api/v1/user/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
};
