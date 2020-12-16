import safeRequest from '../utils/safeRequest';

class BooksModel {
  // getBooksDataList() {
  //   return new Promise((resolve, reject) => {
  //     axios.get('http://localhost/books').then((res) => {
  //       resolve(res.data);
  //     }).catch(function (error) {
  //       reject(error)
  //     })
  //   })

  // }
  static getBooksDataList() {
    return safeRequest.fetch('http://localhost/books');
  }
}

export default BooksModel;
