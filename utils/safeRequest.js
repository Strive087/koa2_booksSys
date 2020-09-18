import axios from 'axios';

class SafeRequest {
  static fetch(url) {
    const result = {
      code: 0,
      message: 'success',
      data: null,
    };
    return new Promise((resolve) => {
      axios(url)
        .then((data) => {
          result.data = data.data;
          resolve(result);
        })
        .catch((e) => {
          result.code = 1;
          result.message = e.message;
          result.data = [
            { id: 1, name: '红楼梦1', price: '100.00', count: 10 },
            { id: 2, name: '西游记1', price: '88.00', count: 23 },
            { id: 3, name: '水浒1', price: '128.00', count: 26 },
            { id: 4, name: '三国演义1', price: '138.00', count: 30 },
          ];
          resolve(result);
        });
    });
  }
}

export default SafeRequest;
