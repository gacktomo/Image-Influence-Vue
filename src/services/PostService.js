import axios from 'axios';
// import Config from '../config/Config';

export default {
  getPosts() {
    const formData = new FormData();
    formData.append('apikey', 'pecUAOmUgV8vOCyIAtrMn5OH45fIg15q');
    const apiURL = 'https://api.a3rt.recruit-tech.co.jp/image_influence/v1/meat_score';
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // };

    // return axios({
    //   method: 'POST',
    //   url: apiURL,
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    //   data: {
    //     apikey: 'pecUAOmUgV8vOCyIAtrMn5OH45fIg15q',
    //   },
    // })
    return axios.post(apiURL, JSON.stringify({
      apikey: 'pecUAOmUgV8vOCyIAtrMn5OH45fIg15q',
      predict: 1,
    }))
    .then(response => response.data)
    .catch(err => console.log(err));
  },
};
